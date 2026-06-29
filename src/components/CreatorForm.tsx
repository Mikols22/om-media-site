"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const availabilityOptions = [
  "1 day per week",
  "2-3 days",
  "4-5 days",
  "Full-time",
];

const serviceAreaOptions = [
  "Bucks County",
  "Philly",
  "NYC Metro",
  "NJ",
  "Nationwide",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  portfolioLink: string;
};

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

function MagneticButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  };

  return (
    <motion.button
      ref={buttonRef}
      type="submit"
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: disabled ? 0 : offset.x, y: disabled ? 0 : offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.6 }}
      className="mt-10 w-full rounded-full bg-white px-8 py-5 text-base font-bold tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[16rem]"
    >
      {children}
    </motion.button>
  );
}

export default function CreatorForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    portfolioLink: "",
  });
  const [availability, setAvailability] = useState<string | null>(null);
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleServiceArea = (area: string) => {
    setServiceAreas((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : [...current, area],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          availability,
          serviceAreas,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Submission failed");
      }

      setIsSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-28 xl:px-24">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Join the Team
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-5xl xl:text-6xl">
            Become a Creator
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400 lg:text-lg">
            Apply to join OM Media&apos;s network of elite videographers, editors,
            and creative professionals.
          </p>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-10 lg:p-14"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                  Application Submitted
                </p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                  Application received. Welcome to the roster.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-400">
                  We&apos;ll review your application and be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="mt-12 space-y-10"
              >
                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                      placeholder="Phone"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="portfolioLink"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Resume / Portfolio Link
                    </label>
                    <input
                      id="portfolioLink"
                      name="portfolioLink"
                      type="url"
                      required
                      value={formData.portfolioLink}
                      onChange={(event) =>
                        updateField("portfolioLink", event.target.value)
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white"
                      placeholder="YouTube, Vimeo, Drive, or portfolio URL"
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Availability
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {availabilityOptions.map((option) => (
                      <Pill
                        key={option}
                        label={option}
                        active={availability === option}
                        disabled={isSubmitting}
                        onClick={() => setAvailability(option)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Service Area
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {serviceAreaOptions.map((option) => (
                      <Pill
                        key={option}
                        label={option}
                        active={serviceAreas.includes(option)}
                        disabled={isSubmitting}
                        onClick={() => toggleServiceArea(option)}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <MagneticButton disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="relative hidden min-h-[32rem] lg:block">
          <Image
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85&auto=format&fit=crop"
            alt="Professional camera equipment"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
    </section>
  );
}
