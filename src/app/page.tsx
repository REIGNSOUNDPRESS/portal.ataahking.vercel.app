import ScheduleSection from "@/components/ScheduleSection"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

      {/* Schedule */}
      <section>
        <h2 className="text-xl font-semibold mb-6">
          Schedule
        </h2>

        <ScheduleSection />
      </section>

      {/* Latest Release */}
      <section>
        <h2 className="text-xl font-semibold mb-6">
          Latest Release
        </h2>

        <article className="space-y-4 text-neutral-300 leading-relaxed">

          <p className="text-sm text-neutral-500">
            GLOBAL — March 8, 2026
          </p>

          <p>
            Reignsound Press™ has developed the official Public Portal for
            rapper ATAAH KING. The portal provides public schedule access,
            informational releases, and official updates.
          </p>

          <p>
            The portal infrastructure utilizes modern web technologies
            including Next.js®, React®, Vercel®, and Google Calendar™.
          </p>

          <a
            href="/info"
            className="inline-block text-blue-400 hover:underline"
          >
            Learn more →
          </a>

        </article>
      </section>

    </div>
  )
}
