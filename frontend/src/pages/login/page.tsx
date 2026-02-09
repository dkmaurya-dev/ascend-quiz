"use client";
import { useState } from "react";
import { Header } from "../../components/header";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-pink-50">
      <Header />

      <div className="max-w-md mx-auto mt-20 bg-white/90 backdrop-blur p-10 shadow-2xl rounded-3xl border border-purple-100 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          Welcome Back 👋
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-purple-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            // onClick={() => signIn("credentials", { email, password })}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 hover:scale-[1.02] transition-all"
          >
            Login
          </button>

          <div className="flex flex-col items-center justify-center  gap-2">
            <div className="text-lg text-zinc-400">OR</div>

            <button
              // onClick={() => signIn("google")}
              className="px-6 py-2 bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 hover:scale-[1.02] transition-all"
            >
              Sign in with Google
            </button>
          </div>
        </form>

        {/* Register prompt */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-purple-700 font-medium hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
