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
