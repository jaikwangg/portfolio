import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

// Function to calculate available slots
function getAvailableSlots(
  busySlots: { start: string; end: string }[],
  timeMin: Date,
  timeMax: Date,
  workingHours: { start: number; end: number },
  slotDuration: number
) {
  const availableSlots: { start: string; end: string }[] = [];
  const currentTime = new Date(timeMin);

  while (currentTime < timeMax) {
    const dayOfWeek = currentTime.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

    if (!isWeekend) {
      const slotStart = new Date(currentTime);
      slotStart.setHours(workingHours.start, 0, 0, 0);

      const slotEnd = new Date(currentTime);
      slotEnd.setHours(workingHours.end, 0, 0, 0);

      let tempTime = new Date(slotStart);

      while (tempTime < slotEnd) {
        const potentialSlotStart = new Date(tempTime);
        const potentialSlotEnd = new Date(tempTime.getTime() + slotDuration * 60000);

        let isBusy = false;
        for (const busySlot of busySlots) {
          const busyStart = new Date(busySlot.start);
          const busyEnd = new Date(busySlot.end);

          if (
            (potentialSlotStart >= busyStart && potentialSlotStart < busyEnd) ||
            (potentialSlotEnd > busyStart && potentialSlotEnd <= busyEnd) ||
            (potentialSlotStart <= busyStart && potentialSlotEnd >= busyEnd)
          ) {
            isBusy = true;
            break;
          }
        }

        if (!isBusy) {
          availableSlots.push({
            start: potentialSlotStart.toISOString(),
            end: potentialSlotEnd.toISOString(),
          });
        }
        tempTime = new Date(tempTime.getTime() + slotDuration * 60000);
      }
    }
    currentTime.setDate(currentTime.getDate() + 1);
  }

  return availableSlots;
}

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const timeMin = new Date();
    const timeMax = new Date();
    timeMax.setDate(timeMin.getDate() + 7); // Check for the next 7 days

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busySlots = response.data.items?.map((event) => ({
      start: event.start?.dateTime || event.start?.date || new Date().toISOString(),
      end: event.end?.dateTime || event.end?.date || new Date().toISOString(),
    })) || [];

    const workingHours = {
      start: parseInt(process.env.WORK_HOURS_START || '9', 10), // 9 AM
      end: parseInt(process.env.WORK_HOURS_END || '17', 10),   // 5 PM
    };
    const slotDuration = parseInt(process.env.SLOT_DURATION || '30', 10); // 30 minutes

    const availableSlots = getAvailableSlots(busySlots, timeMin, timeMax, workingHours, slotDuration);

    return NextResponse.json({ availableSlots }, { status: 200 });

  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}
