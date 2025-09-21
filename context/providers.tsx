"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ourFileRouter } from "../app/api/uploadthing/core";




export default function Providers({ children }: { children: ReactNode }) {
  return (

     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" reverseOrder={false} />
       <NextSSRPlugin
         
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
    <Provider store={store}>  {children}</Provider>
    </ThemeProvider>
  );
}

