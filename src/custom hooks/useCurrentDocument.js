

"use client"

import conf from "@/appwrite/conf"
import docService from "@/appwrite/docServices"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function useCurrentDocument(databaseId,collectionId){

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const userUid = useSelector(state => state.auth.userData?.userId)


    useEffect(() => {
      if(userUid){
        fetchUserDocument()
      }
    }, [userUid])
    

    const fetchUserDocument = async () => {
        try {
          const document = await docService.getDocument(
            databaseId,
            collectionId,
            userUid
          );
          console.log("User Document:", document);
  
          if (document) {
            setUserData(document);
            console.log("User Document:", document);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.log("Error fetching user document:", error);
        }finally{
          setLoading(false)
        }
      };


      

      return {userData , loading}


}