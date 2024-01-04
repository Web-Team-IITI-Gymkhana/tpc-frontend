import StudentTable from "@/components/Students/StudentsTable/StudentTable";
import {StudentsData} from "../../../../dummyData/students"
import { fetchStudentData } from "@/helpers/api";
import { cookies } from "next/headers";
 const StudentPage = async () =>{
    const AllStudents = await fetchStudentData(cookies()?.get('accessToken')?.value)
    return (
        <div>
        <h1 className="text-center font-bold text-3xl my-5">Students</h1>
        <div><StudentTable data={AllStudents}/></div>
        </div>
    )
}


export default StudentPage;