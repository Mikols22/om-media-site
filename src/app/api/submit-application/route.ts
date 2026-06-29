import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const crmUrl = process.env.CRM_API_URL;
    const crmKey = process.env.CRM_API_KEY;

    if (!crmUrl || !crmKey) {
      return NextResponse.json(
        { error: "CRM configuration is missing." },
        { status: 500 },
      );
    }

    const body = await request.json();

    const crmResponse = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${crmKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = (await crmResponse.json().catch(() => ({}))) as {
      error?: string;
      success?: boolean;
      [key: string]: unknown;
    };

    if (!crmResponse.ok) {
      return NextResponse.json(
        { error: data.error ?? "Failed to submit application." },
        { status: crmResponse.status },
      );
    }

    return NextResponse.json(
      data.success !== undefined ? data : { success: true },
    );
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 500 });
  }
}
