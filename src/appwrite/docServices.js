import { Client, Account, ID, Databases, Storage } from "appwrite";
import conf from "./conf";

class DocService {
  client = new Client();
  account;
  database;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_endpoint)
      .setProject(conf.appwrite_project_id);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //create documents start

  async createdUsersDocument({
    documentId,
    mailId,
    password,
    joiningDate,
    amount,
    lastPaymentDate,
    duePayments,
  }) {
    {
      try {
        const response = await this.database.createDocument(
          conf.appwrite_database_id,
          conf.appwrite_created_users_collection_id,
          documentId,
          {
            mailId,
            password,
            joiningDate,
            amount,
            lastPaymentDate,
            duePayments,
          }
        );
        return response;
      } catch (error) {
        console.log("Appwrite DocService :: createDocument :: error", error);
      }
    }
  }
  async usersInfoDocument({
    name , 
    mailId,
    password,
    contact , 
    eContact , 
    college, 
    collegeId ,
    standard ,
    batch ,
    address, 
    bldGroup ,
    
  }) {
    {
      try {
        const response = await this.database.createDocument(
          conf.appwrite_database_id,
          conf.appwrite_users_info_collection_id,
          documentId,
          {
            mailId , 
            name ,
            password,
            contact , 
            eContact , 
            college, 
            collegeId ,
            standard ,
            batch ,
            address, 
            bldGroup ,
          }
        );
        return response;
      } catch (error) {
        console.log("Appwrite DocService :: createDocument :: error", error);
      }
    }
  }
 //create documents end


 //update documents start
  async updateUsersInfoDocument(documentId, {  mailId , 
    name ,
    password,
    contact , 
    eContact , 
    college, 
    collegeId ,
    standard ,
    batch ,
    address, 
    bldGroup ,}) {
        try {
            return await this.database.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_users_info_collection_id,
                documentId,
                {
                  mailId , 
                  name ,
                  password,
                  contact , 
                  eContact , 
                  college, 
                  collegeId ,
                  standard ,
                  batch ,
                  address, 
                  bldGroup ,
                }
            )
        } catch (error) {
            
        }
}
  async updateCreatedUsersDocument(documentId, { mailId,
    password,
    joiningDate,
    amount,
    lastPaymentDate,
    duePayments,}) {
        try {
            return await this.database.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_created_users_collection_id,
                documentId,
                {
                  mailId,
    password,
    joiningDate,
    amount,
    lastPaymentDate,
    duePayments,
                }
            )
        } catch (error) {
            
        }
}
 //update documents end


//get documents start
 async getUsersInfoDocument(documentId) {
     try {
       const response = await this.database.getDocument(
         conf.appwrite_database_id,
         conf.appwrite_users_info_collection_id,
         documentId
       );
       return response;
     } catch (error) {
       console.log("Appwrite DocService :: getDocument :: error", error);
     }
   }


 async getCreatedUsersDocuments() {
   try {
    await this.database.listDocuments(conf.appwrite_created_users_collection_id)
   } catch (error) {
     console.log("Appwrite DocService :: getDocuments :: error", error);
   }
 }
 async getUsersInfoDocuments() {
   try {
    await this.database.listDocuments(conf.appwrite_users_info_collection_id)
   } catch (error) {
     console.log("Appwrite DocService :: getDocuments :: error", error);
   }
 }
 async getCreatedUsersDocument(documentId) {
     try {
       const response = await this.database.getDocument(
         conf.appwrite_database_id,
         conf.appwrite_created_users_collection_id,
         documentId
       );
       return response;
     } catch (error) {
       console.log("Appwrite DocService :: getDocument :: error", error);
     }
   }
 //get documents end




 //delete documents start
async deleteCreatedUsersDocument(documentId) {
    try {
        const response = await this.database.deleteDocument(
            conf.appwrite_database_id,
            conf.appwrite_created_users_collection_id,
            documentId
        )
        // if(response){
        //    await this.deleteUsersInfoDocument(documentId)
        //    return response
        // }
        return response;
    } catch (error) {
        console.log("Appwrite DocService :: deleteDocument :: error", error);
    }

}
async deleteUsersInfoDocument(documentId) {
    try {
        return await this.database.deleteDocument(
            conf.appwrite_database_id,
            conf.appwrite_created_users_collection_id,
            documentId
        )
    } catch (error) {
        console.log("Appwrite DocService :: deleteDocument :: error", error);
    }

}

 //delete documents end



//file upload
async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        conf.apwrite_storage_id,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.log("Appwrite DocService :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.apwrite_storage_id,
        fileId
      );
    } catch (error) {
      console.log("Appwrite DocService :: deleteFile :: error", error);
    }
  }

  async getFilePreview(fileId){
    return this.storage.getFilePreview(conf.apwrite_storage_id, fileId)
  }

}

const docService = new DocService();
export default docService;
