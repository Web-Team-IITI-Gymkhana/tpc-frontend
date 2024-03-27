import React from "react";

export interface DispatchCallEventsAction {
    type: string;
    payload: any;
  }
  
export interface updateLabelAction {
    label: string;
    checked: boolean;
  }

  

const GlobalContext = React.createContext({
    monthIndex:0,
    setMonthIndex:(index:number) => {},
    showEventModal:false,
    setShowEventModal:() => {},
    daySelected: null,
    setDaySelected: (day:any) => {},
    dispatchCallEvents: (action: DispatchCallEventsAction) => {},
    savedEvents:[],
    selectedEvent: null,
    setSelectedEvent: () => {},
    setLabels:() => {},
    labels: [],
    updateLabel: (action: updateLabelAction) => {},
    filteredEvents:[],
})

export default GlobalContext;