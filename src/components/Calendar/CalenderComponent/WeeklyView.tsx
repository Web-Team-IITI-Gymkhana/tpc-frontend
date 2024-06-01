import React from 'react';
import WeekDay from './WeekDay';

export default function WeeklyView({ week }: { week: any }) {
  return (
      <div className='flex-1 grid grid-cols-7 grid-rows-1 ml-12'>
      {week.map((day: any, i: number) => ( 
        <WeekDay day={day} key={i} />
      ))}
      </div>
  
    
  );
}
