import { authGuard } from "@/utils/authGuard";

export default function Home() {
  authGuard();

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
