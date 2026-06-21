import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_3;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "n8n webhook URL (N8N_WEBHOOK_3) is not configured. Please set it in your .env.local file." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { sectionNumber, title, type, description, explanation } = body;

    if (!sectionNumber) {
      return NextResponse.json(
        { error: "Section number is required." },
        { status: 400 }
      );
    }

    // Forward section details to n8n webhook
    console.log(`Forwarding explain-section request to n8n for ${sectionNumber}...`);
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sectionNumber,
        title,
        type,
        description,
        explanation,
      }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text().catch(() => "Unknown error");
      console.error("n8n webhook returned error:", n8nResponse.status, errorText);
      return NextResponse.json(
        { error: `n8n explanation failed (status ${n8nResponse.status}). Please check your n8n workflow.` },
        { status: 502 }
      );
    }

    // Relay n8n's response directly back to the frontend
    const data = await n8nResponse.json();

    return NextResponse.json({
      detailed_analysis: data.detailed_analysis || data.analysis || "",
    });

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "An error occurred while connecting to n8n.";
    console.error("Error in explain-section API handler:", error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
