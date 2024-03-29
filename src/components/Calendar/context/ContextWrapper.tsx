import React,{ useState , useReducer, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import GlobalContext from './GlobalContext'
import { DispatchCallEventsAction } from './GlobalContext';
import { updateLabelAction } from './GlobalContext';
import { selectedDayEvent } from './GlobalContext';



function savedEventsReducer(state:any,{type,payload}:DispatchCallEventsAction){
  switch(type){
    case 'push':
      return [...state,payload];
    case 'update':
      return state.map((evt:any) => evt.id === payload.id ? payload : evt)
    case 'delete':
      return state.filter((evt:any) => evt.id !== payload.id )
    default:
      throw new Error();
  }
}

function initEvents(){
  const storageEvents = localStorage.getItem('savedEvents')
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
  return parsedEvents
}

export default function ContextWrapper(props: { children: React.ReactNode }) {
    const[monthIndex,setMonthIndex] = useState(dayjs().month());
    const[showEventModal,setShowEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [selectedEvent, setSelectedEvent] = useState<selectedDayEvent | null>(null);
    const[labels,setLabels] = useState<updateLabelAction[]>([])
    const [savedEvents,dispatchCallEvents] = useReducer(savedEventsReducer,[],initEvents);

    const filteredEvents = useMemo(() => {
      return savedEvents.filter((evt:any) => 
        labels.filter((lbl:updateLabelAction) => lbl.checked)
        .map((lbl:updateLabelAction) => lbl.label)
        .includes(evt.label)
        );
    },[savedEvents,labels]);


    useEffect(() => {
      setLabels((prevLabels) => {
        return [...new Set(savedEvents.map((evt:updateLabelAction) => evt.label))].map((label:any) =>
        {
          const currentLabel = prevLabels.find(lbl => lbl.label === label)
          return {
            label,
            checked : currentLabel ? currentLabel.checked :true,
          }
        })
      })
    },[savedEvents])
    
    useEffect(() => {
      localStorage.setItem("savedEvents",JSON.stringify(savedEvents));
    },[savedEvents])

    useEffect(() => {
      if(!showEventModal){
        setSelectedEvent(null);
      }
    },[showEventModal])

    function updateLabel(newLabel:updateLabelAction){
      setLabels(labels.map((lbl) => lbl.label === newLabel.label ? newLabel : lbl))
    }


    return (
    <GlobalContext.Provider
     value={{
       monthIndex, 
       setMonthIndex, 
       showEventModal,
       setShowEventModal,
       daySelected,
       setDaySelected,
       dispatchCallEvents,
       savedEvents,
       selectedEvent,
       setSelectedEvent,
       labels,
       setLabels,
       updateLabel,
       filteredEvents,

       }} >
        {props.children}
    </GlobalContext.Provider>
  )
}
