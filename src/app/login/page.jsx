"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import GoogleButton from "react-google-button";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize useRouter

  // If the user is authenticated, redirect to the "/transactions" page
  useEffect(() => {
    if (session) {
      router.push("/transactions");
    }
  }, [session, router]);

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {session.user.name}
          </h1>
          <p className="text-gray-600 mb-6">You are signed in with Google</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-lg  max-w-md w-full flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 ">
          Welcome to Finflow!
        </h1>
        <p className="mb-4 text-gray-600">Please sign in to continue.</p>
        <GoogleButton
          onClick={() => signIn("google")}
          // className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        />
      </div>
    </div>
  );
}
