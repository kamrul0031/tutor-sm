"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-2">
        <>
          <img
            src={user?.userImage}
            alt="user"
            className="w-48 h-48 rounded-full"
          />
          <p className="font-bold">Name: {user?.name}</p>
          <p className="font-bold">ID: {user?.id}</p>
          <p className="font-bold">Contact: {user?.contact}</p>
          <p className="font-bold">E-Contact: {user?.eContact}</p>
          <p className="font-bold">College: {user?.college}</p>
          <p className="font-bold">Standard: {user?.standard}</p>
          <p className="font-bold">Batch: {user?.batch}</p>
          <p className="font-bold">Address: {user?.address}</p>
        </>
      </div>
      <div className="flex flex-col gap-2">
        <>
          <p className="font-bold">Joining Date: {user?.joiningDate}</p>
          <p className="font-bold">Amount: {user?.amount}</p>
          <p className="font-bold">
            Last Payment Date: {user?.lastPaymentDate}
          </p>
          <p className="font-bold">Due Payments: {user?.duePayments}</p>
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
         { isAdmin && <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/payment")}
          >
            Payment
          </button>}
        </>
      </div>
    </div>
  );
}
