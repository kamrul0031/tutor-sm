
import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import {
  getAdminDocuments,
  notGetAdminDocuments,
} from "@/store/features/documentSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAdminDocument = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const adminUid = useSelector((state) => state.auth.userData?.userId); //adminUid will be documentId
  console.log("adminUid", adminUid)

  const fetchAdminDocument = async () => {
    try {
      const adminDocument = await docService.getDocument(
        conf.appwrite_admins_info_collection_id,
        adminUid
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
    if (adminUid) {
      fetchAdminDocument();
    }
  }, [adminUid]);
};

export default useAdminDocument;
