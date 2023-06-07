"use client";
import { useState } from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FunctionComponent } from "react";
import axios from "axios";
import querystring from "querystring";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (data: any) => {
    const res: any = await axios
      .post(
        "http://auth-server-production-676c.up.railway.app/v1/auth/register",
        querystring.stringify({
          email: data.email.toString(),
          password: data.password.toString(),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        setCookie("email", data.email);
        setCookie("token", response.data.access_token);
      })
      .catch(async (error) => {
        console.log("2");
        console.log(error.response.data.statusCode);

        if (error.response.data.statusCode === 400) {
          const resN = await axios
            .post(
              "http://auth-server-production-676c.up.railway.app/v1/auth/login",
              querystring.stringify({
                email: data.email.toString(),
                password: data.password.toString(),
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then(async (response) => {
              console.log(response);
              if (response.status === 200) {
                setCookie("email", data.email);
                setCookie("token", response.data.access_token);
              }
            })
            .catch((error) => {
              console.log("1");
              console.log(error);
            });
        }
      });

    // console.log(res);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="h-[100vh] flex items-center">
      <div className="mx-auto h-fit w-[50%] bg-white rounded-lg py-4 px-6">
        <div className="w-full text-center text-[30px] py-2">
          Login with your credentials
        </div>
        <hr className="py-3" />
        <div className="grid grid-cols-6 gap-2">
          <TextField
            autoComplete="true"
            color="secondary"
            className="col-span-full"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            type="required"
            size="medium"
            value={data.email}
            onChange={(e) => {
              setData(() => {
                return { ...data, email: e.target.value };
              });
            }}
          />
          <TextField
            autoComplete="true"
            className="col-span-full"
            color="secondary"
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            size="medium"
            value={data.password}
            onChange={(e) => {
              setData(() => {
                return { ...data, password: e.target.value };
              });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="secondary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="mt-4 col-start-3 col-end-5">
            <Button
              fullWidth
              size="large"
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={() => handleLoginSubmit(data)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
