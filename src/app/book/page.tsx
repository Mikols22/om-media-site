import BookingFlow from "@/components/BookingFlow";

export default function BookShootPage() {
  return (
    <main className="min-h-screen bg-black pb-12 pt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Book Your Shoot</h1>
          <p className="text-lg text-gray-400">
            Select your packages, add-ons, and schedule your media team.
          </p>
        </div>

        <BookingFlow />
      </div>
    </main>
  );
}
