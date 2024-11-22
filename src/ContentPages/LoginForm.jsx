


"use client"

import authService from "@/appwrite/authService";
import { login, logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../app/globals.css";
import { Input } from "@/components/ui/input";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm();

  const authStatus = useSelector((state) => state.auth.authStatus);
  
  

  const router = useRouter();
  const dispatch = useDispatch();


  


  const userLogin = async(data) => {
    const isUserLoggedIn = await authService.login(data)
    if(isUserLoggedIn){
      console.log("isUserLoggedIn : ", isUserLoggedIn)
      dispatch(login(isUserLoggedIn))
      if(data.email.includes("admin")){  
       router.replace("/admin-dashboard")
      }else{
        router.replace("/user-dashboard")
      }
      alert("Successfully Logged In")
    }else{
      dispatch(logout())
      alert("Login Failed")
    }
  }

  // Submit function
  const onSubmit = (data) => {
    console.log(data);

    userLogin(data).catch((error) => {
      console.log("error in onSubmit", error); 
    });
    };

  return(
    <>
     {authStatus ? (
      <div>
        <h1>your are already logged in</h1>
        <button>logout</button>
      </div>
    ) : (
      <div>
        {/* <h2>Sign Up</h2> */}
        {/* <div>
        <h2>Select Role</h2>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={!isAdmin}
              onChange={handleRoleChange}
            />
            User
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={isAdmin}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </div>
  
        <div>
          <p>Selected Role: {isAdmin ? "Admin" : "User"}</p>
        </div> 
      </div> */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col ">
          {/* Email Input */}
            <label htmlFor="email">Email:</label>
            <Input
              className="bg-black border border-gray-300"
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
  
            <label htmlFor="password">Password:</label>
            <Input
              className="border bg-black"
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
  
          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    )}
    </>
   
  )
  
}

