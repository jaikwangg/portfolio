"use client";

import { useState, useEffect } from 'react';

interface Slot {
  start: string;
  end: string;
}

interface AvailabilityData {
  availableSlots: Slot[];
}

const Availability = () => {
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/calendar');
        if (!response.ok) {
          throw new Error('Failed to fetch availability. Please ensure the Google Calendar API is configured correctly.');
        }
        const data = await response.json();
        setAvailability(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const groupSlotsByDay = (slots: Slot[]) => {
    const grouped: { [key: string]: Slot[] } = {};
    slots.forEach(slot => {
      const date = new Date(slot.start).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
    });
    return grouped;
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading availability...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!availability || availability.availableSlots.length === 0) {
    return <div className="text-center p-4">No available slots in the next 7 days.</div>;
  }

  const groupedSlots = groupSlotsByDay(availability.availableSlots);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">Available Time Slots</h2>
      <div className="space-y-4">
        {Object.entries(groupedSlots).map(([day, slots]) => (
          <div key={day}>
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{day}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {slots.map(slot => (
                <div key={slot.start} className="p-2 border rounded-md text-center bg-white dark:bg-gray-700 text-black dark:text-white">
                  {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Availability;
