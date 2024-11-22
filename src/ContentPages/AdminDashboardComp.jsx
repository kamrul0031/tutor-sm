"use client";

//shadcn ui components import start

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//shadcn ui components import end

import useAdminDocument from "@/custom hooks/useAdminDocument";
import { useSelector } from "react-redux";
import AdminInfoForm from "./AdminInfoForm";
import { useState, useEffect } from "react";
import {
  getAdminDocuments,
  notGetAdminDocuments,
} from "@/store/features/documentSlice";
import docService from "@/appwrite/docServices";
import conf from "@/appwrite/conf";
import useCurrentUser from "@/custom hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import LogoutComp from "./LogoutComp";

export default function AdminDashboardComp() {
  const router = useRouter();

  useCurrentUser();

  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [adminDataLoaded, setAdminDataLoaded] = useState(false);

  const adminUid = useSelector((state) => state.auth.userData?.userId); //adminUid will be documentId
  console.log("adminUid", adminUid);

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
        setAdminData(adminDocument);
        setAdminDataLoaded(true);
        dispatch(getAdminDocuments(adminDocument));
      } else {
        dispatch(notGetAdminDocuments());
      }
    } catch (error) {
      console.log("Error fetching admin document:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return adminDataLoaded ? (
    <div>
      <Popover>
        <PopoverTrigger className="border p-2 border-white rounded-full absolute top-4 right-4">admin img / icon</PopoverTrigger>
        <PopoverContent>
            <div className="flex flex-col gap-4 justify-center items-center p-4 md:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">{adminData?.clientName}</h1>
        <div>
          {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          CC Name: {adminData?.ccName}
        </p> */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Contact: {adminData?.contact}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Address: {adminData?.address}
        </p>
        {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Client Img Id: {adminData?.clientImgId}
        </p> */}
        {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Routine Shedule: {adminData?.routineShedule}
        </p> */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Bld Grp: {adminData.bldGrp? adminData.bldGrp : "(A+ve)"}
        </p>
        </div>
       <LogoutComp/>
      </div>
        </PopoverContent>
      </Popover>

    
      <div>
        <h1>current batches: </h1>
        <h1>current students: </h1>
        <h1>due payments: </h1>
        <h1>due amount: </h1>
        <h1>routineShedule</h1>
        <button onClick={() => router.push("/create-user")}>Create User</button>
      </div>
    </div>
  ) : (
    <div>
      <h1>You need to fill up the admin form first!</h1>
      <AdminInfoForm />
    </div>
  );
}
