

"use client"

import { useSelector } from "react-redux"
import LoginForm from "../ContentPages/LoginForm"
import CreateUserForm from "../ContentPages/CreateUserForm"
import UserInfoForm from "../ContentPages/UserInfoForm"
import UserDashboard from "../ContentPages/UserDashboard"
import PaymentPopComp from "../ContentPages/PaymentPopComp"
import LogoutComp from "../ContentPages/LogoutComp"

export default function Home(){
  const authStatus = useSelector(state => state.auth.authStatus)
  console.log(authStatus)

  return(
    <div className="h-screen flex flex-col gap-3 justify-center items-center">
      <h1>Home</h1>
      <LoginForm/>
      <LogoutComp/>
    </div>
  )
}