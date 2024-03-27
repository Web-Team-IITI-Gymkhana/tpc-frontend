import React,{ useContext } from 'react'
import Labels from './Labels'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext'


export default function SidebarCalendar() {
  // const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  // function handleReset() {
  //   setMonthIndex(
  //     monthIndex === dayjs().month()
  //       ? monthIndex + Math.random()
  //       : dayjs().month()
  //   );
  // }
  return (
    <aside className='border p-5 w-40'>
      {/* <button
        onClick={handleReset}
        className="border border-gray-500 rounded py-2 px-2 mt-10 "
      >
        Today
      </button> */}
        <Labels />
    </aside>
  )
}
