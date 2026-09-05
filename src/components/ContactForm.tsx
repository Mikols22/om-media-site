"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ClientInquiryPayload } from "@/types/submissions";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: ClientInquiryPayload = {
      serviceType: "client-inquiry",
      ...formData,
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

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 lg:px-12 lg:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
        Get In Touch
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-5xl">
        Let&apos;s talk about your project.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-400 lg:text-lg">
        Tell us a bit about what you need and we&apos;ll follow up shortly.
        Booking a real estate shoot?{" "}
        <a href="/book" className="text-white underline underline-offset-4">
          Use the booking flow instead
        </a>
        .
      </p>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-10"
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
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-8"
          >
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
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
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
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
              >
                Phone (optional)
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                placeholder="(555) 555-5555"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                placeholder="What are you looking to create?"
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-400">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
