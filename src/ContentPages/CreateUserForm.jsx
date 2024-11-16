"use client";

import authService from "@/appwrite/authService";
import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import { useForm } from "react-hook-form";

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const createUser = async (data) => {
    try {
      // Create user account
      const user = await authService.createAccount({
        email: data.email,
        password: data.password,
      });
  
      console.log(data.email, data.password);
  
      if (user) {
        const createdUserId = user?.$id;
  
        // Create user document
        const response = await docService.createdUsersDocument({
          documentId: createdUserId,
          mailId: data.email,
          password: data.password, // Consider hashing the password before storing
          joiningDate: data.joiningDate,
          amount: parseInt(data.amount),
          lastPaymentDate: data.lastPaymentDate,
          duePayments: parseInt(data.duePayments),
        });
  
        if (response) {
          alert("User Created Successfully");
          // Optionally navigate to another page
          // router.replace("/PaymentPopComp");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again later.");
    }
  };
  
  // Submit function
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  
    createUser(data).catch((error) => {
      console.error("Unhandled error in onSubmit:", error);
      alert("Something went wrong during submission.");
    });
  };
  

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email:
          <input
            className="border bg-black"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="error-msg">Email is required</p>
          )}
        </label>
        <br />
        <label>
          Password:
          <input
            className="border bg-black"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="error-msg">Password is required</p>
          )}
        </label>
        <br />
        <label>
          Joining Date:
          <input
            className="border bg-black"
            type="date"
            {...register("joiningDate", { required: true })}
          />
          {errors.joiningDate && (
            <p className="error-msg">Joining Date is required</p>
          )}
        </label>
        <br />
        <label>
          Amount:
          <input
            className="border bg-black"
            type="number"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <p className="error-msg">Amount is required</p>
          )}
        </label>
        <br />
        <label>
          Last Payment Date:
          <input
            className="border bg-black"
            type="date"
            {...register("lastPaymentDate", { required: true })}
          />
          {errors.lastPaymentDate && (
            <p className="error-msg">Last Payment Date is required</p>
          )}
        </label>
        <br />
        <label>
          Due Payments:
          <input
            className="border bg-black"
            type="number"
            {...register("duePayments", { required: true })}
          />
          {errors.duePayments && (
            <p className="error-msg">Due Payments is required</p>
          )}
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating User..." : "Create User"}
        </button>
      </form>
    </div>
  );
}

