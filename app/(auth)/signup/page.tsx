"use client";
import React, { useState } from "react";

import Background from "../../../components/ui/background";
import { useAuth } from "@/app/context/AuthContext";

export default function SignUp() {

  const {login} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(email, password)
    const res = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if(res.status === 201) {
      login(email)
    }
  }
  return (
    <>
      <>
        <Background></Background>
        <div className="mb-10">
          <h1
            className="text-6xl font-bold text-white text-center"
            style={{ fontFamily: "monospace" }}
          >
            Register
          </h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="email"
                className="w-full cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                className="w-full cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="password"
                autoComplete="on"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn w-full cst-button py-4 px-3 text-white">
              Register
            </button>
          </div>
        </form>
      </>
    </>
  );
}
