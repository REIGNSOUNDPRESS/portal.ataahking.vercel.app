'use client'

import { useEffect, useState } from 'react'

type CTA = {
  label: string
  url: string
}

export type Event = {
  id: string
  title: string
  description: string
  start: string
  end: string
  ctas?: CTA[]
  allDay?: boolean
  priority?: boolean
}

export default function ScheduleSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events')
        if (!res.ok) throw new Error('Failed to fetch calendar events')
        const data = await res.json()

        const parsed = data.map((e: Event) => {
          const lines = e.description?.split('\n') || []
          const textLines: string[] = []
          const ctas: CTA[] = []

          lines.forEach((line) => {
            const trimmed = line.trim()
            if (trimmed.startsWith('CTA:')) {
              const [, rest] = trimmed.split('CTA:')
              const [label, url] = rest.split(':').map((s) => s.trim())
              if (label && url) ctas.push({ label, url })
            } else {
              textLines.push(line)
            }
          })

          return {
            ...e,
            description: textLines.join('\n'),
            ctas,
          }
        })

        setEvents(parsed)
        setLoading(false)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading)
    return <p className="text-gray-500">Loading schedule...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!events.length)
    return <p className="text-gray-500">No events scheduled.</p>

  const now = new Date()
  const upcoming = events
    .filter((e) => new Date(e.end) >= now)
    .sort(
      (a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    )
    .slice(0, 3)

  return (
    <section className="mt-8 bg-black text-white px-6 py-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Today's Public Schedule</h2>

      <ul className="space-y-4">
        {upcoming.map((event) => (
          <li
            key={event.id}
            className="grid grid-cols-[120px_1fr] gap-4 border border-gray-800 p-4 rounded-md hover:bg-gray-900 cursor-pointer transition"
            onClick={() => setSelectedEvent(event)}
          >
            {/* Time Column */}
            <div className="text-gray-400 text-sm font-mono">
              {new Date(event.start).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <br />
              {new Date(event.end).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>

            {/* Event Column */}
            <div>
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-300 mt-1 line-clamp-3">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-start pt-16 z-50">
          <div className="bg-black border border-gray-700 rounded-lg p-6 w-11/12 max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            <h3 className="text-3xl font-bold">{selectedEvent.title}</h3>
            <p className="text-gray-400 mt-1">
              {new Date(selectedEvent.start).toLocaleString()} -{' '}
              {new Date(selectedEvent.end).toLocaleString()}
            </p>

            <div className="mt-4 whitespace-pre-line text-gray-300">
              {selectedEvent.description}
            </div>

            {selectedEvent.ctas && selectedEvent.ctas.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedEvent.ctas.map((cta) => (
                  <a
                    key={cta.url}
                    href={cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
