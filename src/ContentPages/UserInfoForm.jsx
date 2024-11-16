import React from "react";
import { useForm } from "react-hook-form";

export default function UserInfoForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>User Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          User Image:
          <input
            className="border bg-black"
            type="file"
            {...register("userImage", { required: "User Image is required" })}
          />
        </label>
        {errors.userImage && <p className="error-msg">{errors.userImage.message}</p>}
        <br />
        <label>
          Name:
          <input
            className="border bg-black"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </label>
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
        <br />
        <label>
          ID:
          <input
            className="border bg-black"
            type="text"
            {...register("id", { required: "ID is required" })}
          />
        </label>
        {errors.id && <p className="error-msg">{errors.id.message}</p>}
        <br />
        <label>
          Contact:
          <input
            className="border bg-black"
            type="text"
            {...register("contact", { required: "Contact is required" })}
          />
        </label>
        {errors.contact && <p className="error-msg">{errors.contact.message}</p>}
        <br />
        <label>
          Emergency Contact:
          <input
            className="border bg-black"
            type="text"
            {...register("eContact", { required: "Emergency Contact is required" })}
          />
        </label>
        {errors.eContact && <p className="error-msg">{errors.eContact.message}</p>}
        <br />
        <label>
          College:
          <input
            className="border bg-black"
            type="text"
            {...register("college", { required: "College is required" })}
          />
        </label>
        {errors.college && <p className="error-msg">{errors.college.message}</p>}
        <br />
        <label>
          College ID:
          <input
            className="border bg-black"
            type="text"
            {...register("collegeId", { required: "College ID is required" })}
          />
        </label>
        {errors.collegeId && <p className="error-msg">{errors.collegeId.message}</p>}
        <br />
        <label>
          Standard:
          <input
            className="border bg-black"
            type="text"
            {...register("standard", { required: "Standard is required" })}
          />
        </label>
        {errors.standard && <p className="error-msg">{errors.standard.message}</p>}
        <br />
        <label>
          Batch:
          <input
            className="border bg-black"
            type="text"
            {...register("batch", { required: "Batch is required" })}
          />
        </label>
        {errors.batch && <p className="error-msg">{errors.batch.message}</p>}
        <br />
        <label>
          Address:
          <input
            className="border bg-black"
            type="text"
            {...register("address", { required: "Address is required" })}
          />
        </label>
        {errors.address && <p className="error-msg">{errors.address.message}</p>}
        <br />
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
}

