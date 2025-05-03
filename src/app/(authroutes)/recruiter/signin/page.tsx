"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginWithEmail } from "@/components/loginForms/loginWithEmail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                id="email"
                placeholder="email@domain.com"
                className="w-full bg-white/50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <LoginWithEmail email={email} />
              <Link href={"/recruiter/signup/"}>
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
