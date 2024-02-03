'use client'
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronDown, MoreHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "react-modal";
import TableComponent from "@/components/TableComponent/TableComponent";
import DeleteStudentModal from "@/components/Students/Operations/DeleteStudentModal";


interface Student {
  id: string;
  userId: string;
  rollNo: string;
  category: string;
  gender: string;
  cpi: number;
  programId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    contact: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  program: {
    id: string;
    course: string;
    branch: string;
    year: string;
    createdAt: string;
    updatedAt: string;
  };
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
    zIndex: 10000000,
    border: "0px",
    borderRadius: "10px",
  },
  overlay: {
    zIndex: 10000000,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};





const StudentPage = async () => {
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
      cell: ({ row }) => <div className="lowercase">{row.original.user.name}</div>,
    },
    {
      accessorKey: "rollNo",
      header: "Roll Number",
      cell: ({ row }) => <div>{row.getValue('rollNo')}</div>,
    },
    {
      accessorKey: "program.course",
      header: "Course",
      cell: ({ row }) => <div>{row.original.program.course}</div>,
    },
    {
      accessorKey: "program.branch",
      header: "Branch",
      cell: ({ row }) => <div>{row.original.program.branch}</div>,
    },
    {
      accessorKey: "program.year",
      header: "Year",
      cell: ({ row }) => <div>{row.original.program.year}</div>,
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
      accessorKey: "cpi",
      header: "Current CPI",
      cell: ({ row }) => <div>{row.getValue("cpi")}</div>,
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
        const student = row.original;
        let isDeleteModalOpen = false;
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
                  isDeleteModalOpen = true;
                }}
              >
                Delete Student
              </DropdownMenuItem>
              <DropdownMenuItem>Update Student</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const AllStudents = await fetchStudentData(
    Cookies.get("accessToken"),
  );
  console.log(AllStudents)
  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Students</h1>
      <div>
        <TableComponent isAddButton={true} AddButtonText={"Add Students"} data={AllStudents} columns={columns} />
      </div>
    </div>
  );
};

export default StudentPage;
