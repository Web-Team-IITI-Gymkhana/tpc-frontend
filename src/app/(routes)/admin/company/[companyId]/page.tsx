import JAFCard from "@/components/company/JAFCard";
import EachCompanyCard from "@/components/company/EachCompanyCard"
import { AllCompanies } from "@/dummyData/company"
import { fetchEachCompanyDetails } from "@/helpers/api";
import { cookies } from "next/headers";
interface Props {
    params: {
        companyId: String
    }
}

interface CompanyData {
    name: String;
    id: String;
    jafs: any;
    ppoOffers: any;
    recruiters: any;
}


export default async function EachCompanyPage({ params }: Props) {
    const EachCompany = await fetchEachCompanyDetails(cookies().get('accessToken')?.value,params.companyId)
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">12 Dec 2023</h2>
                        <h1 className="sm:text-4xl text-3xl font-bold  title-font mb-4 text-gray-900">{EachCompany?.name}</h1>
                    </div>

                    {EachCompany?.jafs?.length === 0 ? (
                        <h1 className="sm:text-xl font-medium title-font mb-4 text-gray-900 text-center">No Jobs Listed Currently</h1>
                    ) : (
                        <div className="flex flex-wrap">
                            <JAFCard />
                        </div>
                    )}

                    {EachCompany?.ppoOffers?.length === 0 ? (
                        <h1 className="sm:text-xl font-medium title-font mb-4 text-gray-900 text-center">No PPO Offers Currently</h1>
                    ) : (
                        <div className="flex flex-wrap">
                            <JAFCard />
                        </div>
                    )}

                    {EachCompany?.recruiters?.length === 0 ? (
                        <h1 className="sm:text-xl font-medium title-font mb-4 text-gray-900 text-center">No Recruiters Currently</h1>
                    ) : (
                        <div className="flex flex-wrap">
                            <JAFCard />
                        </div>
                    )}
                    <section className="text-gray-600 body-font">
                        <h1 className="text-center mt-10 mb-2">Sample Cards for Jobs , PPOs and Recruiters in company section</h1>
                        <div className="container px-5  mx-auto">
                            <div className="flex flex-wrap">
                                <JAFCard />
                                <JAFCard />
                                <JAFCard />
                                <JAFCard />
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}


