import { NextResponse } from "next/server";
import { submitOrStoreLocally } from "@/lib/submissions";
import type { BookingSubmissionPayload } from "@/types/submissions";

export async function POST(request: Request) {
  let body: BookingSubmissionPayload;
  try {
    body = (await request.json()) as BookingSubmissionPayload;
  } catch (error) {
    console.error("Malformed submit-booking request body:", error);
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    return await submitOrStoreLocally(
      "bookings",
      "/api/bookings",
      body,
      "Failed to submit booking.",
    );
  } catch (error) {
    console.error("Unexpected error submitting booking:", error);
    return NextResponse.json({ error: "Failed to submit booking." }, { status: 500 });
  }
}
