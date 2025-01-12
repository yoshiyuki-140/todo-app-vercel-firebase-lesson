"use client";

import { useAuthGuard } from "@/utils/authGuard";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  useAuthGuard();

  return (
    <div>
      <h1>Hello</h1>
      <LogoutButton />
    </div>
  );
}
