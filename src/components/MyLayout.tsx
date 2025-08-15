import React from "react";
import { Layout } from "./UI/Layout/Layout";

const MyLayout = ({ children }: any) => {

  return (
    <body>
      <Layout>{children}</Layout>
    </body>
  );
};

export default MyLayout;
