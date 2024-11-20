"use client";

import useAdminDocument from "@/custom hooks/useAdminDocument";
import { useSelector } from "react-redux";
import AdminInfoForm from "./AdminInfoForm";
import { useState, useEffect } from "react";
import { getAdminDocuments, notGetAdminDocuments } from "@/store/features/documentSlice";
import docService from "@/appwrite/docServices";
import conf from "@/appwrite/conf";
import useCurrentUser from "@/custom hooks/useCurrentUser";

export default function AdminDashboardComp() {
  useCurrentUser()
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null)
  const [adminDataLoaded, setAdminDataLoaded] = useState(false)

  const adminUid = useSelector((state) => state.auth.userData?.userId); //adminUid will be documentId
  console.log("adminUid", adminUid)


  useEffect(() => {
    if (adminUid) {
      fetchAdminDocument();
    }
  }, [adminUid]);

  const fetchAdminDocument = async () => {
    try {
      const adminDocument = await docService.getDocument(
        conf.appwrite_admins_info_collection_id,
        adminUid
      );
      console.log("Admin Document:", adminDocument);

      if (adminDocument) {
        setAdminData(adminDocument)
        setAdminDataLoaded(true)
        dispatch(getAdminDocuments(adminDocument));
      } else {
        dispatch(notGetAdminDocuments());
      }
    } catch (error) {
      console.log("Error fetching admin document:", error);
    } finally{
      setLoading(false)
    }
  };

  


  
  if (loading) {
    return <div>Loading...</div>;
  }

  return adminDataLoaded ? (
    <div>
      <h1>Welcome, {adminData?.clientName}!</h1>
      {/* Admin dashboard content */}
    </div>
  ) : (
    <div>
      <h1>You need to fill up the admin form first!</h1>
      <AdminInfoForm />
    </div>
  );
}
