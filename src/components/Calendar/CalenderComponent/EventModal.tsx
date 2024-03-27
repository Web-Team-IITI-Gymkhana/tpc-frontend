import React,{useContext, useState} from 'react'
import GlobalContext from '../context/GlobalContext';

const labelsClasses = ["green","red","indigo","gray","blue","purple"]
let colours = "bg-green-500 bg-red-500 bg-indigo-500 bg-gray-500 bg-blue-500 bg-purple-500" 




export default function EventModal() {
    const{setShowEventModal,daySelected,dispatchCallEvents,selectedEvent}=
    useContext(GlobalContext);

    const[title,setTitle] = useState(selectedEvent ? selectedEvent.title :"");
    const[description,setDescription] = useState(selectedEvent ? selectedEvent.description :"");
    const[selectedLabel,setselectedLabel] = useState(selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) :labelsClasses[0]);

    function handleSubmit(e){
        e.preventDefault()
        const calendarEvent ={
            title:title,
            description:description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        }
        if(selectedEvent){
            dispatchCallEvents({type:'update' , payload:calendarEvent});

        }
        else{
            dispatchCallEvents({type:'push' , payload:calendarEvent});

        }
        setShowEventModal(false);
    }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <form className='bg-white rounded-lg shadow-2xl w-1/4'>
            <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                <span className='material-icons-outlined text-gray-400'>
                    drag_handle
                </span>
                <div>
                    {selectedEvent && (
                        <span 
                        onClick={() => {
                            dispatchCallEvents({type:"delete",payload: selectedEvent})
                            setShowEventModal(false)
                        }}
                        className='material-icons-outlined text-gray-400 cursor-pointer hover:text-red-500 hover:bg-red-200 rounded-full p-2 '>
                        delete
                    </span>
                    )}
                </div>
                <button onClick={() =>setShowEventModal(false)}>
                    <span className='material-icons-outlined text-gray-400 hover:text-red-400 p-2'>
                        close
                    </span>
                </button>
            </header>
            <div className='p-3'>
                <div className="grid items-end gap-y-7" style={{ gridTemplateColumns: '1fr 5fr' }}>
                <div className='w-20'></div>
                <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className=" pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
                />
                   <span className="material-icons-outlined text-gray-400">
                    schedule
                    </span>
                    <p>{daySelected.format("dddd,MMMM DD")}</p> 
                    <span className="material-icons-outlined text-gray-400">
                    segment
                    </span>
                    <input
                    type="text"
                    name="description"
                    placeholder="Add a Description"
                    value={description}
                    required
                    className=" pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className="material-icons-outlined text-gray-400">
                    bookmark_border
                    </span>
                    <div className="flex gap-x-2">
                        {labelsClasses.map((lb_Class,i) => (
                            <span 
                            key={i} 
                            onClick={() => setselectedLabel(lb_Class)}
                            className={`bg-${lb_Class}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
                                {selectedLabel === lb_Class && 
                                <span className="material-icons-outlined text-white text-sm " style={{ fontSize: '18px' }}>
                                check
                                </span>}
                                
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <footer className='flex justify-end border-t p-3 mt-5'>
                <button 
                type='submit' 
                onClick={handleSubmit}
                className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'>
                    Save
                </button>
            </footer>
        </form>
    </div>
  );
}
