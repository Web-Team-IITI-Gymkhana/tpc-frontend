import axios, { formToJSON } from "axios";

export const handleLoginSubmit = async (data: object) => {
  // const res = await axios(
  //   "http://auth-server-production-676c.up.railway.app/v1/auth/login",
  //   { data: data }
  // );

  const resp = await axios(
    "http://auth-server-production-676c.up.railway.app/v1/auth/login",
    {
      data,
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/JSON",
        "Access-Control-Allow-Methods":
          " POST, PUT, PATCH, GET, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          " Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
      },
    }
  );
  // console.log(res);
  console.log(resp);
};
