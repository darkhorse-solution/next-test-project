export const metadata = {
  title: "Sign In - Simple",
  description: "Page description",
};

import Link from "next/link";
import Background from "../../../components/ui/background"

export default function SignUp() {
  return (
    <>
      <>
      <Background></Background>
        <div className="mb-10">
          <h1 className="text-6xl font-bold text-white text-center" style={{fontFamily: "monospace"}}>Register</h1>
        </div>
        {/* Form */}
        <form >
          <div className="space-y-4">
            <div>              
              <input
                id="email"
                className="w-full cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="email"
                placeholder="Email"
                required
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
