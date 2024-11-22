



"use client"
import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import { useEffect, useState } from "react";



export default function AllUsersComp() {

    const [createdUsersDocuments, setCreatedUsersDocuments] = useState([])
    const [usersInformationDocuments, setUsersInformationDocuments] = useState([])
    
    const getAllCreatedUsersDocuments = async () => {
        const documents = await docService.getDocuments(conf.appwrite_database_id,conf.appwrite_created_users_collection_id)
        if(documents){
            console.log("usersDocuments",documents)
            setCreatedUsersDocuments(documents.documents)
    }
    }
    const getAllUserInformationDocuments = async () => {
        const documents = await docService.getDocuments(conf.appwrite_database_id,conf.appwrite_users_info_collection_id)
        if(documents){
            console.log("usersInformationDocuments",documents)
            setUsersInformationDocuments(documents.documents)
    }
}
    useEffect(() => {
     getAllCreatedUsersDocuments()
     getAllUserInformationDocuments()
    }, [])
    




    return (
        <div>
            <div>
                {/* <input type="text" />    */}
                <button>search</button> 
            </div>
            <div>
                {/* {
                    createdUsersDocuments?.map((userDocument) => (
                        <div key={userDocument.$id}> //use popover here

                        </div>
                    ))
                } */}
            </div>
            
        </div>
    );

}