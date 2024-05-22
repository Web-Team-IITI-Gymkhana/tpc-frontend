"use client";
import React, { useState } from "react";
import { Separator } from "../../../../components/ui/separator";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {interviewExpData} from "../../../../dummyData/Interviews";

// interface Props {
//     interviewExpData: InterviewExperience[];
// }



interface InterviewExperience {
    ques: string;
    ans: string;
    student_name: string;
    difficulty:string,
    tags:Array<string>;
}

const InterviewExperiencesPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div>
            <div>
                <h1 className="text-xl font-bold px-3 py-5">Interview Experiences</h1>
            </div>
            <Separator/>
            <div>
            <Accordion
                className=""
                type="single"
                defaultValue="1"
                collapsible

            >
                {interviewExpData.map((e,i)=>(
                    
                        <AccordionItem value={String(i+1)} 
                            className="py-6 px-4 bg-white my-3 rounded-xl hover:drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] ">
                            <AccordionTrigger
                                className="font-semibold px-1 flex"
                            >
                                    {e.ques}
                                    <ChevronDownIcon className="ml-3 mt-0.5"/>
                                
                                
                            </AccordionTrigger>
                            
                            <AccordionContent
                                className="px-1 pt-4"
                            >
                                <Separator className="mb-3"/>
                                {e.ans}
                                <br/>
                                <div className="flex gap-3">
                                    <div className=" bg-slate-400 text-white mt-3 font-semibold px-2 py-1 border rounded-3xl inline-block text-xs ">
                                        By {e.student_name}
                                    </div>
                                    <div className=" text-slate-500 mt-3 font-semibold px-2 py-1 border rounded-3xl inline-block border-slate-500 text-xs ">
                                        {e.difficulty}
                                    </div>
                                    <div className=" text-slate-500 mt-3 font-semibold px-2 py-1 border rounded-3xl inline-block border-slate-500 text-xs ">
                                        {e.tags[0]}
                                    </div>
                                    <div className=" text-slate-500 mt-3 font-semibold px-2 py-1 border rounded-3xl inline-block border-slate-500 text-xs ">
                                        {e.tags[1]}
                                    </div>
                                </div>
                                </AccordionContent>
                        </AccordionItem>
                    
                ))}
            </Accordion>
            </div>
           
        </div>
    )
}

export default InterviewExperiencesPage;