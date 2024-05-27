import React,{ useContext, useState } from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/GlobalContext'

export default function CalendarHeader() {
    const { monthIndex, setMonthIndex, Current_view,SetCurrent_view,weekOffset,setWeekOffset,dateOffset,setDateOffset } = useContext(GlobalContext);
    const[Isopen,SetIsOpen] = useState<boolean>(false)
    const drop_down_list = ["Day","Week","Month"]

    function change_view(view_name:string){
      SetCurrent_view(view_name);
    }
  function handlePrevMonth() {
    {Current_view=='Month' && setMonthIndex(monthIndex - 1)};
    {Current_view=='Week' && setWeekOffset(weekOffset - 1)};
    {Current_view=='Day' && setDateOffset(dateOffset-1)};
  }
  function handleNextMonth() {
    {Current_view=='Month' && setMonthIndex(monthIndex + 1)};
    {Current_view=='Week' && setWeekOffset(weekOffset + 1)};
    {Current_view=='Day' && setDateOffset(dateOffset+1)};
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex 
        : dayjs().month()
    );
    setWeekOffset(0);
    setDateOffset(0);
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <button
        onClick={handleReset}
        className="border border-gray-400 rounded py-2 px-2  mr-5 hover:bg-blue-700 hover:text-white hover:border-blue-950 "
      >
        Today
      </button>
      
      <span className='flex flex-1 items-center justify-center space-x-2'>
        <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined mt-1 cursor-pointer text-gray-600 mx-2 bg-gray-300  hover:bg-gray-400 rounded-full">
          chevron_left
        </span>
      </button>
      <h2 className=" text-xl text-gray-600 font-bold cursor-default">
        {Current_view == 'Month' && dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
        {Current_view == 'Week' && (() => {
          const startOfWeek = dayjs().add(weekOffset, 'week').startOf('week');
          const endOfWeek = dayjs().add(weekOffset, 'week').endOf('week');
          const startMonth = startOfWeek.format('MMMM');
          const endMonth = endOfWeek.format('MMMM');
          const year = startOfWeek.format('YYYY');
          return startMonth === endMonth ? `${startMonth} ${year}` : `${startMonth}-${endMonth} ${year}`;
        })()}

        {Current_view == 'Day' && dayjs().add(dateOffset, 'day').format(
          "DD MMMM YYYY"
        )}
      </h2>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined mt-1 cursor-pointer text-gray-600 mx-2 bg-gray-300 hover:bg-gray-400 rounded-full">
          chevron_right
        </span>
      </button>
      </span>
      <button
        onClick={() => SetIsOpen(prev => !prev)}
        className="flex flex-row py-2 px-2  mr-5 hover:bg-gray-300"
      >
        <p>{Current_view}</p>
        <span className='material-icons-outlined'>
        arrow_drop_down

        </span>
        {Isopen && 
        <span className='absolute mt-10 bg-white rounded py-2 '>
          {drop_down_list.map((view_name,idx) => (

            <p 
            onClick={() => change_view(view_name)}
            key={idx}
            className='py-2 min-w-32 text-left pl-2 hover:bg-gray-100'>{view_name}</p>
          )
          )}
        </span>
        }
        
        
      </button>
      
      
    </header>
  )
}
