import React from "react";
import AdminContainer from "@/pages/admin/components/AdminContainer";
import Users from "@/pages/admin/users/molecules/Users";

const index = () => {
  return (
    <AdminContainer>
      <Users />
    </AdminContainer>
  );
};

export default index;
