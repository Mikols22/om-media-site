"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  BUDGET_OPTIONS,
  LOCATION_OPTIONS,
  REFERRAL_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/content/contactOptions";
import { PORTFOLIO_CATEGORY_ORDER, industryItems } from "@/components/IndustryGrid";
import { portfolioImages } from "@/content/portfolioImages";
import type { ClientInquiryPayload } from "@/types/submissions";

const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL_STEPS = 7;

const categoryChoices = PORTFOLIO_CATEGORY_ORDER.map((slug) => {
  const item = industryItems.find((candidate) => candidate.slug === slug);
  if (!item) {
    throw new Error(`PORTFOLIO_CATEGORY_ORDER references unknown slug: ${slug}`);
  }
  return item;
});

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
      className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-white bg-white text-black"
          : "border-white/30 bg-transparent text-white hover:border-white/60"
      }`}
    >
      {label}
    </button>
  );
}

function CategoryToggle({
  title,
  imageSrc,
  hasGallery,
  selected,
  onToggle,
}: {
  title: string;
  imageSrc: string;
  hasGallery: boolean;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 ${
        selected
          ? "border-white"
          : hasGallery
            ? "border-white/10 hover:border-white/30"
            : "border-dashed border-white/15 hover:border-white/25"
      }`}
    >
      {hasGallery ? (
        <>
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 33vw, 20vw"
            className="object-cover opacity-70 transition-all duration-500 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600">
            Coming Soon
          </span>
        </div>
      )}

      {selected && (
        <div className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 1 1 1.4-1.4l3.9 3.9 6.7-6.7a1 1 0 0 1 1.4 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <p className="relative z-[1] text-sm font-semibold text-white">
        {title}
      </p>
    </button>
  );
}

function StepShell({
  stepKey,
  eyebrow,
  title,
  description,
  children,
}: {
  stepKey: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-neutral-400">{description}</p>
      )}
      <div className="mt-8">{children}</div>
    </motion.div>
  );
}

function StepNav({
  onBack,
  onNext,
  onSkip,
  nextDisabled,
  nextLabel = "Next",
  submit,
  isSubmitting,
}: {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  submit?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
      )}
      {submit ? (
        <button
          type="submit"
          disabled={nextDisabled || isSubmitting}
          className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Sending..." : nextLabel}
        </button>
      ) : (
        onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled || isSubmitting}
            className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {nextLabel}
          </button>
        )
      )}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="text-sm font-medium text-neutral-500 underline underline-offset-4 transition-colors duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Skip this step
        </button>
      )}
    </div>
  );
}

export default function ContactFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [projectCategories, setProjectCategories] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [locationDetails, setLocationDetails] = useState("");
  const [budget, setBudget] = useState<string | null>(null);
  const [referralSource, setReferralSource] = useState<string | null>(null);
  const [referralName, setReferralName] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const goNext = () => setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS - 1));
  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const toggleCategory = (slug: string) => {
    setProjectCategories((current) =>
      current.includes(slug)
        ? current.filter((value) => value !== slug)
        : [...current, slug],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: ClientInquiryPayload = {
      serviceType: "client-inquiry",
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message,
      projectCategories,
      timeline: timeline ?? "",
      location: location ?? "",
      ...(locationDetails.trim() && { locationDetails: locationDetails.trim() }),
      ...(budget && { budget }),
      ...(referralSource && { referralSource }),
      ...(referralSource === "referral" &&
        referralName.trim() && { referralName: referralName.trim() }),
    };

    try {
      const response = await fetch("/api/submit-contact", {
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

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl border border-white/10 bg-zinc-950 p-10"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Message Sent
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Thanks — we&apos;ll be in touch.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            We usually respond within one business day.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 lg:px-12 lg:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
        Get In Touch
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-5xl">
        Let&apos;s talk about your project.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-400 lg:text-lg">
        A few quick questions and we&apos;ll follow up with next steps.
        Booking a real estate shoot?{" "}
        <a href="/book" className="text-white underline underline-offset-4">
          Use the booking flow instead
        </a>
        .
      </p>

      <div className="mt-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => index).map(
          (step) => (
            <div
              key={step}
              className={`h-px flex-1 transition-colors duration-300 ${
                currentStep >= step ? "bg-white" : "bg-neutral-800"
              }`}
            />
          ),
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <StepShell
              stepKey="step-0"
              eyebrow="Step 1 of 7"
              title="What kind of project?"
              description="Select all that apply."
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categoryChoices.map((category) => (
                  <CategoryToggle
                    key={category.slug}
                    title={category.title}
                    imageSrc={category.imageSrc}
                    hasGallery={(portfolioImages[category.slug] ?? []).length > 0}
                    selected={projectCategories.includes(category.slug)}
                    onToggle={() => toggleCategory(category.slug)}
                  />
                ))}
              </div>

              <StepNav
                onNext={goNext}
                nextDisabled={projectCategories.length === 0}
              />
            </StepShell>
          )}

          {currentStep === 1 && (
            <StepShell
              stepKey="step-1"
              eyebrow="Step 2 of 7"
              title="Tell us about your project."
              description="What are you looking to create?"
            >
              <textarea
                required
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                placeholder="Tell us what you're working on..."
              />

              <StepNav
                onBack={goBack}
                onNext={goNext}
                nextDisabled={message.trim().length === 0}
              />
            </StepShell>
          )}

          {currentStep === 2 && (
            <StepShell
              stepKey="step-2"
              eyebrow="Step 3 of 7"
              title="What's your timeline?"
            >
              <div className="flex flex-wrap gap-3">
                {TIMELINE_OPTIONS.map((option) => (
                  <Pill
                    key={option.value}
                    label={option.label}
                    active={timeline === option.value}
                    onClick={() => setTimeline(option.value)}
                  />
                ))}
              </div>

              <StepNav onBack={goBack} onNext={goNext} nextDisabled={!timeline} />
            </StepShell>
          )}

          {currentStep === 3 && (
            <StepShell
              stepKey="step-3"
              eyebrow="Step 4 of 7"
              title="Where is the project?"
            >
              <div className="flex flex-wrap gap-3">
                {LOCATION_OPTIONS.map((option) => (
                  <Pill
                    key={option.value}
                    label={option.label}
                    active={location === option.value}
                    onClick={() => setLocation(option.value)}
                  />
                ))}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="location-details"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                >
                  Specifics (optional)
                </label>
                <input
                  id="location-details"
                  type="text"
                  value={locationDetails}
                  onChange={(event) => setLocationDetails(event.target.value)}
                  className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                  placeholder="City, venue, or address"
                />
              </div>

              <StepNav onBack={goBack} onNext={goNext} nextDisabled={!location} />
            </StepShell>
          )}

          {currentStep === 4 && (
            <StepShell
              stepKey="step-4"
              eyebrow="Step 5 of 7"
              title="Budget range?"
            >
              <div className="flex flex-wrap gap-3">
                {BUDGET_OPTIONS.map((option) => (
                  <Pill
                    key={option.value}
                    label={option.label}
                    active={budget === option.value}
                    onClick={() => setBudget(option.value)}
                  />
                ))}
              </div>

              <StepNav
                onBack={goBack}
                onNext={goNext}
                nextDisabled={!budget}
                onSkip={() => {
                  setBudget(null);
                  goNext();
                }}
              />
            </StepShell>
          )}

          {currentStep === 5 && (
            <StepShell
              stepKey="step-5"
              eyebrow="Step 6 of 7"
              title="How did you hear about us?"
            >
              <div className="flex flex-wrap gap-3">
                {REFERRAL_OPTIONS.map((option) => (
                  <Pill
                    key={option.value}
                    label={option.label}
                    active={referralSource === option.value}
                    onClick={() => setReferralSource(option.value)}
                  />
                ))}
              </div>

              <AnimatePresence>
                {referralSource === "referral" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6">
                      <label
                        htmlFor="referral-name"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                      >
                        Who can we thank? (optional)
                      </label>
                      <input
                        id="referral-name"
                        type="text"
                        value={referralName}
                        onChange={(event) => setReferralName(event.target.value)}
                        className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                        placeholder="Their name"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <StepNav
                onBack={goBack}
                onNext={goNext}
                nextDisabled={!referralSource}
                onSkip={() => {
                  setReferralSource(null);
                  goNext();
                }}
              />
            </StepShell>
          )}

          {currentStep === 6 && (
            <StepShell
              stepKey="step-6"
              eyebrow="Step 7 of 7"
              title="Your details."
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(event) => setContactPhone(event.target.value)}
                    className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>

              {submitError && (
                <p className="mt-6 text-sm text-red-400">{submitError}</p>
              )}

              <StepNav
                onBack={goBack}
                submit
                nextLabel="Send Message"
                nextDisabled={
                  !contactName.trim() ||
                  !contactEmail.trim() ||
                  !contactPhone.trim()
                }
                isSubmitting={isSubmitting}
              />
            </StepShell>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
