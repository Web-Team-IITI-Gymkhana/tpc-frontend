import "../globals.css";
import { Providers } from "@/store/provider";

interface Props {
  children: React.ReactNode;
}

const RoutesLayout = async ({ children }: Props) => {
  return (
    <div className="flex-auto flex h-[100vh] w-[100vw]">
      <Providers>{children}</Providers>
    </div>
  );
};

export default RoutesLayout;
