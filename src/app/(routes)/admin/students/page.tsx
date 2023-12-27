import StudentTable from "@/components/Students/StudentsTable/StudentTable";


 const StudentPage = () =>{
    return (
        <div>
        <h1 className="text-center font-bold text-3xl my-5">Students</h1>
        <div><StudentTable/></div>
        </div>
    )
}

export default StudentPage;