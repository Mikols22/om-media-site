import type { Metadata } from "next";
import { LOCAL_BUSINESS_INFO } from "@/content/localSeo";

const title = "Privacy Policy | OM Media";
const description =
  "How OM Media collects, uses, and protects your personal information, including SMS/MMS messaging consent.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-neutral-400">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-white">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-20 lg:pt-[100px]">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Last updated: September 23, 2026
        </p>

        <p className="mt-8 leading-relaxed text-neutral-400">
          OM Media LLC (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;)
          values your privacy. This Privacy Policy explains how we collect,
          use, and protect your personal information when you interact with
          us, including when you provide your phone number to receive
          SMS/MMS communications.
        </p>

        <Section heading="Information We Collect">
          <BulletList
            items={[
              "Name, phone number, email address, and other contact details you voluntarily provide.",
              "Information related to services you book with us.",
              "Communication preferences and responses to our messages.",
            ]}
          />
        </Section>

        <Section heading="How We Use Your Information">
          <BulletList
            items={[
              "To send appointment reminders, service updates, and project communications.",
              "To send marketing messages and promotional offers (only if you opted in).",
              "To respond to inquiries and provide customer support.",
            ]}
          />
        </Section>

        <Section heading="SMS/MMS Messaging">
          <BulletList
            items={[
              "By providing your phone number, you consent to receive SMS or MMS messages from OM Media.",
              "We will not share your mobile information with third parties or affiliates for marketing purposes.",
              "Standard message and data rates may apply.",
              "You may opt out at any time by replying STOP.",
              "Reply HELP for assistance.",
            ]}
          />
        </Section>

        <Section heading="Data Sharing">
          <BulletList
            items={[
              "We do not sell or rent your personal information.",
              "We may share your information with service providers who help us deliver our services (e.g., messaging platforms).",
              "We may disclose information if required by law.",
            ]}
          />
        </Section>

        <Section heading="Your Rights">
          <BulletList
            items={[
              "You can request to update, access, or delete your personal information by contacting us at admin@oscarmikols.com.",
              "You can opt out of receiving messages at any time.",
            ]}
          />
        </Section>

        <Section heading="Security">
          <p>
            We take reasonable steps to protect your personal information
            from unauthorized access or disclosure.
          </p>
        </Section>

        <Section heading="Contact Us">
          <p>
            If you have questions about this Privacy Policy, contact us at:
          </p>
          <address className="not-italic">
            OM Media LLC
            <br />
            {LOCAL_BUSINESS_INFO.streetAddress}, {LOCAL_BUSINESS_INFO.addressLocality},{" "}
            {LOCAL_BUSINESS_INFO.addressRegion} {LOCAL_BUSINESS_INFO.postalCode}
            <br />
            <a
              href={`mailto:${LOCAL_BUSINESS_INFO.email}`}
              className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-neutral-300"
            >
              {LOCAL_BUSINESS_INFO.email}
            </a>
            <br />
            <a
              href={`tel:${LOCAL_BUSINESS_INFO.telephone}`}
              className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-neutral-300"
            >
              {LOCAL_BUSINESS_INFO.phoneDisplay}
            </a>
          </address>
        </Section>
      </div>
    </main>
  );
}
