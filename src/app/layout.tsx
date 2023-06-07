import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const routeurl = headers().get("x-url");

  return (
    <html lang="en">
      <head>
        <title>
          Training And Placement Cell(TPC)| Indian Institute Of
          Technology,Indore(IITI)
        </title>
        <meta
          name="description"
          content="A website used by training and placement cell of Indian Institute of Technology Indore(IITI) to manage placement and internship processes of various companies that come to our campus and to manage student information."
        ></meta>
      </head>
      <body className="min-h-[500px]">{children}</body>
    </html>
  );
}
