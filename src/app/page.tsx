import ScheduleSection from '../components/ScheduleSection'
import PressList from '../components/PressList'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-6">ATAAH KING Public Portal</h1>

      {/* Schedule Section */}
      <ScheduleSection />

      {/* Press Releases */}
      <PressList />
    </main>
  )
}