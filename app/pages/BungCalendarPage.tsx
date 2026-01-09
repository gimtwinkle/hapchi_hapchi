"use client";

import { useState } from "react";
import BungCreateModal from "../features/bung/components/BungCreateModal";
import BungCalendar from "../features/bung/calendar/BungCalendar";

export default function BungCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openCreate = (date: Date) => setSelectedDate(date);
  const closeCreate = () => setSelectedDate(null);

  return (
    <>
      <BungCalendar onDateClick={openCreate} />
      <BungCreateModal date={selectedDate} onClose={closeCreate} />
    </>
  );
}
