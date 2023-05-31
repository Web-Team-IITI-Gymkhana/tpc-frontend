import Button from "@/components/button";
import TextInputField from "@/components/textInputField";
import { FunctionComponent } from "react";

interface LoginProps {}

const Login = () => {
  return (
    <div className="h-[100vh] px-10 py-10">
      <div className="h-full w-full bg-white rounded-lg grid grid-cols-2">
        <div className="col-span-1">
          <div className="w-full text-center text-[30px] mt-4 mb-8">
            Login with your credentials
          </div>

          <div className="grid grid-cols-6">
            <div className="col-span-full">
              <TextInputField label="Email" type="required" />
            </div>
            <div className="col-span-full">
              <TextInputField label="Password" type="password" />
            </div>
            <div className="mt-4 col-start-3 col-end-5">
              <Button label="Submit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
