// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import { getUpcomingEvents } from '@/lib/calendar';

export async function GET() {
  try {
    const events = await getUpcomingEvents();
    return NextResponse.json(events);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}