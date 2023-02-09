import React from "react";
import AdminContainer from "@/pages/admin/components/AdminContainer";
import TopStats from "@/pages/admin/dashboard/molecules/TopStats";
import History from "@/pages/admin/dashboard/molecules/History";
import Analytics from "@/pages/admin/dashboard/molecules/Analytics";

const index = () => {
  return (
    <>
      <AdminContainer>
        <TopStats />
        <Analytics />
      </AdminContainer>
    </>
  );
};

export default index;
