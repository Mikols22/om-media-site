// Option lists for the /book real-estate flow (BookingFlow.tsx). Kept
// separate from src/content/contactOptions.ts: /contact's timeline is about
// consultative project work, this one is specifically listing-shoot
// turnaround — different questions, not meant to share a list.

export const REAL_ESTATE_TIMELINE_OPTIONS = [
  { value: "this-week", label: "This week" },
  { value: "next-week", label: "Next week" },
  { value: "this-month", label: "This month" },
  { value: "1-2-months", label: "1-2 months" },
  { value: "within-6-months", label: "Within 6 months" },
  { value: "still-exploring", label: "Still exploring" },
] as const;
