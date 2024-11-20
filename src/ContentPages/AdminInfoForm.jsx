

"use client"

import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import useCurrentUser from "@/custom hooks/useCurrentUser";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function AdminInfoForm() {
  useCurrentUser()

  const currentUserId = useSelector((state) => (state.auth.userData?.userId))
  console.log("top currentUserId" , currentUserId)

  const [existingDocument, setExistingDocument] = useState(null)

  useEffect(() => {
    if (currentUserId) {
      const fetchDocument = async () => {
        try {
          const document = await docService.getDocument(
            conf.appwrite_admins_info_collection_id,
            currentUserId
          );
  
          if (document) {
            setExistingDocument(document);
            alert("Admin Information already exists");
          } else {
            alert("You need to fill the form first!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      };
  
      fetchDocument();
    }
  }, [currentUserId]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  
  

  const updateAdminDocument = async(data) => {
    const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null ;

    if(file ){
      await docService.deleteFile(existingDocument.clientImgId)
    }
    const updateFormData = await docService.updateDocument(conf.appwrite_admins_info_collection_id, currentUserId, data)
    if(updateFormData){
      alert("admin data successfully updated")
    }else{
      alert("admin data not updated !!!")
    }
  }

  const createAdminDocument = async(data) => {
    const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null ;

    if(file){
      console.log("currentUserId" , currentUserId)
      delete data.image
       const createFormData = await docService.createdDocument(conf.appwrite_admins_info_collection_id, currentUserId, {
        ...data , clientImgId:file?.$id
       })
       if(createFormData){
        alert("Admin Information successfully created")
       }
    }else{
      alert("Admin is not fill up ERROR , try again !!!")
    }
  }

  const checkingForUpdateOrCreateAdminDocument = async(data) => {
    if(existingDocument){
      updateAdminDocument(data)
    }else{
      createAdminDocument(data)
    }
  }








  const onSubmit = async(data) => {
    await checkingForUpdateOrCreateAdminDocument(data)
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

