import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { labelsClasses } from './EventModal';

let colors = "text-green-400 text-red-400 text-indigo-400 text-gray-400 text-blue-400 text-purple-400"
export default function Labels() {
    const { labels ,updateLabel} = useContext(GlobalContext);

  return (
    <React.Fragment>
        <p className='text-gray-500 font-bold '>Label</p>
          {Array.from(labelsClasses.entries()).map(([label, color], idx) => {
                const checked = labels.find(lbl => lbl.label === label)?.checked || false;
                return (
                    <label key={idx} className='items-center mt-3 block'>
                        <input 
                            type='checkbox' 
                            checked={checked} 
                            onChange={() => updateLabel({ label, checked: !checked })}
                            className={`form-checkbox h-5 w-5 text-${color}-400 rounded focus:ring-0 cursor-pointer`} 
                        />
                        <span className='ml-2 text-gray-700 font-medium capitalize'>{label}</span>
                    </label>
                );
            })}
    </React.Fragment>
  )
}
