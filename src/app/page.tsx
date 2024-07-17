"use client";

import React from "react";

// To access the session on the server side, we make the component to be async
// To get the session we use await getServerSession(config),

// import { getServerSession } from "next-auth";
// import { config } from "@/helpers/auth";

// To access the session on the client side, we use useSession() function;

import { useSession } from "next-auth/react";

const Home = () => {
  // const session = await getServerSession(config);

  const { data: session, status } = useSession();


  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      Home page
    </main>
  );
};
export default Home;
