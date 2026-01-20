"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BungCalendarEvent } from "./types";
import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import BungModal from "../components/BungModal";

interface Props {
  onDateClick?: (date: Date) => void;
}

export default function BungCalendar({ onDateClick }: Props) {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<BungCalendarEvent | null>(
    null
  );

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "bung"));

      const data = snapshot.docs.map((doc) => {
        const d = doc.data();

        return {
          id: doc.id,
          title: d.bungTitle,
          date: d.date.split("T")[0],
          extendedProps: d,
        };
      });

      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
    onDateClick?.(arg.date);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const e = arg.event.extendedProps as BungCalendarEvent;

    setSelectedEvent({
      ...e,
      id: arg.event.id,
    });
  };

  const handleEventAdded = (event: BungCalendarEvent) => {
    setEvents((prev) => [
      ...prev,
      {
        id: event.id,
        title: event.bungTitle,
        date: event.date.split("T")[0],
        extendedProps: event,
      },
    ]);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
      </div>

      {/* 생성 모달 */}
      {selectedDate && (
        <BungModal
          mode="create"
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onEventAdded={handleEventAdded}
        />
      )}

      {/* 읽기 모달 */}
      {selectedEvent && (
        <BungModal
          mode="read"
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <>
      <b>{eventInfo.event.title}</b>
      <br />
      <i>{eventInfo.event.extendedProps.buntTime}</i>
    </>
  );
}
