const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID!;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;

export type CalendarEvent = {
  id: string;
  summary: string;
  start: string; // ISO string
  end: string;   // ISO string
  allDay: boolean;
};

export async function getUpcomingEvents(maxResults = 3): Promise<CalendarEvent[]> {
  const now = new Date();
  const timeMin = now.toISOString();
  const timeMax = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // next 7 days

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID
  )}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&orderBy=startTime&singleEvents=true&maxResults=10`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch calendar events');
  const data = await res.json();

  // Map to our type
  const events: CalendarEvent[] = (data.items || []).map((e: any) => ({
    id: e.id,
    summary: e.summary,
    start: e.start.dateTime || e.start.date, // all-day events have start.date
    end: e.end.dateTime || e.end.date,
    allDay: !!e.start.date && !e.start.dateTime,
  }));

  // Sort events by start time
  events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  // Only return maxResults
  return events.slice(0, maxResults);
}