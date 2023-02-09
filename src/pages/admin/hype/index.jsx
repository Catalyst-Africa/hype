import React from "react";
import AdminContainer from "@/pages/admin/components/AdminContainer";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <>
      <AdminContainer>
        <Outlet />
        <br />
      </AdminContainer>
    </>
  );
};

export default index;
