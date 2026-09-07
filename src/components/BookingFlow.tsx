"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { REAL_ESTATE_TIMELINE_OPTIONS } from "@/content/bookingOptions";
import type {
  BookingSubmissionPayload,
  InquiryBookingPayload,
  RealEstateBookingPayload,
} from "@/types/submissions";

type ServiceItem = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type SelectedService = ServiceItem & {
  category: string;
};

type ServiceCategory = {
  category: string;
  items: ServiceItem[];
};

type ServiceType = "real-estate" | "inquiry";

const serviceCategories: ServiceCategory[] = [
  {
    category: "Photo Packages",
    items: [
      {
        id: "p1",
        name: "Photo 1 (< 2,000 sqft)",
        price: 225,
        description:
          "15-20 hand-blended, MLS ready images. Best for properties approx. 2,000 sqft or less.",
      },
      {
        id: "p2",
        name: "Photo 2 (< 3,000 sqft)",
        price: 250,
        description: "21-30 hand-blended, MLS ready images.",
      },
      {
        id: "p3",
        name: "Photo 3 (< 4,000 sqft)",
        price: 275,
        description: "31-40 hand-blended, MLS ready images.",
      },
      {
        id: "p4",
        name: "Photo 4 (< 5,000 sqft)",
        price: 350,
        description: "41-50 hand-blended, MLS ready images.",
      },
      {
        id: "p5",
        name: "Photo 5 (< 6,000 sqft)",
        price: 400,
        description: "51-60 hand-blended, MLS ready images.",
      },
      {
        id: "p6",
        name: "Photo 6 (< 7,000 sqft)",
        price: 450,
        description: "61-70 hand-blended, MLS ready images.",
      },
      {
        id: "p7",
        name: "Photo 7 (< 8,000 sqft)",
        price: 550,
        description: "71-80 hand-blended, MLS ready images.",
      },
      {
        id: "p8",
        name: "Photo 8 (< 9,000 sqft)",
        price: 600,
        description: "81-90 hand-blended, MLS ready images.",
      },
      {
        id: "p9",
        name: "Photo 9 (< 10,000 sqft)",
        price: 650,
        description: "91-100 hand-blended, MLS ready images.",
      },
      {
        id: "p10",
        name: "Photo 10 (10,000+ sqft)",
        price: 750,
        description: "100+ hand-blended, MLS ready images.",
      },
      {
        id: "ex1",
        name: "Exterior 1",
        price: 200,
        description:
          "Approx. 10 exterior only, MLS ready images. < 4,000 sqft.",
      },
      {
        id: "ex2",
        name: "Exterior 2",
        price: 300,
        description:
          "Approx. 20 exterior only, MLS ready images. > 4,000 sqft.",
      },
    ],
  },
  {
    category: "Photo Add-Ons & Drone",
    items: [
      {
        id: "nn1",
        name: "Nearby Neighborhood(s)",
        price: 100,
        description:
          "Approx. 3 images of each neighborhood hot spots within 3 miles.",
      },
      {
        id: "dp1",
        name: "Drone Photo 1 (< 2 acres)",
        price: 200,
        description: "5-10 hand-retouched, MLS ready aerial images.",
      },
      {
        id: "dp2",
        name: "Drone Photo 2 (2-5 acres)",
        price: 250,
        description: "11-15 hand-retouched, MLS ready aerial images.",
      },
      {
        id: "dp3",
        name: "Drone Photo 3 (6-10 acres)",
        price: 325,
        description: "16-20 hand-retouched, MLS ready aerial images.",
      },
      {
        id: "dpv1",
        name: "Drone Photo & Video 1",
        price: 500,
        description:
          "5-10 aerial images & 15 second aerial teaser video. < 2 acres.",
      },
    ],
  },
  {
    category: "Video Packages",
    items: [
      {
        id: "v1",
        name: "Video 1 (60-90 sec tour)",
        price: 575,
        description:
          "A 60-90 second professionally edited video tour showcasing your property's best features with smooth motion, cinematic pacing, and licensed background music.",
      },
      {
        id: "v2",
        name: "Video 2 (2 min cinematic + aerial)",
        price: 875,
        description:
          "A 2-minute professionally edited and hand-retouched video tour that captures your property with cinematic precision. Includes aerial footage and enhanced sound design.",
      },
      {
        id: "v2plus",
        name: "Video 2+ (Includes neighborhood/amenities)",
        price: 1500,
        description:
          "Extended cinematic tour with neighborhood and amenity coverage. Description coming soon.",
      },
      {
        id: "v3",
        name: "Video 3 (Premium + Twilight)",
        price: 2000,
        description:
          "Our most premium video experience. A 1-2 minute cinematic tour showcasing your property during the day and at sunset. Includes a 30-sec social teaser.",
      },
    ],
  },
  {
    category: "Floor Plans & 3D Tours",
    items: [
      {
        id: "fp1",
        name: "2D Floor Plan (< 5,000 sqft)",
        price: 300,
        description:
          "Clean, accurate 2D floor plan for listings under 5,000 sqft. Description coming soon.",
      },
      {
        id: "fp2",
        name: "3D Floor Plan (< 5,000 sqft)",
        price: 400,
        description:
          "Interactive 3D floor plan visualization for enhanced buyer engagement. Description coming soon.",
      },
      {
        id: "m1",
        name: "Matterport 1 (< 5,000 sqft)",
        price: 400,
        description:
          "Immersive Matterport 3D tour for properties under 5,000 sqft. Description coming soon.",
      },
      {
        id: "m2",
        name: "Matterport 2 (5,000-10,000 sqft)",
        price: 750,
        description:
          "Full-scale Matterport capture for larger luxury listings. Description coming soon.",
      },
    ],
  },
  {
    category: "Video & Production Add-Ons",
    items: [
      {
        id: "t1",
        name: "Twilight 1 (3-5 HDR images)",
        price: 450,
        description:
          "Golden-hour exterior images that elevate curb appeal at dusk. Description coming soon.",
      },
      {
        id: "vt",
        name: "Virtual Twilight (Per Image)",
        price: 60,
        description:
          "Digitally enhanced twilight conversion for individual listing photos. Description coming soon.",
      },
      {
        id: "vo",
        name: "Professional Voice Over",
        price: 750,
        description:
          "Broadcast-quality narration for your property video tour. Description coming soon.",
      },
      {
        id: "ge",
        name: "Google Earth Animation",
        price: 200,
        description:
          "Animated location context highlighting neighborhood and proximity. Description coming soon.",
      },
    ],
  },
];

const projectTypeOptions = ["Commercial", "Social Content", "Other"];

const ease = [0.22, 1, 0.36, 1] as const;

// Same shape ContactFlow relies on native type="email" + required for, but
// the CRM now hard-rejects malformed real-estate submissions with a 400, so
// this gates the Submit button explicitly rather than only at native-form-
// validation time.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function calculateTotal(services: SelectedService[]) {
  return services.reduce((sum, service) => sum + service.price, 0);
}

function Pill({
  label,
  active,
  onClick,
  disabled,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-white bg-white text-black"
          : "border-white/30 bg-transparent text-white hover:border-white/60"
      }`}
    >
      {label}
    </button>
  );
}

export default function BookingFlow() {
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Real estate flow state
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredShootDate, setPreferredShootDate] = useState("");
  const [accessInstructions, setAccessInstructions] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [realEstateTimeline, setRealEstateTimeline] = useState<string | null>(
    null,
  );

  // Inquiry flow state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [projectType, setProjectType] = useState<string | null>(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [timeline, setTimeline] = useState("");

  const isServiceSelected = (id: string) =>
    selectedServices.some((service) => service.id === id);

  const isExpanded = (id: string) => expandedItems.includes(id);

  const toggleExpanded = (id: string) => {
    setExpandedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const toggleService = (category: string, item: ServiceItem) => {
    setSelectedServices((current) => {
      const exists = current.some((service) => service.id === item.id);
      const next = exists
        ? current.filter((service) => service.id !== item.id)
        : [...current, { ...item, category }];

      setTotalPrice(calculateTotal(next));
      return next;
    });
  };

  const groupedSelectedServices = useMemo(() => {
    return selectedServices.reduce<Record<string, SelectedService[]>>(
      (groups, service) => {
        if (!groups[service.category]) {
          groups[service.category] = [];
        }
        groups[service.category].push(service);
        return groups;
      },
      {},
    );
  }, [selectedServices]);

  const chooseServiceType = (type: ServiceType) => {
    setServiceType(type);
    setCurrentStep(1);
  };

  const backToServiceType = () => {
    setServiceType(null);
    setCurrentStep(0);
    setSubmitError(null);
  };

  const submitBooking = async (payload: BookingSubmissionPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRealEstateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: RealEstateBookingPayload = {
      serviceType: "real-estate",
      services: selectedServices.map(({ id, name, price, category }) => ({
        id,
        name,
        price,
        category,
      })),
      totalPrice,
      propertyAddress,
      clientName,
      email: clientEmail,
      phone: clientPhone,
      preferredShootDate,
      accessInstructions,
      timeline: realEstateTimeline ?? "",
    };

    void submitBooking(payload);
  };

  const handleInquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectType) return;

    const payload: InquiryBookingPayload = {
      serviceType: "inquiry",
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      projectType,
      description: projectDescription,
      timeline,
    };

    void submitBooking(payload);
  };

  const totalSteps = serviceType === "inquiry" ? 2 : 4;

  return (
    <section className="relative bg-black pb-32">
      <div className="border-t border-white/10 px-6 py-16 lg:px-12 lg:py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          OM Media 2026 Pricing
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-5xl">
          Build Your Listing Package
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Select the services you need for this property. Your total updates
          instantly as you build the package.
        </p>

        <div className="mt-8 flex items-center gap-3">
          {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
            (step) => (
              <div
                key={step}
                className={`h-px flex-1 transition-colors duration-300 ${
                  currentStep + 1 >= step ? "bg-white" : "bg-neutral-800"
                }`}
              />
            ),
          )}
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Step 1 — What Are You Booking?
                </h3>
                <p className="mt-2 text-neutral-400">
                  Choose the option that best fits your project.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => chooseServiceType("real-estate")}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-8 text-left transition-all duration-300 hover:border-white/30"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                    For Agents & Homeowners
                  </p>
                  <h4 className="mt-3 text-2xl font-bold text-white">
                    Real Estate Listing
                  </h4>
                  <p className="mt-3 text-sm text-neutral-400">
                    Photos, video, drone, floor plans, and add-ons — build a
                    custom package for your listing with instant pricing.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => chooseServiceType("inquiry")}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-8 text-left transition-all duration-300 hover:border-white/30"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                    For Brands & Creators
                  </p>
                  <h4 className="mt-3 text-2xl font-bold text-white">
                    Commercial / Social Content / Other
                  </h4>
                  <p className="mt-3 text-sm text-neutral-400">
                    Tell us about your project and we&apos;ll follow up with a
                    custom proposal.
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && serviceType === "real-estate" && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12 space-y-12"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Step 2 — Build Your Package
                </h3>
                <p className="mt-2 text-neutral-400">
                  Choose one or more services across photos, video, floor plans,
                  and premium add-ons.
                </p>
              </div>

              {serviceCategories.map((category) => (
                <div key={category.category}>
                  <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                    {category.category}
                  </h4>

                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {category.items.map((item) => {
                      const selected = isServiceSelected(item.id);
                      const expanded = isExpanded(item.id);

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          onClick={() => toggleService(category.category, item)}
                          className={`cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                            selected
                              ? "border-white bg-white text-black"
                              : "border-white/10 bg-zinc-950 text-white hover:border-white/30"
                          }`}
                        >
                          <p
                            className={`text-sm leading-snug ${
                              selected ? "text-black/70" : "text-neutral-400"
                            }`}
                          >
                            {item.name}
                          </p>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleExpanded(item.id);
                            }}
                            className={`mt-2 text-xs transition-colors duration-300 ${
                              selected
                                ? "text-black/50 hover:text-black/80"
                                : "text-neutral-500 hover:text-neutral-300"
                            }`}
                          >
                            {expanded ? "Hide Details" : "View Details"}
                          </button>

                          <AnimatePresence>
                            {expanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease }}
                              >
                                <p
                                  className={`mt-3 text-sm ${
                                    selected ? "text-black/60" : "text-gray-400"
                                  }`}
                                >
                                  {item.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <p className="mt-4 text-2xl font-bold">
                            ${item.price}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={backToServiceType}
                  className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={selectedServices.length === 0}
                  className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next: Timeline
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && serviceType === "real-estate" && (
            <motion.div
              key="step-timeline"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-white">
                Step 3 — Timeline
              </h3>
              <p className="mt-2 text-neutral-400">
                When are you looking to have this shoot done?
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {REAL_ESTATE_TIMELINE_OPTIONS.map((option) => (
                  <Pill
                    key={option.value}
                    label={option.label}
                    active={realEstateTimeline === option.value}
                    onClick={() => setRealEstateTimeline(option.value)}
                  />
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!realEstateTimeline}
                  className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next: Property Details
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && serviceType === "inquiry" && !isSubmitted && (
            <motion.div
              key="inquiry"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-white">
                Step 2 — Tell Us About Your Project
              </h3>
              <p className="mt-2 text-neutral-400">
                Share a few details and we&apos;ll follow up with a custom
                proposal.
              </p>

              <form onSubmit={handleInquirySubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(event) => setInquiryName(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Email
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(event) => setInquiryEmail(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Phone
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(event) => setInquiryPhone(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Project Type
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {projectTypeOptions.map((option) => (
                      <Pill
                        key={option}
                        label={option}
                        active={projectType === option}
                        disabled={isSubmitting}
                        onClick={() => setProjectType(option)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-description"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="inquiry-description"
                    required
                    rows={4}
                    value={projectDescription}
                    onChange={(event) =>
                      setProjectDescription(event.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="What are you looking to create?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-timeline"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Timeline
                  </label>
                  <input
                    id="inquiry-timeline"
                    type="text"
                    required
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="e.g. Within 2 weeks, flexible, etc."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="button"
                    onClick={backToServiceType}
                    disabled={isSubmitting}
                    className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !projectType}
                    className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {currentStep === 1 && serviceType === "inquiry" && isSubmitted && (
            <motion.div
              key="inquiry-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-8 lg:p-10"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Inquiry Received
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Thanks — we&apos;ll be in touch.
              </h3>
              <p className="mt-4 max-w-2xl text-neutral-400">
                We&apos;ll review your <span className="text-white">
                  {projectType}
                </span>{" "}
                project and follow up with a custom proposal shortly.
              </p>
            </motion.div>
          )}

          {currentStep === 3 && serviceType === "real-estate" && !isSubmitted && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-white">
                Step 4 — Property Details
              </h3>
              <p className="mt-2 text-neutral-400">
                Tell us about the listing and how we should access the property.
              </p>

              <form onSubmit={handleRealEstateSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="property-address"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Property Address
                  </label>
                  <input
                    id="property-address"
                    type="text"
                    required
                    value={propertyAddress}
                    onChange={(event) => setPropertyAddress(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="123 Main Street, Newtown, PA"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client-name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Client Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="Agent or homeowner name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client-email"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Email
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(event) => setClientEmail(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client-phone"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Phone
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(event) => setClientPhone(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label
                    htmlFor="shoot-date"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Preferred Shoot Date
                  </label>
                  <input
                    id="shoot-date"
                    type="date"
                    required
                    value={preferredShootDate}
                    onChange={(event) =>
                      setPreferredShootDate(event.target.value)
                    }
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 focus:border-white [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="access-instructions"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Access Instructions
                  </label>
                  <textarea
                    id="access-instructions"
                    required
                    rows={4}
                    value={accessInstructions}
                    onChange={(event) =>
                      setAccessInstructions(event.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="Lockbox code, gate access, staging notes, etc."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={isSubmitting}
                    className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !EMAIL_REGEX.test(clientEmail) ||
                      !clientPhone.trim()
                    }
                    className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {currentStep === 3 && serviceType === "real-estate" && isSubmitted && (
            <motion.div
              key="step-3-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-8 lg:p-10"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Booking Received
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Your shoot request is in.
              </h3>
              <p className="mt-4 max-w-2xl text-neutral-400">
                We&apos;ll review your package for{" "}
                <span className="text-white">{propertyAddress}</span> and follow
                up to confirm scheduling details.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {serviceType === "real-estate" && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Order Summary
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                {selectedServices.length}{" "}
                {selectedServices.length === 1 ? "service" : "services"} selected
              </p>
              {selectedServices.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(groupedSelectedServices).map(
                    ([category, services]) => (
                      <span
                        key={category}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300"
                      >
                        {category}: {services.length}
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>
            <p className="text-3xl font-bold tracking-tight text-white">
              ${totalPrice}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
