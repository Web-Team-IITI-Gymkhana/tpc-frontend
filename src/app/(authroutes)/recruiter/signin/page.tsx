"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginWithEmail } from "@/components/loginForms/loginWithEmail";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Building2, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");

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
          Recruiter Sign In
        </h2>
        <p className="text-gray-600">
          Access your recruitment dashboard
        </p>
      </div>

      {/* Form Card */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Welcome Back
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Enter your email to receive a secure login link
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                id="email"
                placeholder="recruiter@company.com"
                className="pl-10 h-12 border-gray-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <LoginWithEmail email={email} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <Link href="/recruiter/signup/" className="block">
              <Button 
                variant="outline" 
                className="w-full h-12 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
              >
                Create New Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p>
                Need help?{" "}
                <a href="mailto:tpcwebteam@iiti.ac.in" className="text-slate-600 hover:text-slate-800 font-medium">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          By signing in, you agree to our{" "}
          <a href="#" className="text-slate-600 hover:text-slate-800">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-slate-600 hover:text-slate-800">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
