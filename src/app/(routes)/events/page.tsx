"use client";
import Calendar from "@/components/Calendar/Calendar";
import ContextWrapper from "@/components/Calendar/context/ContextWrapper";
import 'material-icons/iconfont/material-icons.css'

export default function CalendarView(){
    return(
        <ContextWrapper>
            <Calendar />
        </ContextWrapper>
        
    );
}




