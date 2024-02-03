"use client";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { passwordlessLoginVerify } from "@/helpers/api";
import Cookies from "js-cookie";
import Loading from "@/components/common/loading";

interface Props {
  token: string;
}

const MagicPage = ({ params }: { params: { token: string } }) => {
  const token = params.token;
  // console.log(token);
  const [status, setStatus] = useState("Verifying...");
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const magic: {
          data: { success: boolean; token?: string; message?: string };
        } | void = await passwordlessLoginVerify(token);
        console.log(magic);
        if (magic?.data.success) {
          Cookies.set("magicToken", magic?.data.token!);
          // setStatus(magic?.data?.message!);
          setStatus("Verified!");
          setIsVerified(true);
          setIsError(false);
        } else {
          setStatus(magic?.data.message!);
          setIsVerified(false);
          setIsError(true);
        }
      } catch (error) {
        setStatus("Error!");
        console.error("Error:", error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!isVerified && !isError && <Loading />}
      {isVerified && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="w-fit">
            <h1 className="h-8">{status.toUpperCase()}</h1>
          </div>
        </div>
      )}
      {isError && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="w-fit">
            <h1 className="h-8">{status.toUpperCase()}</h1>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default MagicPage;
