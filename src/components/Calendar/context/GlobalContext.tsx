import React from "react";
import { Dayjs } from "dayjs";

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
}

  

const GlobalContext = React.createContext({
    monthIndex:0,
    setMonthIndex:(index:number) => {},
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
})

export default GlobalContext;