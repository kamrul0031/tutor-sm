import React from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm();

  // Submit function
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      {/* <h2>Sign Up</h2> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Input */}
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            className="border bg-black"
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
        </div>

        {/* Password Input */}
        <div className="form-field">
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
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}
