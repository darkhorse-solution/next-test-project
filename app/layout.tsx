"use client";
import "./css/style.css";
import "../lib/fontAwesome";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({
  subsets: ["greek"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <AuthProvider>
        <html lang="en" className="scroll-smooth w-full">
          <head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
          </head>
          <body
            className={`${inter.variable} mx-auto  bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
          >
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
              {children}
            </div>
          </body>
        </html>
      </AuthProvider>
  );
}
