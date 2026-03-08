import { NextResponse } from 'next/server'

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID?.trim()
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY?.trim()

export async function GET() {
  try {
    const now = new Date()
    const timeMin = now.toISOString()
    const timeMax = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID!)}/events` +
      `?key=${API_KEY}` +
      `&timeMin=${encodeURIComponent(timeMin)}` +
      `&timeMax=${encodeURIComponent(timeMax)}` +
      `&singleEvents=true` +
      `&orderBy=startTime` +
      `&maxResults=10`

    const res = await fetch(url)

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Google API error: ${res.status} ${text}`)
    }

    const data = await res.json()

    const events = (data.items || []).map((e: any) => ({
      id: e.id,
      summary: e.summary,
      start: e.start.dateTime || e.start.date,
      end: e.end.dateTime || e.end.date,
      description: e.description || '',
      location: e.location || ''
    }))

    return NextResponse.json(events.slice(0, 3))
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
