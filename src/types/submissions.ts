// Shared payload shapes for forms that submit to the CRM (or, locally, to
// gitignored JSON files when SUBMISSIONS_MODE=local). Keep these in sync with
// whatever the CRM app ends up expecting.

export type BookingService = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export type RealEstateBookingPayload = {
  serviceType: "real-estate";
  services: BookingService[];
  totalPrice: number;
  propertyAddress: string;
  clientName: string;
  preferredShootDate: string;
  accessInstructions: string;
  // See REAL_ESTATE_TIMELINE_OPTIONS in src/content/bookingOptions.ts for
  // allowed values. Distinct from ClientInquiryPayload's timeline, which is
  // for consultative project work rather than listing shoot turnaround.
  timeline: string;
};

export type InquiryBookingPayload = {
  serviceType: "inquiry";
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  timeline: string;
};

export type ClientInquiryPayload = {
  serviceType: "client-inquiry";
  name: string;
  email: string;
  phone: string;
  message: string;
  // Portfolio category slugs (see industryItems in IndustryGrid.tsx), e.g.
  // ["real-estate", "commercial"].
  projectCategories: string[];
  // See TIMELINE_OPTIONS in src/content/contactOptions.ts for allowed values.
  timeline: string;
  // See LOCATION_OPTIONS in src/content/contactOptions.ts for allowed values.
  location: string;
  locationDetails?: string;
  // Skippable — see BUDGET_OPTIONS in src/content/contactOptions.ts. Omitted
  // (not an empty string or "not-sure") when the user skips this step, so
  // "skipped" and "selected Not Sure Yet" stay distinguishable.
  budget?: string;
  // Skippable — see REFERRAL_OPTIONS in src/content/contactOptions.ts.
  // Omitted when the user skips this step.
  referralSource?: string;
  // Only present when referralSource is "referral" and the user filled in
  // who referred them — optional even then, so omitted rather than sent
  // empty if they leave it blank.
  referralName?: string;
};

export type BookingSubmissionPayload =
  | RealEstateBookingPayload
  | InquiryBookingPayload
  | ClientInquiryPayload;

export type CreatorApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  portfolioLink: string;
  availability: string | null;
  serviceAreas: string[];
};
