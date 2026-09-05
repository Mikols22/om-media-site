import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type SubmissionKind = "bookings" | "applications" | "contact-inquiries";

const SUBMISSIONS_ROOT = path.join(process.cwd(), "data", "submissions");

async function writeLocalSubmission(kind: SubmissionKind, payload: unknown) {
  const dir = path.join(SUBMISSIONS_ROOT, kind);
  await mkdir(dir, { recursive: true });

  const record = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    payload,
  };

  const fileName = `${record.submittedAt.replace(/[:.]/g, "-")}-${record.id}.json`;
  await writeFile(path.join(dir, fileName), JSON.stringify(record, null, 2), "utf-8");

  return record;
}

/**
 * Routes to local gitignored JSON files or the CRM based on SUBMISSIONS_MODE
 * ("local" | "crm", defaults to "local" when unset) — an explicit switch
 * rather than inferring mode from which env vars happen to be set, so
 * flipping to local storage never requires touching CRM credentials.
 *
 * `crmPath` is joined onto CRM_API_BASE_URL to form the request URL — each
 * route owns its own path since the CRM exposes separate endpoints per kind.
 */
export async function submitOrStoreLocally(
  kind: SubmissionKind,
  crmPath: string,
  payload: unknown,
  failureMessage: string,
) {
  const mode = process.env.SUBMISSIONS_MODE === "crm" ? "crm" : "local";

  if (mode === "local") {
    const record = await writeLocalSubmission(kind, payload);
    return NextResponse.json({ success: true, id: record.id, stored: "local" });
  }

  const baseUrl = process.env.CRM_API_BASE_URL;
  const crmKey = process.env.CRM_API_KEY;

  if (!baseUrl || !crmKey) {
    return NextResponse.json(
      {
        error:
          "SUBMISSIONS_MODE is 'crm' but CRM_API_BASE_URL/CRM_API_KEY are not set.",
      },
      { status: 500 },
    );
  }

  let crmResponse: Response;
  try {
    crmResponse = await fetch(new URL(crmPath, baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${crmKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(`CRM request failed for ${kind} (${crmPath}):`, error);
    return NextResponse.json({ error: "CRM is unreachable." }, { status: 502 });
  }

  const data = (await crmResponse.json().catch(() => ({}))) as {
    error?: string;
    success?: boolean;
    [key: string]: unknown;
  };

  if (!crmResponse.ok) {
    return NextResponse.json(
      { error: data.error ?? failureMessage },
      { status: crmResponse.status },
    );
  }

  return NextResponse.json(data.success !== undefined ? data : { success: true });
}
