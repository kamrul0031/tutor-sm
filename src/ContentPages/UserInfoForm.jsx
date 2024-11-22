
"use client"


import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import useCurrentUser from "@/custom hooks/useCurrentUser";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function UserInfoForm() {
  useCurrentUser()

  const currentUserId = useSelector((state) => (state.auth.userData?.userId))
  console.log("top currentUserId" , currentUserId)

  const [existingDocument, setExistingDocument] = useState(null)

  useEffect(() => {
    if (currentUserId) {
      const fetchDocument = async () => {
        try {
          const document = await docService.getDocument(
            conf.appwrite_database_id,
            conf.appwrite_users_info_collection_id,
            currentUserId
          );
  
          if (document) {
            setExistingDocument(document);
            alert("User Information already exists");
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

  
  

  const updateUserDocument = async(data) => {
    const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null ;

    if(file ){
      await docService.deleteFile(existingDocument.clientImgId)
    }
    const updateFormData = await docService.updateDocument(conf.appwrite_admins_info_collection_id, currentUserId, data)
    if(updateFormData){
      alert("user data successfully updated")
    }else{
      alert("user data not updated !!!")
    }
  }

  const createUserDocument = async(data) => {
    const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null ;

    if(file){
      console.log("currentUserId" , currentUserId)
      delete data.image
       const createFormData = await docService.createdDocument(conf.appwrite_admins_info_collection_id, currentUserId, {
        ...data , clientImgId:file?.$id
       })
       if(createFormData){
        alert("User Information successfully created")
       }
    }else{
      alert("User is not fill up ERROR , try again !!!")
    }
  }

  const checkingForUpdateOrCreateUserDocument = async(data) => {
    if(existingDocument){
      updateUserDocument(data)
    }else{
      createUserDocument(data)
    }
  }








  const onSubmit = async(data) => {
    await checkingForUpdateOrCreateUserDocument(data)
  };

  return (
    <div>
      <h2>User Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          User Image:
          <input
            className="border bg-black"
            type="file"
            {...register("userImage", { required: "User Image is required" })}
          />
        </label>
        {errors.userImage && <p className="error-msg">{errors.userImage.message}</p>}
        <br />
        <label>
          Name:
          <input
            className="border bg-black"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </label>
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
        <br />
        <label>
          ID:
          <input
            className="border bg-black"
            type="text"
            {...register("id", { required: "ID is required" })}
          />
        </label>
        {errors.id && <p className="error-msg">{errors.id.message}</p>}
        <br />
        <label>
          Contact:
          <input
            className="border bg-black"
            type="text"
            {...register("contact", { required: "Contact is required" })}
          />
        </label>
        {errors.contact && <p className="error-msg">{errors.contact.message}</p>}
        <br />
        <label>
          Emergency Contact:
          <input
            className="border bg-black"
            type="text"
            {...register("eContact", { required: "Emergency Contact is required" })}
          />
        </label>
        {errors.eContact && <p className="error-msg">{errors.eContact.message}</p>}
        <br />
        <label>
          College:
          <input
            className="border bg-black"
            type="text"
            {...register("college", { required: "College is required" })}
          />
        </label>
        {errors.college && <p className="error-msg">{errors.college.message}</p>}
        <br />
        <label>
          College ID:
          <input
            className="border bg-black"
            type="text"
            {...register("collegeId", { required: "College ID is required" })}
          />
        </label>
        {errors.collegeId && <p className="error-msg">{errors.collegeId.message}</p>}
        <br />
        <label>
          Standard:
          <input
            className="border bg-black"
            type="text"
            {...register("standard", { required: "Standard is required" })}
          />
        </label>
        {errors.standard && <p className="error-msg">{errors.standard.message}</p>}
        <br />
        <label>
          Batch:
          <input
            className="border bg-black"
            type="text"
            {...register("batch", { required: "Batch is required" })}
          />
        </label>
        {errors.batch && <p className="error-msg">{errors.batch.message}</p>}
        <br />
        <label>
          Address:
          <input
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

