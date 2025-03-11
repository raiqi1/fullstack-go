"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Aktifkan loading

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Email atau password salah!");
        return;
      }

      const data = await res.json();
      const token = data.token;

      Cookies.set("auth_token", token, { expires: 7 });
      Cookies.set("name", data.name, { expires: 7 });

      // Redirect ke halaman utama
      router.push("/");
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false); // Matikan loading setelah selesai
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      {/* Left side decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 justify-center items-center relative overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <div className="relative z-10 px-16 text-white text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
          <p className="text-xl opacity-90 mb-8">
            Selamat datang kembali! Kami senang melihat Anda lagi.
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-purple-500 opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-indigo-400 opacity-20"></div>
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Masuk</h2>
              <p className="text-gray-600 mt-2">
                Silakan masukkan detail login Anda
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg">
                <FiAlertCircle className="flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
