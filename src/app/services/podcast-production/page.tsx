import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { LOCAL_SERVICE_AREAS } from "@/content/localSeo";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/podcast-production";
const title =
  "The OM hOMe Show | Podcast Production in Doylestown, PA | OM Media";
const description =
  "The OM hOMe Show is a podcast produced by OM Media in our Doylestown, PA studio, featuring builders, designers, realtors, and hospitality leaders from Bucks County and Philadelphia.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

// [PLACEHOLDER] Replace with the real Season 1 links once supplied.
const LISTEN_LINKS = [
  { label: "YouTube", href: "#" },
  { label: "Apple Podcasts", href: "#" },
  { label: "Spotify", href: "#" },
];

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Podcast Production",
  description,
});

export default function PodcastProductionPage() {
  return (
    <main className="min-h-screen bg-black pt-20 lg:pt-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Podcast Production"
        title="The OM hOMe Show"
        intro="A one-on-one podcast experience for the people building, designing, and selling the spaces around us."
        serviceAreas={LOCAL_SERVICE_AREAS}
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>
            The OM hOMe Show is a podcast produced by OM Media and hosted by
            Oscar Mikols, built for professionals in real estate, design,
            construction, and hospitality who have a story worth telling.
          </p>
          <p>
            Each episode is an invitation. We sit down in our Doylestown
            studio and talk through your business — how you got here, what
            you&apos;ve built, and the thinking behind the way you work.
            It&apos;s a conversation, not an interview, and you leave with
            content that positions you as a voice in your industry.
          </p>
          <p>
            Season one is available now on YouTube, Apple Podcasts, and
            Spotify. Season two begins recording in October.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Who&apos;s on the show
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            We record with builders, interior designers, architects,
            realtors, hospitality leaders, and golf course general managers.
            People whose work is visible and whose decisions shape what gets
            built and how it gets sold.
          </p>
          <p>
            The show is invitation-based, though we&apos;re always open to
            hearing from people who think they&apos;d be a fit.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What you walk away with
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            Every appearance is produced as a content asset, not just an
            episode. Depending on the package, that includes a
            professionally engineered audio cut, a full cinematic video
            edit, short-form social reels, behind-the-scenes photography,
            branded quote graphics, and an SEO-optimized article recap.
          </p>
          <p>
            Episodes are recorded in studio, edited, and sent to you for
            approval before anything publishes. Once you sign off, the
            episode goes live on YouTube, Apple Podcasts, and Spotify.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Why it works
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Most business owners in these industries are excellent at what they
          do and invisible online. A podcast appearance solves that in a
          single afternoon — you get a body of content that would take
          months of posting to accumulate, and it exists in a format people
          actually finish.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Listen to season one
        </h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {LISTEN_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={`[PLACEHOLDER] ${link.label} — replace href with the real season one link`}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Where We Record
        </p>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Our studio in Doylestown, Pennsylvania. Sessions are scheduled in
          advance with a dedicated engineer on site.
        </p>
      </div>

      <ServiceCTA
        title="Think you'd be a good fit?"
        description="Tell us about yourself."
      />
    </main>
  );
}
