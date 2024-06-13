import React from "react";
import dayjs, { Dayjs } from "dayjs";

export interface DispatchCallEventsAction {
    type: string;
    payload: any;
  }
  
export interface updateLabelAction {
    label: string;
    checked: boolean;
  }

export interface Job {
  id: string;
  role: string;
  company: {
      id: string;
      name: string;
  };
  season: {
      id: string;
      type: string;
      year:number;
  };
}

export interface selectedDayEvent{
    id:string,
    startDateTime:Date,
    endDateTime:Date,
    metadata:string,
    roundNumber:number,
    type:string,
    visibleToRecruiter:boolean,
    job:Job

}

  

const GlobalContext = React.createContext({
    monthIndex:0,
    setMonthIndex:(index:number) => {},
    weekOffset:0,
    setWeekOffset:(index:number) => {},
    dateOffset:0,
    setDateOffset:(index:number) => {},
    Current_view:'' ,
    SetCurrent_view:(view:string) => {} ,
    showEventModal:false,
    setShowEventModal:(setBool:boolean) => {},
    daySelected: null as Dayjs | null,
    setDaySelected: (day:Dayjs) => {},
    dispatchCallEvents: (action: DispatchCallEventsAction) => {},
    savedEvents:[],
    selectedEvent:null as selectedDayEvent | null,
    setSelectedEvent: (event:selectedDayEvent|null) => {},
    setLabels: (newLabels: updateLabelAction[]) => {},
    labels: [] as updateLabelAction[],
    updateLabel: (action: updateLabelAction) => {},
    filteredEvents:[],
    timeFrom: null as string|null,
    setTimeFrom: (time:string) => {},
    timeTo: null as string|null,
    setTimeTo: (time:string) => {},
    addEvent: (event: selectedDayEvent) => {},
    updateEvent: (event: selectedDayEvent) => {},
    deleteEvent: (eventId: string) => {},
})

export default GlobalContext;