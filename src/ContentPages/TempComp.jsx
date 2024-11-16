"use client";

import authService from "@/appwrite/authService";
import docService from "@/appwrite/docServices";
import { login, logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const router = useRouter;
const dispatch = useDispatch;


const userLogin = async(data) => {
  const isUserLoggedIn = await authService.login(data)
  if(isUserLoggedIn){
    dispatch(login())
    alert("Login Successfull")
  }else{
    dispatch(logout())
    alert("Login Failed")
  }
}








export default function TempComp() {
  return <div></div>;
}
