
"use client"
import conf from "@/appwrite/conf"
import docService from "@/appwrite/docServices"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

 


export default function useUserForm(databaseId,collectionId){
    

    const router = useRouter()
    const userUid = useSelector((state) => (state.auth.userData?.userId))
    console.log("userUid", userUid)

    const [existingDocument, setexistingDocument] = useState(null)


    useEffect(() => {
      if(userUid){
        fetchCurrentDocument()
      }
    }, [userUid])


    
    const fetchCurrentDocument = async() => {
        try {
            const document = await docService.getDocument(
                databaseId, collectionId , userUid
            )
            if(document){
                setexistingDocument(document)
                alert("Information already exist but you can update it now")
            }else{
                alert("you need to fill this form first !")
            }
        } catch (error) {
            console.error("Error in fetchingCurrentDocument" , error)
        }
    }

    const checkingForUpdateOrCreateUserDocument = async(data) => {
       try {
        if(existingDocument){
            updateExistingDocument(data)
        }else{
            createNewDocument(data)
        }
       } catch (error) {
        console.log("Unhandled error in checkingForUpdateOrCreateAdminDocument:", error);
       }
    }
    const updateExistingDocument = async(data) => {
        try {
            const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null

        if(file){
                await docService.deleteFile(existingDocument.ImageId)
        }
        delete(data.image)
        const updateExistingFormData = await docService.updateDocument(collectionId, userUid, 
            {
                ...data , ImageId:file?.$id
            }
        )

        if(!!updateExistingFormData){
            alert("Information successfully updated")
        }else{
            alert("Information not updated !")
        }
        } catch (error) {
            console.log("Unhandled error in updateExistingDocument:", error);
        }
    }

    const createNewDocument = async(data) => {
        
        try {
            console.log("data" , data)
            const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null ;

        if(file){
            console.log("collectionId", collectionId)
            delete(data.image)
            const createDocument = await docService.createdDocument(collectionId, userUid, 
                {...data , ImageId:file?.$id }
            )

            if(createDocument){
                alert("New Information created successfully")
                router.refresh()
            }else{
                await docService.deleteFile(createDocument.ImageId)
                alert("Information not create , something went wrong , try again")
            }
        }
        } catch (error) {
            console.log("Unhandled error in createNewDocument:", error);
        }


    }



    return { checkingForUpdateOrCreateUserDocument }

}