'use client'
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import {ColumnDef} from "@tanstack/react-table";
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
import TableComponent from "@/components/TableComponent/TableComponent";


interface Student {
  memberId: string;
  name: string;
  rollNo: string;
  category: string;
  gender: string;
  branch: string;
  graduationYear: string;
  currentCPI: number;
  resume: string | null; // Assuming resume can be a link or null
  totalPenalty: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    contact: string | null; // Assuming contact can be a phone number or null
    role: string;
    createdAt: string;
    updatedAt: string;
  };
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
    cell: ({ row }) => <div className="lowercase">{row.original.user.name}</div>,
  },
  {
    accessorKey: "rollNo",
    header: "Roll Number",
    cell: ({ row }) => <div>{row.getValue('rollNo')}</div>,
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
      const student = row.original;
      console.log(student);
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

const StudentPage = async () => {
  const AllStudents = await fetchStudentData(
    Cookies.get("accessToken"),
  );
  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-5">Students</h1>
      <div>
        <TableComponent data={AllStudents?.students} columns={columns} />
      </div>
    </div>
  );
};

export default StudentPage;
