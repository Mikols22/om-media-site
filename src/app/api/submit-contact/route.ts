import { NextResponse } from "next/server";
import { submitOrStoreLocally } from "@/lib/submissions";
import type { ClientInquiryPayload } from "@/types/submissions";

export async function POST(request: Request) {
  let body: ClientInquiryPayload;
  try {
    body = (await request.json()) as ClientInquiryPayload;
  } catch (error) {
    console.error("Malformed submit-contact request body:", error);
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    return await submitOrStoreLocally(
      "contact-inquiries",
      "/api/contact",
      body,
      "Failed to submit inquiry.",
    );
  } catch (error) {
    console.error("Unexpected error submitting contact inquiry:", error);
    return NextResponse.json({ error: "Failed to submit inquiry." }, { status: 500 });
  }
}
