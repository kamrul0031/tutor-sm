

"use client"

import conf from "@/appwrite/conf"
import useCurrentDocument from "@/custom hooks/useCurrentDocument"
import useCurrentUser from "@/custom hooks/useCurrentUser"

export default function UserDashboardComp(){

    useCurrentUser()
    const {userData , loading} = useCurrentDocument(conf.appwrite_database_id,conf.appwrite_users_info_collection_id)

    console.log("userData",userData)

    if(loading){
        return <div>loading ...</div>
      }

    return (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <>
                <img
                  src={userData?.userImage}
                  alt="user"
                  className="w-48 h-48 rounded-full"
                />
                <p className="font-bold">Name: {userData?.name}</p>
                <p className="font-bold">ID: {userData?.id}</p>
                <p className="font-bold">Contact: {userData?.contact}</p>
                <p className="font-bold">E-Contact: {userData?.eContact}</p>
                <p className="font-bold">College: {userData?.college}</p>
                <p className="font-bold">Standard: {userData?.standard}</p>
                <p className="font-bold">Batch: {userData?.batch}</p>
                <p className="font-bold">Address: {userData?.address}</p>
              </>
            </div>
            <div className="flex flex-col gap-2">
              <>
                <p className="font-bold">Joining Date: {userData?.joiningDate}</p>
                <p className="font-bold">Amount: {userData?.amount}</p>
                <p className="font-bold">
                  Last Payment Date: {userData?.lastPaymentDate}
                </p>
                <p className="font-bold">Due Payments: {userData?.duePayments}</p>
              </>
            </div>
            <div className="flex gap-2">
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push("/edit")}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push("/logout")}
                >
                  Logout
                </button>
              </>
            </div>
          </div>
        )
}