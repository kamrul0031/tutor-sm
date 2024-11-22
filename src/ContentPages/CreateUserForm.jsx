"use client";

import authService from "@/appwrite/authService";
import conf from "@/appwrite/conf";
import docService from "@/appwrite/docServices";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateUserForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting },reset } = useForm();

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
        // console.log("user id", user);
  
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
          reset()
          // Optionally navigate to another page
          // router.replace("/PaymentPopComp");
        }
      }else{
        alert("User is not created , something went wrong try again !")
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
  // Submit function
  const onSubmit = async(data) => {
    console.log("Form Data Submitted:", data);
  
   await createUser(data).catch((error) => {
      console.error("Unhandled error in onSubmit:", error);
      alert("Something went wrong during submission.");
    });
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-2 md:space-y-4">
        <label className="block">
          Email:
          <input
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic dark:text-red-400">Email is required</p>
          )}
        </label>
        <br />
        <label className="block">
          Password:
          <input
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic dark:text-red-400">Password is required</p>
          )}
        </label>
        <br />
        <label className="block">
          Joining Date:
          <input
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="date"
            {...register("joiningDate", { required: true })}
          />
          {errors.joiningDate && (
            <p className="text-red-500 text-xs italic dark:text-red-400">Joining Date is required</p>
          )}
        </label>
        <br />
        <label className="block">
          Amount:
          <input
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs italic dark:text-red-400">Amount is required</p>
          )}
        </label>
        <br />
        <label className="block">
          Last Payment Date:
          <input
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="date"
            {...register("lastPaymentDate", { required: true })}
          />
          {errors.lastPaymentDate && (
            <p className="text-red-500 text-xs italic dark:text-red-400">Last Payment Date is required</p>
          )}
        </label>
        <br />
        <label className="block">
          Due Payments:
          <input
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            {...register("duePayments", { required: true })}
          />
          {errors.duePayments && (
            <p className="text-red-500 text-xs italic dark:text-red-400">Due Payments is required</p>
          )}
        </label>
        <br />
        <div className="flex items-center justify-center gap-3">
          <button      
          onClick={() => router.replace("/admin-dashboard")} 
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          >back icon</button>
           <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating User..." : "Create User"}
        </button>
        </div>
       
      </form>
    </div>
  );
}

