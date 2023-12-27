import React from 'react'
import Link from 'next/link'


interface Props { 
    ele:{
        name:String,
        id:String,
        jafs:any,
        ppoOffers:any,
        recruiters:any
    }
}

export default function CompanyCard({ele}:Props) {
    return (
        <div>
            <div className="w-full">
                <div className="h-full bg-gray-200 shadow-xl bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{ele?.name?.slice(0,20)}</h1>
                    
                    <Link href={`/admin/company/${ele?.id}`} className="text-gray-800 hover:scale-105 transition-all fade-in-out inline-flex items-center">Learn More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}
