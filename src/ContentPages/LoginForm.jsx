


"use client"

import authService from "@/appwrite/authService";
import { login, logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();


  const userLogin = async(data) => {
    const isUserLoggedIn = await authService.login(data)
    if(isUserLoggedIn){
      console.log(isUserLoggedIn)
      dispatch(login())
      router.replace("/create-user")
      alert("Login Successfull")
    }else{
      dispatch(logout())
      alert("Login Failed")
    }
  }

  // Submit function
  const onSubmit = (data) => {
    console.log(data);
    userLogin(data)
  };

  return (
    <div>
      {/* <h2>Sign Up</h2> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
        {/* Email Input */}
          <label htmlFor="email">Email:</label>
          <input
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
          <input
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
  );
}
