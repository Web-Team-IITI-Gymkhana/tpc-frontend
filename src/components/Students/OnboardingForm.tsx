"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { StudentDataType } from "@/helpers/student/types";
import { updateOnboarding } from "@/helpers/student/api";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface OnboardingFormProps {
  studentData: StudentDataType;
  onUpdate: () => void;
}

const BACKLOG_OPTIONS = [
  { value: "NEVER", label: "No Backlogs Ever" },
  { value: "PREVIOUS", label: "No Active Backlogs" },
  { value: "ACTIVE", label: "Having an Active Backlog" },
];

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  studentData,
  onUpdate,
}) => {
  const [backlog, setBacklog] = useState<string>("");
  const [tenthMarks, setTenthMarks] = useState<string>("");
  const [twelthMarks, setTwelthMarks] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingField, setPendingField] = useState<
    "backlog" | "tenthMarks" | "twelthMarks" | null
  >(null);

  // Check which fields need to be filled
  const needsBacklog =
    studentData.backlog === null || studentData.backlog === undefined;
  const needsTenthMarks =
    studentData.tenthMarks === null || studentData.tenthMarks === undefined;
  const needsTwelthMarks =
    studentData.twelthMarks === null || studentData.twelthMarks === undefined;

  const hasAnyPendingFields =
    needsBacklog || needsTenthMarks || needsTwelthMarks;

  const handleSubmit = async (
    field: "backlog" | "tenthMarks" | "twelthMarks",
  ) => {
    // Validate the field value first
    if (field === "backlog" && !backlog) {
      toast.error("Please select a backlog status");
      return;
    } else if (field === "tenthMarks" && !tenthMarks) {
      toast.error("Please enter 10th marks");
      return;
    } else if (field === "twelthMarks" && !twelthMarks) {
      toast.error("Please enter 12th marks");
      return;
    }

    // Validate marks range
    if (field === "tenthMarks" && tenthMarks) {
      const marks = parseFloat(tenthMarks);
      if (marks < 0 || marks > 100) {
        toast.error("10th marks should be between 0 and 100");
        return;
      }
    } else if (field === "twelthMarks" && twelthMarks) {
      const marks = parseFloat(twelthMarks);
      if (marks < 0 || marks > 100) {
        toast.error("12th marks should be between 0 and 100");
        return;
      }
    }

    // Show confirmation modal
    setPendingField(field);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingField) return;

    setLoading(true);
    setShowConfirmModal(false);

    try {
      const updateData: any = {};

      if (pendingField === "backlog" && backlog) {
        updateData.backlog = backlog;
      } else if (pendingField === "tenthMarks" && tenthMarks) {
        updateData.tenthMarks = parseFloat(tenthMarks);
      } else if (pendingField === "twelthMarks" && twelthMarks) {
        updateData.twelthMarks = parseFloat(twelthMarks);
      }

      const result = await updateOnboarding(updateData);

      if (result) {
        toast.success(
          `${pendingField === "backlog" ? "Backlog status" : pendingField === "tenthMarks" ? "10th marks" : "12th marks"} saved successfully!`,
        );

        // Clear the form field
        if (pendingField === "backlog") setBacklog("");
        else if (pendingField === "tenthMarks") setTenthMarks("");
        else if (pendingField === "twelthMarks") setTwelthMarks("");

        onUpdate(); // Refresh parent data
      } else {
        toast.error("Failed to save data");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save data");
    } finally {
      setLoading(false);
      setPendingField(null);
    }
  };

  if (!hasAnyPendingFields) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-600">
            <CheckCircle className="w-6 h-6" />
            Profile Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Your profile is complete! All required information has been
            provided.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <Info className="w-6 h-6" />
          Complete Your Profile
        </CardTitle>
        <p className="text-sm text-slate-600">
          Please complete the following information. You can fill and save each
          field individually.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {needsBacklog && (
          <div className="space-y-3">
            <Label
              htmlFor="backlog"
              className="text-sm font-medium text-slate-700"
            >
              Backlog Status *
            </Label>
            <div className="flex gap-3">
              <Select value={backlog} onValueChange={setBacklog}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select your backlog status" />
                </SelectTrigger>
                <SelectContent>
                  {BACKLOG_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleSubmit("backlog")}
                disabled={!backlog || loading}
                className="min-w-[80px]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        )}

        {needsTenthMarks && (
          <div className="space-y-3">
            <Label
              htmlFor="tenthMarks"
              className="text-sm font-medium text-slate-700"
            >
              10th Marks (%) *
            </Label>
            <p className="text-xs text-slate-500 mb-2">
              Enter your 10th standard marks as{" "}
              <strong>percentage out of 100</strong>. If your board uses
              GPA/CGPA or grades, please convert to percentage.
            </p>
            <div className="flex gap-3">
              <Input
                id="tenthMarks"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={tenthMarks}
                onChange={(e) => setTenthMarks(e.target.value)}
                placeholder="Enter percentage (e.g., 85.5)"
                className="flex-1"
              />
              <Button
                onClick={() => handleSubmit("tenthMarks")}
                disabled={!tenthMarks || loading}
                className="min-w-[80px]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        )}

        {needsTwelthMarks && (
          <div className="space-y-3">
            <Label
              htmlFor="twelthMarks"
              className="text-sm font-medium text-slate-700"
            >
              12th Marks (%) *
            </Label>
            <p className="text-xs text-slate-500 mb-2">
              Enter your 12th standard marks as{" "}
              <strong>percentage out of 100</strong>. If your board uses
              GPA/CGPA or grades, please convert to percentage.
            </p>
            <div className="flex gap-3">
              <Input
                id="twelthMarks"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={twelthMarks}
                onChange={(e) => setTwelthMarks(e.target.value)}
                placeholder="Enter percentage (e.g., 92.3)"
                className="flex-1"
              />
              <Button
                onClick={() => handleSubmit("twelthMarks")}
                disabled={!twelthMarks || loading}
                className="min-w-[80px]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium mb-2">
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Important Verification Warning
          </p>
          <p className="text-sm text-red-700">
            All information provided will be subject to verification during the placement process. 
            Any discrepancies found during verification may lead to strict action, including 
            <strong> removal from the placement process</strong>. Please ensure all details are 
            accurate and can be verified with proper documentation.
          </p>
        </div>
      </CardContent>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Confirm Save
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Are you sure you want to save this information?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <Info className="w-4 h-4 inline mr-2" />
                <strong>Important:</strong> Once saved, these values cannot be modified. 
                Please ensure accuracy before saving.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
