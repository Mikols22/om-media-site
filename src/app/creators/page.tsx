import type { Metadata } from "next";
import CreatorForm from "@/components/CreatorForm";

const title = "Become a Creator | OM Media";
const description =
  "Apply to join OM Media's network of elite videographers, editors, and creative professionals.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <CreatorForm />
    </main>
  );
}
