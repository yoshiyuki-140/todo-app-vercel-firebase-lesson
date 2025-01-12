"use client";

import { useAuthGuard } from "@/utils/authGuard";

export default function Home() {
  useAuthGuard();

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
