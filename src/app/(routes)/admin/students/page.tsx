"use client"
import { fetchStudentData } from "@/helpers/api"
import Cookies from "js-cookie"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, ChevronDown, MoreHorizontal, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TableComponent from "@/components/TableComponent/TableComponent"
import { useEffect, useState } from "react"

interface Student {
  memberId: string
  name: string
  rollNo: string
  category: string
  gender: string
  branch: string
  graduationYear: string
  currentCPI: number
  resume: string | null // Assuming resume can be a link or null
  totalPenalty: number
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
    name: string
    contact: string | null // Assuming contact can be a phone number or null
    role: string
    createdAt: string
    updatedAt: string
  }
}

const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="lowercase">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "rollNo",
    header: "Roll Number",
    cell: ({ row }) => <div>{row.getValue("rollNo")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.user.email}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => <div>{row.original.user.contact}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original
      console.log(student)
      let isDeleteModalOpen = false
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                isDeleteModalOpen = true
              }}
            >
              Delete Student
            </DropdownMenuItem>
            <DropdownMenuItem>Update Student</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// eslint-disable-next-line @next/next/no-async-client-component
const StudentPage = () => {
  const [AllStudents, setAllStudents] = useState<Student[]>()
  useEffect(() => {
    const fetchAllStudents = async () => {
      const AllStudents = await fetchStudentData(Cookies.get("accessToken"))
      setAllStudents(AllStudents)
    }
    console.log("AllStudents")

    fetchAllStudents()
  }, [])

  // const AllStudents = await fetchStudentData(Cookies.get("accessToken"))
  // const AllStudents = [
  //   {
  //     id: "9b883346-6ffc-4a5e-a4eb-0104aeb4cd92",
  //     userId: "1f3e3743-d959-4af5-af0e-b9365a69b59e",
  //     rollNo: "210001015",
  //     category: "GEN",
  //     gender: "MALE",
  //     cpi: 9,
  //     programId: "00976d43-d0e3-4023-852d-f3e09d676b19",
  //     user: {
  //       email: "aak@gmail.com",
  //       name: "Aaka",
  //       contact: "91 821856989",
  //     },
  //     program: {
  //       course: "PHD",
  //       branch: "MATHEMATICS",
  //       year: "2024",
  //     },
  //   },
  //   {
  //     id: "aceb19a9-0cd7-4001-98c8-fad003610653",
  //     userId: "02b6c126-9360-4f4b-aa21-530763869b94",
  //     rollNo: "200001077",
  //     category: "GEN",
  //     gender: "MALE",
  //     cpi: 0,
  //     programId: "00976d43-d0e3-4023-852d-f3e09d676b19",
  //     user: {
  //       email: "PradeeK@gmail.com",
  //       name: "PRadeeK",
  //       contact: "1234",
  //     },
  //     program: {
  //       course: "PHD",
  //       branch: "MATHEMATICS",
  //       year: "2024",
  //     },
  //   },
  //   {
  //     id: "b1e326ab-5ff1-4ab7-9c67-3a8a1ccf6a59",
  //     userId: "ac5861a7-693a-422c-9841-007582ce8106",
  //     rollNo: "200001087",
  //     category: "GEN",
  //     gender: "MALE",
  //     cpi: 0,
  //     programId: "00976d43-d0e3-4023-852d-f3e09d676b19",
  //     user: {
  //       email: "PradeK12346@gmail.com",
  //       name: "PRadeeK12345",
  //       contact: "1234",
  //     },
  //     program: {
  //       course: "PHD",
  //       branch: "MATHEMATICS",
  //       year: "2024",
  //     },
  //   },
  //   {
  //     id: "b0b1c398-5660-4269-ad9a-3a23db299724",
  //     userId: "6af0e91a-b7f2-43b6-a82e-4ba9c2f8fca8",
  //     rollNo: "210001015",
  //     category: "GEN",
  //     gender: "MALE",
  //     cpi: 9,
  //     programId: "00976d43-d0e3-4023-852d-f3e09d676b19",
  //     user: {
  //       email: "aak123@gmail.com",
  //       name: "a",
  //       contact: "91 821856989",
  //     },
  //     program: {
  //       course: "PHD",
  //       branch: "MATHEMATICS",
  //       year: "2024",
  //     },
  //   },
  //   {
  //     id: "ea660a5c-35e2-41a1-936e-29406d7fe782",
  //     userId: "042d0462-b849-417c-9dde-3d52b6897197",
  //     rollNo: "200001077",
  //     category: "GEN",
  //     gender: "MALE",
  //     cpi: 2,
  //     programId: "00976d43-d0e3-4023-852d-f3e09d676b19",
  //     user: {
  //       email: "PradeeK123@gmail.com",
  //       name: "b",
  //       contact: "1234",
  //     },
  //     program: {
  //       course: "PHD",
  //       branch: "MATHEMATICS",
  //       year: "2024",
  //     },
  //   },
  //   {
  //     id: "45a8f4bb-6eab-40f3-9eae-1e2aec11a8da",
  //     userId: "494faa6f-eb59-4526-a0c0-161fc5424b57",
  //     rollNo: "200001087",
  //     category: "GEN",
  //     gender: "MALE",
  //     cpi: 4,
  //     programId: "00976d43-d0e3-4023-852d-f3e09d676b19",
  //     user: {
  //       email: "PradeK1ddddd2346@gmail.com",
  //       name: "c",
  //       contact: "1234",
  //     },
  //     program: {
  //       course: "PHD",
  //       branch: "MATHEMATICS",
  //       year: "2024",
  //     },
  //   },
  // ]
  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-5">Students</h1>
      <div>
        <TableComponent data={AllStudents?.students} columns={columns} />
      </div>
    </div>
  )
}

export default StudentPage
