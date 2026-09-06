import type { Metadata } from "next";
import Link from "next/link";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/content-creation";
const title = "Content Creation Services | Bucks County & Philadelphia | OM Media";
const description =
  "On-location content creation for Bucks County and Philadelphia-area brands — photo and video built for how people actually scroll.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const WHAT_WE_CREATE = [
  "Professional photography",
  "Short-form social video, Reels, and vertical content",
  "Talking-head and educational pieces",
  "Behind-the-scenes footage",
  "Project and portfolio photography",
  "Team and company culture content",
  "Customer testimonials",
  "Drone photography and video",
];

const CREATE_ONCE = [
  {
    label: "Social media",
    description:
      "Reels, posts, Stories, carousels, and behind-the-scenes updates.",
  },
  {
    label: "Your website",
    description: "Fresh photography, service imagery, portfolio projects, and brand video.",
  },
  {
    label: "Advertising",
    description: "Creative for Meta, Instagram, YouTube, and retargeting campaigns.",
  },
  {
    label: "Email marketing",
    description: "Project announcements, newsletters, case studies, and updates.",
  },
  {
    label: "Sales and outreach",
    description: "Presentations, proposals, recruiting materials, and client communication.",
  },
];

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Content Creation",
  description,
});

export default function ContentCreationPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Content Creation"
        title="Content Creation That Gives Your Brand Something Worth Sharing"
        intro="Professional photo and video built for social, web, and advertising — one shoot, months of material."
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>
            Your brand needs more than a few photos and an occasional video.
            It needs a steady stream of professional, intentional content that
            tells your story, showcases your work, and keeps your business
            visible.
          </p>
          <p>
            We create high-quality photo and video specifically designed for
            today&apos;s digital platforms, giving your team a library of
            assets that works across social media, websites, advertising, and
            email.
          </p>
          <p>
            Whether we&apos;re documenting a completed project, capturing your
            team behind the scenes, or building an entire month of social
            assets in a single shoot, every piece is created with a purpose.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          More than just a content shoot
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            We don&apos;t show up simply to take photos. Before every shoot we
            consider what you&apos;re trying to accomplish, who you&apos;re
            trying to reach, and how the content will be used.
          </p>
          <p>
            That lets us create a mix of polished brand imagery, short-form
            video, behind-the-scenes footage, educational pieces, and
            social-first creative that gives you significantly more mileage
            from every shoot. One shoot can become weeks or months of
            marketing material.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What we create
        </h2>
        <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 text-neutral-400 sm:grid-cols-2">
          {WHAT_WE_CREATE.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Built for your brand
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            Good content should feel like your company, not like something
            copied from another brand&apos;s feed. We take time to understand
            your visual identity, voice, and clientele so what we produce is
            cohesive with the brand you&apos;re building.
          </p>
          <p>
            We specialize in industries where craftsmanship, design, and
            attention to detail are part of the product — luxury home
            builders, interior designers, real estate professionals,
            hospitality brands, architects, and restaurants. Our job is to
            translate what makes your company different into content people
            immediately understand.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Create once. Market everywhere.
        </h2>
        <dl className="mt-8 max-w-2xl space-y-6">
          {CREATE_ONCE.map((item) => (
            <div key={item.label} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
              <dt className="font-semibold text-white">{item.label}</dt>
              <dd className="mt-1 text-neutral-400">{item.description}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-neutral-400">
          Instead of wondering what to post next, you&apos;ll have an
          organized library of professional content ready to work for your
          business.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          You run the business. We&apos;ll help tell the story.
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            Creating consistent content is one of the biggest challenges
            businesses face. You have projects to complete, clients to serve,
            and a company to run. Marketing gets pushed to the bottom of the
            list.
          </p>
          <p>
            OM Media gives your business a creative team you can rely on to
            consistently capture what you&apos;re doing and turn it into
            content that strengthens your brand.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-6 inline-block text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:decoration-white"
        >
          See how we work
        </Link>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Where We Work
        </p>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Headquartered in Doylestown, Pennsylvania, working throughout the
          East Coast, and traveling for projects worldwide.
        </p>
      </div>

      <ServiceCTA
        title="Have a content need in mind?"
        description="Tell us about your brand and what you're looking to create."
      />
    </main>
  );
}
