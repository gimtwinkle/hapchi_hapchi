"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { BungCalendarEvent } from "./types";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface Props {
  onDateClick: (date: Date) => void;
}

export default function BungCalendar({ onDateClick }: Props) {
  const handleDateClick = (arg: DateClickArg) => {
    onDateClick(arg.date);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      eventContent={renderEventContent}
      dateClick={handleDateClick}
    />
  );
}

async function renderEventContent(eventInfo: BungCalendarEvent) {
  const querySnapshot = await getDocs(collection(db, "bung"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
