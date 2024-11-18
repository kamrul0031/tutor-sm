

import authService from "@/appwrite/authService";
import { login, logout } from "@/store/features/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchingCurrentUser = async () => {
      const response = await authService.getCurrentUser();

      if (response?.status) {
        console.log(response);
        const userWithId = { userId: response.$id, ...response };
        dispatch(login(userWithId));
      } else {
        dispatch(logout());
      }
    };

    fetchingCurrentUser();
  }, [dispatch]);
};

export default useCurrentUser;
