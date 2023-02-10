import React from "react";
import AdminContainer from "@/pages/admin/components/AdminContainer";
import ViewHypes from "@/pages/admin/hypes/molecules/ViewHypes";
import SentHypes from "@/pages/admin/hypes/molecules/SentHypes";
import { useLocation } from "react-router-dom";


const index = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/admin/hypes" ? (
        <AdminContainer>
          <ViewHypes />
        </AdminContainer>
      ) : (
        pathname === "/admin/sent-hypes" && (
          <AdminContainer>
            <SentHypes />
          </AdminContainer>
        )
      )}
    </>
  );
};

export default index;
