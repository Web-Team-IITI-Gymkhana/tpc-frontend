import React from 'react'
import Link from 'next/link';
interface Event {
    id: string;
    name: string;
    date: string;
}

interface Coordinator {
    id: string;
    name: string;
}

interface FacultyCoordinatorApproval {
    id: string;
    facultyId: string;
    approvalStatus: string;
}

interface OnCampusOffer {
    id: string;
    name: string;
    offerStatus: string;
}

interface RoleOffered {
    id: string;
    roleName: string;
}

interface Props {
    ele: {
        id: string;
        seasonId: string;
        recruiterId: string;
        companyId: string;
        role: string;
        metadata: string;
        docs: string;
        publicAccess: boolean;
        eligibilityCpi: number;
        status: string;
        events: Event[];
        tpcCoordinators: Coordinator[];
        facultyCoordinatorApprovals: FacultyCoordinatorApproval[];
        onCampusOffers: OnCampusOffer[];
        rolesOffered: RoleOffered[];
    }

}


const JobCard = ({ ele }: Props) => {
    return (
        <div className='border-2'>


            <div className="p-12 shadow-xl flex flex-col items-start">
                <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">CPI {ele.eligibilityCpi}+</span>
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{ele.role}</h2>
                <p className="leading-relaxed mb-8">{ele.metadata}</p>
                <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                    <Link href={`/admin/jobs/${ele.id}`} className="text-indigo-500 inline-flex items-center">Learn More
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


export default JobCard;