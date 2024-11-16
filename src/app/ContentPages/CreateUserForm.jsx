"use client";

import { useForm } from "react-hook-form";

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Submit function
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          ID:
          <input
            className="border bg-black"
            type="text"
            {...register("id", { required: true })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="border bg-black"
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <br />
        <label>
          Joining Date:
          <input
            className="border bg-black"
            type="date"
            {...register("joiningDate", { required: true })}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            className="border bg-black"
            type="number"
            {...register("amount", { required: true })}
          />
        </label>
        <br />
        <label>
          Last Payment Date:
          <input
            className="border bg-black"
            type="date"
            {...register("lastPaymentDate", { required: true })}
          />
        </label>
        <br />
        <label>
          Due Payments:
          <input
            className="border bg-black"
            type="number"
            {...register("duePayments", { required: true })}
          />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating User..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
