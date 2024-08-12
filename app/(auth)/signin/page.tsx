'use client'
import React, { useState } from "react";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

import Link from "next/link";
// import Background from "../../../components/ui/background"

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();    
    const res = await fetch("/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res_data = await res.json();
    if (res.ok) {
      login(email);
      router.push("/video");
    }
    else {
      setError(res_data?.message)
      
    }
  }
  return (
    <>
      <>
      {/* <Background></Background> */}
        <div className="mb-10">
          <h1 className="text-6xl font-bold text-white text-center" style={{fontFamily: "monospace"}}>Sign in</h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>              
              <input
                id="email"
                className={`w-full cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out ${error?'error':''}`}
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {error?(<label className="texterror">{error}</label>): (<></>) } 
            </div>
            <div>                           
              <input
                id="password"
                className={`w-full cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out ${error?'error':''}`}
                type="password"
                autoComplete="on"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {error?(<label className="texterror">{error}</label>): (<></>) } 
            </div>
            <div className="cst-checkbox">              
              <input type="checkbox" id="box-1"/>
              <label htmlFor="box-1">Remember me</label>              
            </div>
          </div>
          <div className="mt-6">
            <button className="btn w-full cst-button py-4 px-3 text-white">
              Login
            </button>
          </div>
        </form>     
      </>
    </>
  );
}
