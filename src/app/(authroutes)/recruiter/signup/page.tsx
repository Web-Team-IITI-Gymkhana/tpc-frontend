import RecruiterSignup from "@/components/loginForms/recruiterSignup";
import React from "react";
import { Building2 } from "lucide-react";

const Signup = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-slate-100 rounded-full">
            <Building2 className="h-8 w-8 text-slate-700" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Recruiter Registration
        </h2>
        <p className="text-gray-600">
          Join our network of top recruiters
        </p>
      </div>

      <RecruiterSignup />
    </div>
  );
};

export default Signup;
