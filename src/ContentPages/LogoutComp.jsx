


"use client"

import authService from "@/appwrite/authService";
import { Button } from "@/components/ui/button";
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
    
    return <Button variant="destructive" className="w-1/2" onClick={logoutHandler}>Logout</Button>;
}
