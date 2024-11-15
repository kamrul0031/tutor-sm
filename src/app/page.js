

"use client"

import { useSelector } from "react-redux"

export default function Home(){
  const authStatus = useSelector(state => state.auth.authStatus)
  console.log(authStatus)

  return(
    <div className="h-screen flex justify-center items-center">
      <h1>Home</h1>
    </div>
  )
}