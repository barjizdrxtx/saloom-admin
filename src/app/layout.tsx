"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie"; // Ensure this is imported
import MyLayout from "../components/MyLayout";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  let pageLimit = Cookies.get("pageLimit");
  if (!pageLimit) {
    pageLimit = "10";
    Cookies.set("pageLimit", pageLimit);
  }

  return (
    <html lang="en" translate="no">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <QueryClientProvider client={queryClient}>
      
     <body>
     {children}
     </body>
      </QueryClientProvider>
    </html>
  );
}

