"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import app from "@/firebase/firebase-config";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    // 認証状態を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login"); // 未認証の場合ログインページにリダイレクト
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, [router]);
};
