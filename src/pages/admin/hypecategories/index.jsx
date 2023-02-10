import React from "react";
import AdminContainer from "@/pages/admin/components/AdminContainer";
import HypeCategories from "@/pages/admin/hypecategories/molecules/HypeCategories";

const index = () => {
  return (
    <>
      <AdminContainer>
        <HypeCategories />
      </AdminContainer>
    </>
  );
};

export default index;
