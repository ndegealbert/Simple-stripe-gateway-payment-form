import Nav from "../Nav";
import Footer from "../Footer";
import React from "react";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: Props) => {
  return (
    <div>
      <Nav />
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-[81vh]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
