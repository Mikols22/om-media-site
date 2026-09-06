import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/video-production";
const title = "Video Production Services | Bucks County & Philadelphia | OM Media";
const description =
  "Cinematic video production for Bucks County and Philadelphia-area brands — from concept to final cut with OM Media.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const CAPABILITIES = [
  "Brand films and company overview videos",
  "Commercials and digital advertising",
  "Customer testimonials and founder interviews",
  "Project showcase and case study films",
  "Real estate and property films",
  "Architecture and interior design features",
  "Hospitality and golf course productions",
  "Recruitment and company culture videos",
  "Event coverage",
  "Drone cinematography",
];

const PROCESS = [
  {
    label: "Creative direction",
    description:
      "We define the message, visual style, audience, and goals for the project.",
  },
  {
    label: "Pre-production",
    description:
      "Concepts, scripts, talking points, shot lists, locations, schedules, and production plans.",
  },
  {
    label: "Production",
    description:
      "Filming, professional audio, lighting, drone, interviews, directing, and on-location crew.",
  },
  {
    label: "Post-production",
    description:
      "Editing, music, sound design, color grading, graphics, and formatting for each platform.",
  },
  {
    label: "Delivery",
    description:
      "Finished pieces prepared for web, social, advertising, presentations, or broadcast.",
  },
];

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Video Production",
  description,
});

export default function VideoProductionPage() {
  return (
    <main className="min-h-screen bg-black pt-20 lg:pt-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Video Production"
        title="Video Production That Brings Your Brand to Life"
        intro="Cinematic brand films, campaigns, and multi-day productions with a full crew and finished post."
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>Some stories are better told in motion.</p>
          <p>
            We produce video that helps businesses communicate clearly,
            connect with their audience, and elevate how their brand is
            presented. Brand films, commercial campaigns, property and
            hospitality features, testimonials, and interviews — with a clear
            purpose behind every frame.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          More than a good-looking video
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            Great video should do more than look impressive. It should tell
            people who you are, what you do, and why they should care.
          </p>
          <p>
            Before production begins we take time to understand your
            business, your audience, and where the finished video will live.
            From there we develop the creative direction, shot list,
            messaging, and approach needed to tell the story properly.
          </p>
          <p>
            Whether the goal is building awareness, showcasing your work,
            explaining a service, or strengthening your brand, every
            production is built around the outcome you want.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What we produce
        </h2>
        <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 text-neutral-400 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-neutral-400">
          Productions range from focused single-day shoots to
          multi-location campaigns with full creative direction and
          post-production.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          From concept to final cut
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          We handle the entire production from start to finish.
        </p>
        <dl className="mt-8 max-w-2xl space-y-6">
          {PROCESS.map((item) => (
            <div
              key={item.label}
              className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
            >
              <dt className="font-semibold text-white">{item.label}</dt>
              <dd className="mt-1 text-neutral-400">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Tell your story in a way people remember
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            Video lets your audience see your work, hear your story, meet
            your team, and experience your brand before they ever contact
            you. Our job is to make sure that first impression reflects the
            quality of the business behind it.
          </p>
          <p>
            Whether you need one standout film or an ongoing production
            partner, we can turn your ideas into work that looks
            professional, feels authentic, and supports how your brand
            grows.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Where We Work
        </p>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Headquartered in Doylestown, Pennsylvania. We work throughout the
          East Coast and travel for productions worldwide.
        </p>
      </div>

      <ServiceCTA
        title="Have a video project in mind?"
        description="Tell us what you're looking to create and we'll take it from there."
      />
    </main>
  );
}
