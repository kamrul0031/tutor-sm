"use client";

import conf from "@/appwrite/conf";
//shadcn ui components import start

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCurrentDocument from "@/custom hooks/useCurrentDocument";
//shadcn ui components import end

import { useRouter } from "next/navigation";
import AdminInfoForm from "./AdminInfoForm";
import LogoutComp from "./LogoutComp";
import useCurrentUser from "@/custom hooks/useCurrentUser";

export default function AdminDashboardComp() {
  const router = useRouter();

  useCurrentUser();
  const {userData , loading } = useCurrentDocument(conf.appwrite_database_id,conf.appwrite_admins_info_collection_id)


  if (loading) {
    return <div>Loading...</div>;
  }

  return !!userData ? (
    <div>
      <Popover>
        <PopoverTrigger className="border p-2 border-white rounded-full absolute top-4 right-4">admin img / icon</PopoverTrigger>
        <PopoverContent>
            <div className="flex flex-col gap-4 justify-center items-center p-4 md:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">{userData?.clientName}</h1>
        <div>
          {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          CC Name: {userData?.ccName}
        </p> */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Contact: {userData?.contact}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Address: {userData?.address}
        </p>
        {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Client Img Id: {userData?.clientImgId}
        </p> */}
        {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Routine Shedule: {userData?.routineShedule}
        </p> */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Bld Grp: {userData.bldGrp? userData.bldGrp : "(A+ve)"}
        </p>
        </div>
       <LogoutComp/>
       <button onClick={()=> router.push("/admin-dashboard/updateInfo")}>edit</button>
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
