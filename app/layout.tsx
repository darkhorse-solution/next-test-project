'use client'
import "./css/style.css";
import '../lib/fontAwesome'
import { Inter } from "next/font/google";
import { AuthProvider } from './context/AuthContext';

const inter = Inter({
  subsets: ['greek'],
  variable: "--font-inter",
  display: "swap",
});

// export const metadata = {
//   title: "Welcome BALAJI",
//   description: "Generated by darkhorse&crystalweb3",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <AuthProvider>
    <html lang="en" className="scroll-smooth w-full">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
      </head>
      <body
        className={`${inter.variable} mx-auto  bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
=======
    <html lang="en" className="scroll-smooth">
      <body      
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased max-w-[1440px]`}
      >
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
      </head>
     
>>>>>>> a8b2ff17fb6822349d5d1a0c3e7936d283cad0a3
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
    </AuthProvider>
  );
}
