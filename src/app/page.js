

import { useSelector } from "react-redux"
import LoginForm from "../ContentPages/LoginForm"
import CreateUserForm from "../ContentPages/CreateUserForm"
import UserInfoForm from "../ContentPages/UserInfoForm"
import UserDashboard from "../ContentPages/UserDashboard"
import PaymentPopComp from "../ContentPages/PaymentPopComp"
import LogoutComp from "../ContentPages/LogoutComp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AdminDashboardComp from "@/ContentPages/AdminDashboardComp"
import TempComp from "@/ContentPages/TempComp"

export default function Home(){
  return(
    <div className="h-screen flex flex-col gap-3 justify-center items-center dark:bg-black">
      <h1>Home</h1>
      <LoginForm/>
      <LogoutComp/>
      {/* <TempComp/> */}
    </div>
  )
}


