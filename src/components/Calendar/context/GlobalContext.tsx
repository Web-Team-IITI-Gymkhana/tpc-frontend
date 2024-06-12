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

export interface selectedDayEvent{
    title:string,
    description:string,
    label:string,
    id:string;
    day: number | null;
    timeFrom: string;
    timeTo: string;
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
})

export default GlobalContext;