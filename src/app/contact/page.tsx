import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

const title = "Contact | OM Media";
const description =
  "Get in touch with OM Media about your next video production, photography, or digital strategy project.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <ContactForm />
    </main>
  );
}
