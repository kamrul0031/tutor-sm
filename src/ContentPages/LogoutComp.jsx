


"use client"

import authService from "@/appwrite/authService";
import { logout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";




export default function LogoutComp() {
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        const isLoggedOut = await authService.logout()
        if(isLoggedOut){
            dispatch(logout())
            alert("Logout Successfull")
    }
    }
    
    return <button onClick={logoutHandler}>logout</button>;
}
