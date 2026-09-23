import type { Metadata } from "next";
import Link from "next/link";
import { LOCAL_BUSINESS_INFO } from "@/content/localSeo";

const title = "Terms & Conditions | OM Media";
const description =
  "Terms and conditions governing use of OM Media's website, services, and SMS/MMS messaging communications.";

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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-20 lg:pt-[100px]">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Last updated: September 23, 2026
        </p>

        <p className="mt-8 leading-relaxed text-neutral-400">
          Welcome to OM Media LLC (&quot;OM Media,&quot; &quot;we,&quot;
          &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions
          (&quot;Terms&quot;) govern your use of our website, services, and
          SMS/MMS messaging communications. By using our website, booking our
          services, or opting in to receive SMS messages, you agree to these
          Terms.
        </p>

        <Section heading="Services">
          <p>
            OM Media provides creative marketing, photography, videography,
            and digital marketing services. All projects, deliverables, and
            timelines will be defined in a written agreement or proposal
            between OM Media and the client.
          </p>
        </Section>

        <Section heading="Messaging Consent">
          <p>
            By submitting your phone number through our website or texting
            the keyword &quot;BOOK NOW&quot; to our business number, you
            consent to receive SMS or MMS messages from OM Media. These
            messages may include:
          </p>
          <BulletList
            items={[
              "Appointment confirmations and reminders",
              "Project updates or status notifications",
              "Promotional offers or announcements",
            ]}
          />
          <p>
            You may opt out of messages at any time by replying STOP. To
            request help, reply HELP. Message and data rates may apply.
          </p>
        </Section>

        <Section heading="Opt Out and Help">
          <p>
            To unsubscribe, text STOP at any time to stop receiving messages.
            For help, text HELP or contact us at admin@oscarmikols.com.
          </p>
          <p>
            Once you opt out, you may still receive transactional or
            service-related messages (e.g., appointment confirmations) as
            required to fulfill services.
          </p>
        </Section>

        <Section heading="Privacy Policy">
          <p>
            Please review our{" "}
            <Link
              href="/privacy"
              className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-neutral-300"
            >
              Privacy Policy
            </Link>{" "}
            to understand how we collect, use, and protect your personal
            information. Your privacy and data security are very important to
            us.
          </p>
        </Section>

        <Section heading="Intellectual Property">
          <p>
            All photos, videos, creative assets, and materials produced by OM
            Media remain the property of OM Media unless otherwise stated in
            a written agreement. Clients are granted usage rights based on
            their contract or invoice.
          </p>
        </Section>

        <Section heading="Limitation of Liability">
          <p>
            OM Media is not responsible for any indirect, incidental, or
            consequential damages arising from the use of our services,
            website, or messaging communications.
          </p>
        </Section>

        <Section heading="Contact Us">
          <p>If you have questions about these Terms, contact us at:</p>
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
