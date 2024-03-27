import CompanyCard from "@/components/company/CompanyCard";
import { cookies } from "next/headers";
import { fetchCompany, fetchCompanyRecruiters } from "@/helpers/api";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import EachCompanyDiv from "./EachCompanyDiv";
interface Props {}

interface company {
    id: string;
    name: string;
}

const AllCompaniesComponent = async () => {
    const Companies = await fetchCompany(cookies()?.get("accessToken")?.value);

    if (Companies?.companies?.length === 0) {
        return (
            <h1 className="text-center text-black text-3xl font-bold flex justify-center items-center w-full h-screen">
                No Comapanies Currently Registered
            </h1>
        );
    }
    const Recruiters = await fetchCompanyRecruiters(
        cookies()?.get("accessToken")?.value,
        cookies()?.get("companyId")?.value,
    );
    console.log("Recruiters", Recruiters);
    return (
        <div className="">
            <div className="border-r-2  rounded-md">
                <div className=" !flex justify-between  w-full border-b-2 rounded-md">
                    <div className="w-fit py-2 mx-2 my-auto">All Companies</div>

                    <div className="w-fit flex ">
                        {/* <div className="px-2  py-2 flex justify-center items-center w-full"><Button size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button></div>
            <div className="px-2 py-2  flex justify-center items-center w-full"><Button size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button></div> */}
                    </div>
                </div>

                <div id="main_content">
                    <div className="flex justify-center items-center my-10">
                        <Button>
                            <Link href="/admin/company/addCompany">Add Company</Link>
                        </Button>
                    </div>
                    <div className="m-4">
                        <Input type="text" placeholder="Search..." />
                    </div>

                    <ScrollArea className="h-72 w-full rounded-md border-t-2">
                        <div className="p-4">
                            {Companies?.map((Company: company, index: number) => {
                                return (
                                    <>
                                        <div key={index}>
                                            <EachCompanyDiv Company={Company} />
                                            <Separator className="my-2" />
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default AllCompaniesComponent;
