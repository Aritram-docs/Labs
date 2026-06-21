import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_1;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "n8n webhook URL ( N8N_WEBHOOK_1) is not configured. Please set it in your .env.local file." },
        { status: 503 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    let n8nResponse: Response;

    if (contentType.includes("multipart/form-data")) {
      // Forward the multipart form data (file upload) directly to n8n
      const formData = await req.formData();
      
      // Check if there's a file or text in the form data
      const file = formData.get("file") as File | null;
      const text = formData.get("text") as string | null;

      if (!file && !text) {
        return NextResponse.json(
          { error: "No file or text provided in the request." },
          { status: 400 }
        );
      }

      // Forward form data to n8n
      const forwardFormData = new FormData();
      if (file) {
        forwardFormData.append("file", file, file.name);
      }
      if (text) {
        forwardFormData.append("text", text);
      }

      console.log("Forwarding file/text to n8n analyze-document webhook...");
      n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        body: forwardFormData,
      });
    } else {
      // Forward JSON body (pasted text) directly to n8n
      const body = await req.json();
      const rawText = body.text || "";

      if (!rawText.trim()) {
        return NextResponse.json(
          { error: "No text provided for analysis." },
          { status: 400 }
        );
      }

      console.log("Forwarding text to n8n analyze-document webhook...");
      n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });
    }

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text().catch(() => "Unknown error");
      console.error("n8n webhook returned error:", n8nResponse.status, errorText);
      return NextResponse.json(
        { error: `n8n processing failed (status ${n8nResponse.status}). Please check your n8n workflow.` },
        { status: 502 }
      );
    }

    // Relay n8n's response back to the frontend with correct keys and HTML highlighting
    const data = await n8nResponse.json();

    const rawText = data.raw_text || data.full_text || "";
    let annotatedText = data.annotated_text || "";
    let detectedIpc: string[] = data.detected_ipc_sections || [];
    let mappedBns: string[] = data.mapped_bns_sections || [];
    let explanations: string[] = data.explanations || [];

    interface LegalMapping {
      ipc_section: string;
      bns_section: string;
      title: string;
    }

    // Extract mappings from either mappings list or mapping_summary
    let mappingsList: LegalMapping[] = [];
    if (data.mappings && Array.isArray(data.mappings)) {
      mappingsList = data.mappings;
    } else if (data.mapping_summary) {
      const blocks = data.mapping_summary.split("\n\n");
      for (const block of blocks) {
        const lines = block.trim().split("\n");
        if (lines.length >= 2) {
          const match = lines[0].match(/IPC\s+(\S+)\s*->\s*BNS\s+(\S+)/i);
          if (match) {
            mappingsList.push({
              ipc_section: match[1],
              bns_section: match[2],
              title: lines[1]
            });
          }
        }
      }
    }

    if (mappingsList.length > 0) {
      detectedIpc = mappingsList.map((m: LegalMapping) => `IPC Section ${m.ipc_section}`);
      mappedBns = mappingsList.map((m: LegalMapping) => `BNS Section ${m.bns_section}`);
      explanations = mappingsList.map((m: LegalMapping) => 
        `IPC Section ${m.ipc_section} maps to BNS Section ${m.bns_section} (${m.title || "No description available"})`
      );

      // Create a map for quick lookups
      const mappingMap = new Map<string, LegalMapping>();
      for (const item of mappingsList) {
        mappingMap.set(String(item.ipc_section).trim(), item);
      }

      // Convert "Section X [-> BNS Y]" to highlighted HTML spans (supporting slashes, parens, and spaces)
      annotatedText = annotatedText.replace(/Section\s+([\d/()A-Za-z]+)\s+\[->\s+BNS\s+([\d/()A-Za-z]+)\s*\]/gi, (match: string, ipcSec: string, bnsSec: string) => {
        const item = mappingMap.get(String(ipcSec).trim());
        const titleSpan = item ? ` <span class="desc-highlight">(${item.title})</span>` : "";
        return `<span class="ipc-highlight">IPC Section ${ipcSec}</span> <span class="bns-highlight">BNS Section ${bnsSec}</span>${titleSpan}`;
      });
    } else {
      // Fallback regex replacement if no mappings list is found
      annotatedText = annotatedText.replace(/Section\s+([\d/()A-Za-z]+)\s+\[->\s+BNS\s+([\d/()A-Za-z]+)\s*\]/gi, (match: string, ipcSec: string, bnsSec: string) => {
        return `<span class="ipc-highlight">IPC Section ${ipcSec}</span> <span class="bns-highlight">BNS Section ${bnsSec}</span>`;
      });
    }

    // SANITIZE HTML: Prevent the whole document from turning yellow if n8n/AI sends an unclosed span
    // 1. Strip any desc-highlight span that wraps more than 500 characters
    annotatedText = annotatedText.replace(/<span class="desc-highlight">([\s\S]{500,})<\/span>/gi, "$1");
    annotatedText = annotatedText.replace(/<span class="desc-highlight">([\s\S]{500,})$/gi, "$1"); // Unclosed at the end
    
    // 2. Ensure all span tags are balanced
    const openSpans = (annotatedText.match(/<span/g) || []).length;
    const closeSpans = (annotatedText.match(/<\/span>/g) || []).length;
    if (openSpans > closeSpans) {
      annotatedText += "</span>".repeat(openSpans - closeSpans);
    }

    return NextResponse.json({
      detected_ipc_sections: detectedIpc,
      mapped_bns_sections: mappedBns,
      explanations: explanations,
      annotated_text: annotatedText,
      raw_text: rawText,
    });

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "An error occurred while connecting to n8n.";
    console.error("Error in analyze-document API handler:", error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
