import "../globals.css";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import { Providers } from "@/store/provider";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const RouteLayout = async ({ children }: Props) => {
  return (
    <div className="flex-auto flex flex-col md:flex-row min-h-screen">
      {/* Mobile: navbar on top, Desktop: sidebar on left */}
      <Suspense fallback={<>Loading...</>}>
        <Sidebar />
      </Suspense>
      <MainContent>
        <Providers>{children}</Providers>
      </MainContent>
    </div>
  );
};

export default RouteLayout;
