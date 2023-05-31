import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import LinkItem from "@/components/linkitem";
import { NextRequest } from "next/server";
import { headers } from "next/dist/client/components/headers";
import LoggedInLayout from "./@loggedin/page";
import LoginPageLayout from "./@notloggedin/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routeurl = headers().get("x-url");

  const navlinks = [
    {
      label: "Home",
      ref: "/",
    },
    {
      label: "Seasons",
      ref: "/seasons",
    },
    {
      label: "Companies",
      ref: "/companies",
    },
    {
      label: "Members",
      ref: "/members",
    },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        {routeurl !== "http://localhost:3000/login" ? (
          <LoggedInLayout navlinks={navlinks}>{children}</LoggedInLayout>
        ) : (
          <LoginPageLayout>{children}</LoginPageLayout>
        )}
      </body>
    </html>
  );
}
