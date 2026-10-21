"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { exportJobDetails } from "@/helpers/api";
import { getCurrentUser } from "@/helpers/authUtils";
import toast from "react-hot-toast";
import { Download, Mail, FileSpreadsheet, FileText } from "lucide-react";

interface JobExportModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
  jobRole?: string;
  companyName?: string;
}

export const JobExportModal: React.FC<JobExportModalProps> = ({
  open,
  onClose,
  jobId,
  jobRole,
  companyName,
}) => {
  const currentUser = getCurrentUser();
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(currentUser?.email || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handleExport = async () => {
    if (sendEmail && !email.trim()) {
      toast.error("Please enter a valid recipient email address.");
      return;
    }

    setLoading(true);
    try {
      if (sendEmail) {
        const res = await exportJobDetails(jobId, format, true, email.trim());
        toast.success(res?.message || "Export sent to email successfully!");
      } else {
        await exportJobDetails(jobId, format, false);
        toast.success(`Job details downloaded in ${format.toUpperCase()} format.`);
      }
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to process export request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[480px] bg-white text-black p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            Download All Job Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            {companyName || jobRole
              ? `Export complete details for ${companyName ? companyName : ""} ${jobRole ? `(${jobRole})` : ""}`
              : "Download all job parameters, salaries, applications, coordinators, recruiter & offer details."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Format Selection */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select Export Format
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setFormat("csv")}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  format === "csv"
                    ? "border-blue-600 bg-blue-50 text-blue-900 font-semibold"
                    : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50"
                }`}
              >
                <FileSpreadsheet className={`w-5 h-5 ${format === "csv" ? "text-blue-600" : "text-gray-500"}`} />
                <div>
                  <div className="text-sm">Single CSV</div>
                  <div className="text-xs text-gray-500 font-normal">All details in 1 CSV</div>
                </div>
              </div>

              <div
                onClick={() => setFormat("pdf")}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  format === "pdf"
                    ? "border-blue-600 bg-blue-50 text-blue-900 font-semibold"
                    : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50"
                }`}
              >
                <FileText className={`w-5 h-5 ${format === "pdf" ? "text-blue-600" : "text-gray-500"}`} />
                <div>
                  <div className="text-sm">LaTeX PDF</div>
                  <div className="text-xs text-gray-500 font-normal">Formatted PDF report</div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Option */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                Send export via Email
              </label>
              <Mail className="w-4 h-4 text-gray-400" />
            </div>

            {sendEmail && (
              <div className="pt-2">
                <Label htmlFor="email" className="text-xs font-medium text-gray-600">
                  Recipient Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="mt-1 bg-white border-gray-300 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="px-4 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            disabled={loading}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {loading
              ? "Processing..."
              : sendEmail
              ? "Send Email"
              : `Download ${format.toUpperCase()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
