import { NextResponse } from "next/server";
import { submitOrStoreLocally } from "@/lib/submissions";
import type { CreatorApplicationPayload } from "@/types/submissions";

export async function POST(request: Request) {
  let body: CreatorApplicationPayload;
  try {
    body = (await request.json()) as CreatorApplicationPayload;
  } catch (error) {
    console.error("Malformed submit-application request body:", error);
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    return await submitOrStoreLocally(
      "applications",
      "/api/creators/apply",
      body,
      "Failed to submit application.",
    );
  } catch (error) {
    console.error("Unexpected error submitting application:", error);
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}
