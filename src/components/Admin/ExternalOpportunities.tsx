"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createExternalOpportunity } from "@/helpers/api";
import toast from "react-hot-toast";

interface AddExternalOpportunityProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddExternalOpportunity = ({
  open,
  setOpen,
  onSuccess,
}: AddExternalOpportunityProps) => {
  const [formValues, setFormValues] = useState({
    company: "",
    lastdate: "",
    link: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setFormValues({ company: "", lastdate: "", link: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.company || !formValues.lastdate || !formValues.link) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createExternalOpportunity(formValues);
      if (result) {
        toast.success("External opportunity added successfully!");
        handleClose();
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to add external opportunity");
      }
    } catch (error) {
      toast.error("An error occurred while adding the external opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add External Opportunity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formValues.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastdate">Last Date</Label>
            <Input
              id="lastdate"
              name="lastdate"
              type="date"
              value={formValues.lastdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              name="link"
              type="url"
              value={formValues.link}
              onChange={handleChange}
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Opportunity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
