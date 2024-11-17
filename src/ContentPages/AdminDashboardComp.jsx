

"use client"

import useAdminDocument from "@/custom hooks/useAdminDocument";
import { useSelector } from "react-redux";
import AdminInfoForm from "./AdminInfoForm";

export default function AdminDashboardComp() {
    

  useAdminDocument();
  const isAdminDocument = useSelector((state) => state.document.adminDocStatus);
  const adminData = useSelector((state) => state.document.adminDocumentData);

  return (
    <>
    {isAdminDocument ? (
       <div>
       <h1>Welcome, {adminData?.name}!</h1>
       {/* Admin dashboard content */}
     </div>
    ) : (
      <div>
        <h1>you need to fill up the admin form first!</h1>
        <AdminInfoForm/>
      </div>
    )}
    </>
  );
}