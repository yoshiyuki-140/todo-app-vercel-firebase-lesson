"use client";

import { useAuthGuard } from "@/utils/authGuard";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  // 認証
  useAuthGuard();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      {/* ナビゲーションバー */}
      <div className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 z-10">
        <h1 className="text-lg font-bold">Sample Todo App</h1>
        <LogoutButton />
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col items-center justify-center mt-20 p-4">
        <div className="w-full max-w-md rounded-lg p-4 text-black">
          <div>
            <ul>
              <li className="flex items-center justify-between border rounded px-4 py-2 mb-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Buy a Milk</span>
                </div>
                <button>🗑️</button>
              </li>
            </ul>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-500">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
