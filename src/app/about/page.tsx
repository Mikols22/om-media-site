import type { Metadata } from "next";
import Image from "next/image";
import ServiceCTA from "@/components/ServiceCTA";

const title = "About | OM Media";
const description =
  "OM Media is a real estate and hospitality production company founded in 2017 in Doylestown, PA, with work featured in Dwell, The New York Times, and Bucks County Magazine.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const processSteps = [
  {
    title: "Discovery call",
    description:
      "We learn the project, the scope, and what you need the content to do.",
  },
  {
    title: "RFP",
    description: "You send the details, we scope the work.",
  },
  {
    title: "Proposal and contract",
    description: "Terms agreed, deposit paid, dates held.",
  },
  {
    title: "Pre-production",
    description:
      "Depending on scale, we scout the location and hold a pre-shoot call to align on shot list and shoot-day workflow.",
  },
  {
    title: "Shoot day",
    description:
      "Solo or with a full crew, depending on what the project requires.",
  },
  {
    title: "Post",
    description: "Our editing team works the files.",
  },
  {
    title: "Delivery",
    description: "Within the agreed timeline.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          About
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
          OM Media
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
          Real estate and hospitality production, built in Bucks County since
          2017.
        </p>
      </div>

      <div className="relative h-[50vh] w-full lg:h-[70vh]">
        <Image
          src="/images/team-photo.jpg"
          alt="OM Media studio environment"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          How It Started
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          OM Media was founded in 2017 by Oscar Mikols with a straightforward
          idea: real estate deserved better marketing than it was getting.
          Luxury real estate is still the core of what we do, but the work
          has grown well past it — hospitality, golf courses, events,
          culinary, portraits, and brand storytelling for the people who
          build and design the spaces we shoot.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Recognition
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Our work has appeared in Dwell, The New York Times, and Bucks
          County Magazine. We&apos;ve produced content for musical events
          headlined by Dierks Bentley and The O&apos;Jays.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          How We Work
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Every project follows the same path, whether it&apos;s a single
          listing or a multi-day resort production.
        </p>

        <ol className="mt-12 max-w-2xl list-none space-y-10">
          {processSteps.map((step, index) => (
            <li key={step.title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-white/10" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-neutral-400">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-neutral-400">
          Turnaround runs one to two weeks for most projects and four to six
          weeks for larger productions with heavier deliverables.
          Availability varies by season, so earlier conversations mean better
          dates.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Where We Work
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Headquartered in Doylestown, Pennsylvania, with regular work across
          Pennsylvania, New Jersey, the New York metro area, Delaware,
          California, and Florida. Some territories have limitations — if
          you&apos;re unsure whether we cover yours, ask.
        </p>
      </div>

      <ServiceCTA title="Let's bring your vision to life." />
    </main>
  );
}
