import React,{ useState , useContext ,useEffect } from "react";
import { getMonth } from "./CalenderComponent/util";
import Month from "./CalenderComponent/Month";
import GlobalContext from "./context/GlobalContext";
import CalendarHeader from "./CalenderComponent/CalendarHeader";
import calenderSidebar from "./CalenderComponent/calenderSidebar";
import EventModal from "./CalenderComponent/EventModal";
import SidebarCalendar from "./CalenderComponent/SidebarCalendar";

export default function Calendar(){
    const [currentMonth,setCurrentMonth]= useState(getMonth());
    const{ monthIndex , showEventModal } = useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    },[monthIndex]);

    return(
        <div> 
            { showEventModal && <EventModal /> }
            
            <div className="flex flex-col h-screen">
                <CalendarHeader />
                <div className="flex flex-1">
                    <SidebarCalendar />
                    <Month month={currentMonth} /> 
                </div>
                   
                

            </div>
        </div>
    );
}