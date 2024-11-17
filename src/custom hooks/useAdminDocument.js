"use client";

import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import { getAdminDocuments, notGetAdminDocuments } from "@/store/features/documentSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAdminDocument = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.userData);
  const documentId = admin?.$id;

  const fetchAdminDocument = async () => {
    try {
      const adminDocument = await docService.getDocument(
        conf.appwrite_admins_info_collection_id,
        documentId
      );
      console.log("Admin Document:", adminDocument);

      if (adminDocument) {
        dispatch(getAdminDocuments(adminDocument));
      } else {
        dispatch(notGetAdminDocuments());
           }
    } catch (error) {
      console.log("Error fetching admin document:", error);
    }
  };

  useEffect(() => {
    if (documentId) {
      fetchAdminDocument();
    }
  }, [documentId]);
};

export default useAdminDocument;
