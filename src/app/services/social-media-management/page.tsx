import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceFaq from "@/components/ServiceFaq";
import ServiceHero from "@/components/ServiceHero";
import { buildFaqSchema, type FaqItem } from "@/lib/faqSchema";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/social-media-management";
const title =
  "Social Media Management in Doylestown, PA | Bucks County & Philadelphia | OM Media";
const description =
  "Social media management for Doylestown, Bucks County, and Philadelphia businesses — content calendars, posting, and community engagement from OM Media.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "Who comes up with the ideas for videos and reels?",
    answer:
      "We do. Every account starts with a strategy intake where we learn your brand, your goals, and what your audience responds to. From there our team builds a monthly content calendar and develops the concepts for each shoot. You're welcome to bring ideas, but you're not expected to — that's what you're hiring us for.",
  },
  {
    question: "Do you write scripts and concepts?",
    answer:
      "Yes. Concepting, scripting, and shot planning are all part of the service. We arrive at each shoot with a plan for what we're capturing and why, so the day is efficient and you're not standing around while we figure it out.",
  },
  {
    question: "How long does a content shoot take on site?",
    answer:
      "Most shoots run two to four hours depending on the package and location. We work efficiently and around your schedule — the goal is to capture a full month of content in a single visit so you're not giving up time every week.",
  },
  {
    question: "How much do additional content shoots cost?",
    answer:
      "Additional shoots range from $500 to $1,500 depending on scope — whether you need photos, video, or both, and how much we're capturing. Most clients find their package covers what they need, but if you're launching a project or opening a new location, we can add a shoot for that month.",
  },
  {
    question: "Do we get to see content before it's posted?",
    answer:
      "Yes. Everything runs through your content calendar, and you'll get an approval link before anything publishes. You can approve the full month at once or go post by post — whichever fits how involved you want to be.",
  },
];

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Social Media Management",
  description,
});
const faqSchema = buildFaqSchema(faqItems);

export default function SocialMediaManagementPage() {
  return (
    <main className="min-h-screen bg-black pt-20 lg:pt-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServiceHero
        eyebrow="Social Media Management"
        title="Social Media Management in Bucks County"
        intro="Consistent, professional content for builders, realtors, and local businesses who want their brand to look as good online as their work does in person."
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>
            Running a business doesn&apos;t leave time to run an Instagram
            account. Most local businesses know they should be posting
            consistently — they just don&apos;t have the hours, the equipment,
            or the appetite to figure out what actually works.
          </p>
          <p>
            OM Media handles it end to end. We come to you, shoot the content,
            edit it, build the calendar, and post it. You approve, we publish.
            No stock photos, no recycled templates, no scrambling for
            something to put up on Thursday.
          </p>
          <p>
            We&apos;ve been producing content for builders, realtors,
            architects, and hospitality brands across Bucks County and the
            Philadelphia region since 2017, with work featured in Dwell and
            The New York Times.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Why It Works
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
          We shoot first
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            Most social media management is scheduling. Someone takes what you
            already have and spreads it across the week.
          </p>
          <p>
            We shoot first. Every package starts with a content shoot at your
            site, your project, or your listing — real footage of your actual
            work. That&apos;s what makes the difference between a feed that
            looks like a business and a feed that looks like a template.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Service Area
        </p>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Headquartered in Doylestown, PA, serving Bucks County, Philadelphia,
          Montgomery County, and the surrounding region.
        </p>
      </div>

      <ServiceFaq items={faqItems} />

      <ServiceCTA
        title="Ready to grow your presence?"
        description="Tell us about your business and we'll put together a plan for your accounts."
        note="Packages start at a monthly retainer with a 12-month minimum."
      />
    </main>
  );
}
