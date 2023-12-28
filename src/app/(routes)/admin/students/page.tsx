import StudentTable from "@/components/Students/StudentsTable/StudentTable";
import {StudentsData} from "../../../../dummyData/students"

 const StudentPage = async () =>{
    const AllStudents = await fetchStudentData()
    return (
        <div>
        <h1 className="text-center font-bold text-3xl my-5">Students</h1>
        <div><StudentTable data={AllStudents}/></div>
        </div>
    )
}

const fetchStudentData = async () =>{
    // const res = await fetch('')
    // const json = res.json()
    // return json
    return StudentsData;
}
export default StudentPage;