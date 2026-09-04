import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export const getCurrentUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  const userString = Cookies.get("user");
  if (!userString) return null;
  try {
    return JSON.parse(userString);
  } catch {
    return null;
  }
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === "ADMIN";
};

export const isTpcMember = (): boolean => {
  const user = getCurrentUser();
  return user?.role === "TPC_MEMBER" || user?.role === "ADMIN";
};

export const useAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [isTpcMemberUser, setIsTpcMemberUser] = useState<boolean>(false);
  const [isStudentUser, setIsStudentUser] = useState<boolean>(false);
  const [isRecruiterUser, setIsRecruiterUser] = useState<boolean>(false);
  const [isFacultyUser, setIsFacultyUser] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      setIsLoggedIn(true);
      setIsAdminUser(u.role === "ADMIN");
      setIsTpcMemberUser(u.role === "TPC_MEMBER");
      setIsStudentUser(u.role === "STUDENT");
      setIsRecruiterUser(u.role === "RECRUITER");
      setIsFacultyUser(u.role === "FACULTY");
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsAdminUser(false);
      setIsTpcMemberUser(false);
      setIsStudentUser(false);
      setIsRecruiterUser(false);
      setIsFacultyUser(false);
    }
  }, []);

  return {
    user,
    role: user?.role ? user.role.toLowerCase() : "",
    isAdmin: isAdminUser,
    isTpcMember: isTpcMemberUser,
    isStudent: isStudentUser,
    isRecruiter: isRecruiterUser,
    isFaculty: isFacultyUser,
    isLoggedIn,
  };
};
