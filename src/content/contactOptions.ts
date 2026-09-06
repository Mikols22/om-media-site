// Option lists for the /contact stepped questionnaire (ContactFlow.tsx).
// Single source of truth for both the UI (rendering the choices) and the
// values written into ClientInquiryPayload, so the two can't drift apart.

export const TIMELINE_OPTIONS = [
  { value: "within-a-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-plus-months", label: "3+ months" },
  { value: "still-exploring", label: "Still exploring" },
] as const;

export const LOCATION_OPTIONS = [
  { value: "local", label: "Local (Bucks County / Philadelphia)" },
  { value: "regional", label: "Regional (East Coast)" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-5k", label: "Under $5K" },
  { value: "5-10k", label: "$5–10K" },
  { value: "10-20k", label: "$10–20K" },
  { value: "20k-plus", label: "More than $20K" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const REFERRAL_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "om-home-show", label: "The OM hOMe Show" },
  { value: "worked-with-you-before", label: "Worked with you before" },
  { value: "other", label: "Other" },
] as const;
