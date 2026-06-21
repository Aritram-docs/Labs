import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_2;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "n8n webhook URL (N8N_WEBHOOK_2) is not configured. Please set it in your .env.local file." },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim() || "";
    const filter = searchParams.get("filter")?.trim().toLowerCase() || "all";

    // Forward search query to n8n webhook
    const n8nUrl = new URL(webhookUrl);
    n8nUrl.searchParams.set("query", query);
    n8nUrl.searchParams.set("filter", filter);

    console.log("Forwarding search query to n8n section-search webhook...");
    const n8nResponse = await fetch(n8nUrl.toString(), {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text().catch(() => "Unknown error");
      console.error("n8n webhook returned error:", n8nResponse.status, errorText);
      return NextResponse.json(
        { error: `n8n search failed (status ${n8nResponse.status}). Please check your n8n workflow.` },
        { status: 502 }
      );
    }

    // Relay n8n's response directly back to the frontend
    const data = await n8nResponse.json();

    // Ensure we always return an array
    const resultsArray = Array.isArray(data) ? data : [data];
    return NextResponse.json(resultsArray);

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "An error occurred while connecting to n8n.";
    console.error("Error in section-search API handler:", error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
