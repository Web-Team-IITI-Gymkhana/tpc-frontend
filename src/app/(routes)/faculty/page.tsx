"use client";
import { fetchApprovals } from "@/helpers/faculty/api";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
import TableComponent from "@/components/TableComponent/TableComponent";

const FacultyApprovalsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchApprovals(undefined);
        console.log("Faculty Approvals Data:", jsonData); // Debug log
        setData(jsonData);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: {
        className: "bg-amber-100 text-amber-800 border-amber-200",
        label: "Pending",
      },
      APPROVED: {
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
        label: "Approved",
      },
      REJECTED: {
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Rejected",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <span
        className={`${config.className} font-medium px-3 py-1 rounded-full border inline-block text-sm`}
      >
        {config.label}
      </span>
    );
  };

  const formatSalary = (salary: number) => {
    if (!salary) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const columns = [
    {
      accessorKey: "salary.job.company.name",
      header: "Company",
      cell: ({ row }: any) => (
        <div className="font-medium text-slate-800">
          {row.original.salary?.job?.company?.name || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "salary.job.role",
      header: "Role",
      cell: ({ row }: any) => (
        <div className="text-slate-700">
          {row.original.salary?.job?.role || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "salary.totalCTC",
      header: "Salary (CTC)",
      cell: ({ row }: any) => (
        <div className="font-medium text-slate-800">
          {formatSalary(row.original.salary?.totalCTC)}
        </div>
      ),
    },
    {
      accessorKey: "salary.job.season.type",
      header: "Season Type",
      cell: ({ row }: any) => (
        <div className="text-slate-700">
          {row.original.salary?.job?.season?.type || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "salary.job.season.year",
      header: "Year",
      cell: ({ row }: any) => (
        <div className="text-slate-700">
          {row.original.salary?.job?.season?.year || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }: any) => (
        <div className="text-slate-700 max-w-xs truncate">
          {row.original.remarks || "No remarks"}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  Faculty Approvals
                </h1>
                <p className="text-slate-600 text-base">
                  Review and approve placement and internship opportunities for
                  students
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">
                    {data?.length || 0}
                  </span>{" "}
                  total requests
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Component */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {data && data.length > 0 ? (
            <TableComponent
              data={data}
              columns={columns}
              isFeedbackForm={true}
              actionButton={true}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No Approval Requests
              </h3>
              <p className="text-slate-600">
                You don't have any pending approval requests at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyApprovalsPage;
