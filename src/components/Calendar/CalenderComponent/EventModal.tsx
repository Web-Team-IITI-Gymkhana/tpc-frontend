import React, { useContext, useState, MouseEvent,useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { time_list } from './WeekDay';

const labelsClasses: string[] = ["green", "red", "indigo", "gray", "blue", "purple"];

interface CalendarEvent {
    title: string;
    description: string;
    label: string;
    day: number | null;
    timeFrom: string;
    timeTo: string;
    id: string | number;
}

export default function EventModal() {
    const { setShowEventModal, daySelected, dispatchCallEvents, selectedEvent,timeFrom,timeTo,setTimeFrom,setTimeTo } = useContext(GlobalContext);

    const [title, setTitle] = useState<string>(selectedEvent ? selectedEvent.title : "");
    const [description, setDescription] = useState<string>(selectedEvent ? selectedEvent.description : "");
    const [selectedLabel, setSelectedLabel] = useState<string>(selectedEvent ? labelsClasses.find(lbl => lbl === selectedEvent.label) || labelsClasses[0] : labelsClasses[0]);
    const [timeSelector, setTimeSelector] = useState<boolean>(false);
    const [showTimeList, setShowTimeList] = useState<{ from: boolean, to: boolean }>({ from: false, to: false });

   

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
        const calendarEvent: CalendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected ? daySelected.valueOf() : null,
            timeFrom:  timeFrom !== null ? timeFrom : "",
            timeTo:  timeTo !== null ? timeTo : "",
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCallEvents({ type: 'update', payload: calendarEvent });
        } else {
            dispatchCallEvents({ type: 'push', payload: calendarEvent });
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
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    dispatchCallEvents({ type: "delete", payload: selectedEvent });
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
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2 col-start-2 col-span-6">
                            {labelsClasses.map((labelClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(labelClass)}
                                    className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === labelClass && (
                                        <span className="material-icons-outlined text-white text-sm" style={{ fontSize: '18px' }}>
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
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
