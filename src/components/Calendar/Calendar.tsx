import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "./CalenderComponent/util";
import { getWeek } from "./CalenderComponent/util";
import { getDate } from "./CalenderComponent/util";
import Month from "./CalenderComponent/Month";
import GlobalContext from "./context/GlobalContext";
import CalendarHeader from "./CalenderComponent/CalendarHeader";
import EventDetails from "./CalenderComponent/EventDetails";
import SidebarCalendar from "./CalenderComponent/SidebarCalendar";
import WeeklyView from "./CalenderComponent/WeeklyView";
import DailyView from "./CalenderComponent/DailyView";

export default function Calendar() {
  const { monthIndex, showEventModal, Current_view, weekOffset, dateOffset } =
    useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentWeek, setCurrentWeek] = useState(getWeek(weekOffset));
  const [displayDate, setDisplayDate] = useState(getDate(dateOffset));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  useEffect(() => {
    setCurrentWeek(getWeek(weekOffset));
  }, [weekOffset]);
  useEffect(() => {
    setDisplayDate(getDate(dateOffset));
  }, [dateOffset]);

  return (
    <div>
      {showEventModal && <EventDetails />}

      <div className="flex flex-col h-screen">
        <CalendarHeader />
        <div className="flex flex-1">
          <SidebarCalendar />
          {Current_view == "Month" && <Month month={currentMonth} />}
          {Current_view == "Week" && <WeeklyView week={currentWeek} />}
          {Current_view == "Day" && <DailyView date={displayDate} />}
        </div>
      </div>
    </div>
  );
}
