"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function SubmitTransaction({ isOpen, onClose }) {
  const { data: session, status } = useSession();

  // useForm hook initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit function to handle the form submission
  const onSubmit = async (formData) => {
    // Try-catch block to handle any fetch errors
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log("Transaction submitted successfully!");
      } else {
        console.log("Error submitting transaction");
      }
    } catch (error) {
      console.error("Submit error:", error);
      console.log("An error occurred while submitting the transaction");
    }
  };
  if (!isOpen) return null;
  return (
    <form
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 m-auto space-y-4"
      onSubmit={handleSubmit(onSubmit)} // Validation happens before submission
    >
      <h1 className="text-xl font-bold text-center text-gray-700">
        Submit Transaction <p>{session?.user?.name}</p>
      </h1>

      {/* Transaction Type Field */}
      <div>
        <label className="block text-gray-600 font-semibold">
          Transaction Type:
        </label>
        <input
          type="text"
          className={`w-full mt-1 p-2 border ${
            errors.transactionType ? "border-red-500" : "border-gray-300"
          } text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          {...register("transactionType", {
            required: "Transaction Type is required",
          })}
        />
        {/* Show error if transactionType field is empty */}
        {errors.transactionType && (
          <p className="text-red-500 text-sm">
            {errors.transactionType.message}
          </p>
        )}
      </div>

      {/* Amount Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Amount:</label>
        <input
          type="number"
          className={`w-full mt-1 p-2 border ${
            errors.amount ? "border-red-500" : "border-gray-300"
          } text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Amount must be greater than 0" },
          })}
        />
        {/* Show error if amount field is empty or invalid */}
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-gray-600 font-semibold">
          Description:
        </label>
        <textarea
          className={`w-full mt-1 p-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          {...register("description", { required: "Description is required" })}
        />
        {/* Show error if description field is empty */}
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold focus:ring-4 focus:ring-blue-300 transition"
        type="submit"
      >
        Submit Transaction
      </button>
    </form>
  );
}
