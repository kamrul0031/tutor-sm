

"use client"

import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import useCurrentUser from "@/custom hooks/useCurrentUser";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useUserForm from "@/custom hooks/useUserForm";

export default function AdminInfoForm() {

  const { register, handleSubmit, formState: { errors , isSubmitting} } = useForm();



  useCurrentUser()

  
  const {checkingForUpdateOrCreateUserDocument} = useUserForm(conf.appwrite_database_id,conf.appwrite_admins_info_collection_id)
  
  const onSubmit = async(data) => {
    try {
      await checkingForUpdateOrCreateAdminDocument(data)
    } catch (error) {
      console.log("Unhandled error in onSubmit:", error);
    }
  };

  return (
    <div>
      <h2>Admin Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Image:
          <Input
            className="border bg-black"
            type="file"
            {...register("image", { required: "Image is required" })}
          />
        </label>
        {errors.image && <p className="error-msg">{errors.image.message}</p>}
        <br />
        <label>
          Name:
          <Input
            className="border bg-black"
            type="text"
            {...register("clientName", { required: "Name is required" })}
          />
        </label>
        {errors.clientName && <p className="error-msg">{errors.clientName.message}</p>}
        <br />
        <label>
          Coaching Name:
          <Input
            className="border bg-black"
            type="text"
            {...register("ccName", { required: "Coaching Name is required" })}
          />
        </label>
        {errors.ccName && <p className="error-msg">{errors.ccName.message}</p>}
        <br />
        <label>
          Contact:
          <Input
            className="border bg-black"
            type="text"
            {...register("contact", { required: "Contact is required" })}
          />
        </label>
        {errors.contact && <p className="error-msg">{errors.contact.message}</p>}
        <br />
        <label>
          Address:
          <Input
            className="border bg-black"
            type="text"
            {...register("address", { required: "Address is required" })}
          />
        </label>
        {errors.address && <p className="error-msg">{errors.address.message}</p>}
        <br />
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
}

