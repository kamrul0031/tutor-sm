"use client";

import authService from "@/appwrite/authService";
import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import { login, logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const router = useRouter;
const dispatch = useDispatch;







export default function TempComp() {




  

  const [existingDocument, setExistingDocument] = useState(second)


  const currentUserId = useSelector((state)=> state.auth.userData?.$id)

  const gettingCurrentUserDocument = async() => {

    const document = await docService.getDocument(currentUserId)

    if(document){
      setExistingDocument(document)
      alert("Admin Information already exist")
    }else{
      alert("You need to fill the form first !")
    }

  }

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
       const createAdminDocument = await docService.createdDocument(conf.appwrite_admins_info_collection_id, currentUserId, {
        ...data , clientImgId:file?.$id
       })
       if(createAdminDocument){
        alert("Admin Information successfully created")
       }
    }else{
      alert("Admin is not fill up ERROR , try again !!!")
    }
  }

  const checkingForUpdateOrCreateAdminDocument = async(data) => {
    if(gettingCurrentUserDocument){
      updateAdminDocument(data)
    }else{
      createAdminDocument()
    }
  }





  return <div></div>;
}
