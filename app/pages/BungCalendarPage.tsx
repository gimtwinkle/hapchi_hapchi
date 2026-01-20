"use client";

import { useState } from "react";
import BungCalendar from "../features/bung/calendar/BungCalendar";
import BungModal from "../features/bung/components/BungModal";

export default function BungCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openCreate = (date: Date) => setSelectedDate(date);
  const closeCreate = () => setSelectedDate(null);

  return (
    <>
      <BungCalendar onDateClick={openCreate} />
      <BungModal date={selectedDate} onClose={closeCreate} mode={"create"} />
    </>
  );
}
