"use client";

import { logout } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      alert("You have been logged out.");
      router.push("/login"); // ログインページにリダイレクト
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-400"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
