import React, { useContext, useState, MouseEvent,useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { time_list } from './WeekDay';
import dayjs from 'dayjs';
import { selectedDayEvent } from '../context/GlobalContext';

export const labelsClasses = new Map([
    ["INTERVIEW", "green"], 
    ["PPT", "red"], 
    ["TEST", "indigo"], 
    ["COMPLETED", "blue"], 
    ["APPLICATION", "purple"]
]);
const colors = ["bg-green-300", "bg-red-300", "bg-indigo-300", "bg-gray-300", "bg-blue-300", "bg-purple-300"];
const colorsHeader = ["bg-green-100", "bg-red-100", "bg-indigo-100", "bg-gray-100", "bg-blue-100", "bg-purple-100"];

export default function EventModal() {
    const { setShowEventModal, daySelected, selectedEvent,addEvent,updateEvent,deleteEvent} = useContext(GlobalContext);

    const [title, setTitle] = useState<string>(selectedEvent ? selectedEvent.job.company.name : "");
    const [description, setDescription] = useState<string>(selectedEvent ? selectedEvent.metadata : "");
    const [selectedLabel, setSelectedLabel] = useState<[string, string]>(selectedEvent ? [selectedEvent.type, labelsClasses.get(selectedEvent.type) || ""] : ["", ""]);    
    // const [selectedLabel, setSelectedLabel] = useState<string>(selectedEvent ? labelsClasses.find(lbl => lbl === selectedEvent.type) || labelsClasses[0] : labelsClasses[0]);
    const [timeSelector, setTimeSelector] = useState<boolean>(false);
    const [showTimeList, setShowTimeList] = useState<{ from: boolean, to: boolean }>({ from: false, to: false });
    const [timeFrom,setTimeFrom] = useState(selectedEvent ? dayjs(selectedEvent.startDateTime).format('hh:00 A') : "from")
    const [timeTo,setTimeTo] = useState(selectedEvent ? dayjs(selectedEvent.endDateTime).format('hh:00 A') : "to")
    const [checked,setChecked] = useState(selectedEvent ? selectedEvent.visibleToRecruiter : false)
    // const [type,setType] = useState(selectedEvent ? selectedEvent.type : "")
    const [companyName,setCompanyName] = useState(selectedEvent ? selectedEvent.job.company.name : "")
    const [role,setRole] = useState(selectedEvent ? selectedEvent.job.role : "")
    const [recruitmentType,setRecruitmentType] = useState(selectedEvent ? selectedEvent.job.season.type : "")
    const [roundNumber,setRoundNumber] = useState(selectedEvent ? selectedEvent.roundNumber : 1)
    const[IsOpen,setIsOpen] = useState<boolean>(false)

    function displayColor(label:string){
        return labelsClasses.get(label);
      }

    function convertToDateTime(timeString, dayjsObject) {
        const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)/i;
        const match = timeString.match(timeRegex);
    
        if (!match) {
            throw new Error('Invalid time format');
        }
    
        let hour = parseInt(match[1], 10);
        const minute = parseInt(match[2], 10);
        const period = match[3].toUpperCase();
    
        if (period === 'PM' && hour !== 12) {
            hour += 12;
        } else if (period === 'AM' && hour === 12) {
            hour = 0;
        }
    
        const year = dayjsObject.year();
        const month = dayjsObject.month(); 
        const day = dayjsObject.date();
    
        const dateObject = new Date(year, month, day, hour, minute);
        return dateObject;
    }
    function generateUUID() {
        let uuid = '', i, random;
        
        for (i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid += '-';
            } else {
                random = Math.random() * 16 | 0;
                if (i === 14) {
                    uuid += '4';
                } else if (i === 19) {
                    uuid += (random & 0x3 | 0x8).toString(16);
                } else {
                    uuid += random.toString(16);
                }
            }
        }
        return uuid;
    }

    
    


    function handleTimeChange(time: string, type: 'from' | 'to') {
        if (type === 'from') {
            setTimeFrom(time);
        } else {
            setTimeTo(time);
        }
        setShowTimeList({ from: false, to: false });
    }

    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const calendarEvent: selectedDayEvent = {
            id:generateUUID(),
            startDateTime: timeFrom =="from"? null : convertToDateTime(timeFrom, daySelected),
            endDateTime:timeTo == "to" ? null : convertToDateTime(timeTo, daySelected),
            metadata:description,
            roundNumber:roundNumber,
            type:selectedLabel[0],
            visibleToRecruiter:checked,
            job:{
                company:{
                    id:generateUUID(),
                    name:companyName,
                },
                id:generateUUID(),
                role:role,
                season:{
                    id:generateUUID(),
                    type:recruitmentType,
                    year:daySelected.year(),
                },

            }
        };
        if (selectedEvent) {
            updateEvent(calendarEvent)
        } else {
            addEvent(calendarEvent)
        }
        setShowEventModal(false);
    }
    function removeTime(){
        setTimeFrom('from')
        setTimeTo('to')
        setTimeSelector(false)
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
            <form className="bg-white rounded-lg shadow-2xl w-1/4  ">
                <header 
                className={`bg-${displayColor(selectedLabel[0])}-100 px-4 py-2 flex justify-between items-center`}
                >
                    <span className="material-icons-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    deleteEvent(selectedEvent.id);
                                    setShowEventModal(false);
                                }}
                                className="material-icons-outlined text-gray-400 cursor-pointer hover:text-red-500 hover:bg-red-200 rounded-full p-2">
                                delete
                            </span>
                        )}
                    </div>
                    <button 
                    onClick={() => {
                        setShowEventModal(false)
                        removeTime()
                        }}>
                        <span className="material-icons-outlined text-gray-400 hover:text-red-400 p-2">
                            close
                        </span>
                    </button>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-7 items-end gap-y-4">
                        <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
                            title
                        </span>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title}
                            required
                            className="col-start-2 col-span-6 pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
                            schedule
                        </span>
                        {daySelected && <p className="pl-2 col-start-2 col-span-3">{daySelected.format("dddd, MMMM DD")}</p>}
                        {(!timeSelector && timeFrom=="from") ? (
                            <button
                                onClick={() => setTimeSelector(true)}
                                className="col-start-6 col-span-2 text-sm text-gray-500 hover:text-gray-800">
                                Add time
                            </button>
                        ) : (
                            <button
                                onClick={() => removeTime()}
                                className="col-start-6 col-span-2 text-sm text-gray-500 hover:text-gray-800">
                                Remove time
                            </button>
                        )}
                        {(timeSelector||timeFrom!="from") && 
                            <div className="col-start-2 col-span-6 flex flex-row ">
                                <div className="relative flex flex-col mr-2">
                                    <p
                                        
                                        onClick={() => setShowTimeList({ ...showTimeList, from: true })}
                                        className="rounded bg-gray-200 text-sm w-20 pl-2 border border-transparent p-1 hover:border-gray-500 hover:cursor-pointer"
                                    >{timeFrom}</p>
                                    {showTimeList.from && (
                                        <div className="absolute top-full mt-1 bg-white rounded py-2 max-h-40 overflow-scroll scroll-m-1 shadow-lg border border-gray-200 z-10">
                                            {time_list.map((time, idx) => (
                                                <p
                                                    onClick={() => handleTimeChange(time, 'from')}
                                                    key={idx}
                                                    className="py-2 min-w-32 text-left pl-2 hover:bg-gray-100 hover:cursor-pointer"
                                                >{time}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="p-1">-</p>
                                <div className="relative flex flex-col ml-2">
                                    <p
                                        onClick={() => setShowTimeList({ ...showTimeList, to: true })}
                                        className="rounded bg-gray-200 text-sm pl-2 w-20 border border-transparent p-1 hover:border-gray-500 hover:cursor-pointer"
                                    >{timeTo}</p>
                                    {showTimeList.to && (
                                        <div className="absolute top-full mt-1 bg-white rounded py-2 max-h-40 overflow-scroll scroll-m-1 shadow-lg border border-gray-200 z-10">
                                            {time_list.map((time, idx) => (
                                                <p
                                                    onClick={() => handleTimeChange(time, 'to')}
                                                    key={idx}
                                                    className="py-2 min-w-32 text-left pl-2 hover:bg-gray-100 hover:cursor-pointer"
                                                >{time}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            }
                        <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a Description"
                            value={description}
                            required
                            className="col-start-2 col-span-6 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
                            visibility
                        </span>
                        <label className='items-center mt-3 flex flex-row col-start-2 col-span-6'>
                            <input 
                            type='checkbox' 
                            checked={checked} 
                            onChange={() => setChecked(!checked)}
                            className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer`} />
                            <p className='ml-2 text-gray-700 font-semibold'>Visible To Recruiter</p>
                        </label>
                        <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
                            label
                        </span>
                        <div className="relative w-full col-start-2 col-span-6">
                        <input
                            type="text"
                            name="type"
                            placeholder="Add type"
                            value={selectedLabel[0]}
                            required
                            className="col-start-2 col-span-6 pt-3 border-0 text-gray-600 font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            // onChange={(e) => setType(e.target.value)}
                            onClick={() => setIsOpen(!IsOpen)}
                        />
                        {IsOpen && 
                            <span className='absolute left-0 mt-2 bg-white rounded py-2 w-full border border-gray-200 shadow-lg'>
                                {Array.from(labelsClasses.entries()).map(([label, color], idx) => (
                                    <p 
                                        onClick={() => {
                                            setSelectedLabel([label, color]);
                                            setIsOpen(!IsOpen);
                                        }}
                                        key={idx}
                                        className='py-2 pl-2 text-left hover:bg-gray-100 cursor-pointer'
                                    >
                                        {label}
                                    </p>
                                ))}
                            </span>
                        }
                    </div>
                        

                        <span className="material-icons-outlined col-start-1 col-span-1 text-gray-400">
                            work
                        </span>
                        <div className='col-start-2 col-span-1 font-medium'>
                            Type :
                        </div>
                        <input
                            type="text"
                            name="job_type"
                            placeholder=""
                            value={recruitmentType}
                            className="col-start-3 col-span-5 pt-3 border-0 text-gray-600 font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setRecruitmentType(e.target.value)}
                        />
                        
                        

                        <div className='col-start-2 col-span-2 font-medium'>
                            Company :
                        </div>
                        <input
                            type="text"
                            name="company_name"
                            placeholder=""
                            value={companyName}
                            className="col-start-4 col-span-4 pt-3 border-0 text-gray-600 font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <div className='col-start-2 col-span-1 font-medium'>
                            Role :
                        </div>
                        <input
                            type="text"
                            name="role"
                            placeholder=""
                            value={role}
                            className="col-start-3 col-span-5 pt-3 border-0 text-gray-600 font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <div className='col-start-2 col-span-2 font-medium'>
                            Round :
                        </div>
                        <input
                            type="number"
                            name="round_number"
                            placeholder=""
                            value={roundNumber}
                            className="col-start-4 -ml-10 col-span-1 text-center pt-3 border-0 text-gray-600 font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setRoundNumber(e.target.valueAsNumber)}
                        />
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}
