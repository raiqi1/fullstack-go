"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("name");

    router.push("/login");
  };

  // Ambil name dari cookies
  const userName = Cookies.get("name");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-xl font-bold">Halo, {userName || "User"}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
