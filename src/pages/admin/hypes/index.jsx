import React from "react";
import AdminContainer from "@/pages/admin/components/AdminContainer";
import ViewHypes from "@/pages/admin/hypes/molecules/ViewHypes";

const index = () => {
  return (
    <>
      <AdminContainer>
        <ViewHypes />
      </AdminContainer>
    </>
  );
};

export default index;
