"use client";

import { useState } from "react";
import { signIn, signUp } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      alert("Signed in successfully!");
      router.push("/")
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-xl font-bold text-center">Welcome!</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        />
        <button
          onClick={handleSignIn}
          className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <button
          onClick={handleSignUp}
          className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
