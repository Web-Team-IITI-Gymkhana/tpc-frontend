import React,{ useContext } from 'react'
import Labels from './Labels'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext'


export default function SidebarCalendar() {

  return (
    <aside className='border p-5 w-40'>
        <Labels />
    </aside>
  )
}
