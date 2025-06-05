"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful", "success");
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="floating-label">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="email@email.com"
              className="input input-md"
            />
            <span>Email</span>
          </label>
        </div>
        <div>
          <label className="floating-label">
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="password"
              className="input input-md"
            />
            <span>Password</span>
          </label>
        </div>

        <button type="submit" className="btn btn-soft btn-success">
          Login
        </button>

        <p className="text-center mt-4">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
