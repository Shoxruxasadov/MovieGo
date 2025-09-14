"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from "react-toastify";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";
import Aos from "aos"
import { useUser } from "@/store/zustand";
// import { io } from "socket.io-client";

const queryClient = new QueryClient()

import "@/config/i18n";
import "@/styles/globals.scss";
import "@/styles/loading/loading.scss"
import 'rodal/lib/rodal.css';
import 'aos/dist/aos.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [token, setToken] = useLocalStorage("token", null);
  const { user, getUser } = useUser();

  useEffect(() => {
    console.info('%cMovieGo', 'color: red; font-size: 20pt; font-weight: 600')
    Aos.init({ duration: 500 })
  }, [])

  useEffect(() => {
    if (token && user) return;
    getUser(token)
  }, [token, user]);

  // useEffect(() => {
  //   if (!user) return;

  //   const socket = io(process.env.NEXT_PUBLIC_SERVER!, {
  //     transports: ["websocket"],
  //   });

  //   socket.emit("user_connected", { userId: user._id });

  //   socket.on("connect", () => {
  //     console.log("Connected as", user._id);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [user]);

  return (
    <html lang="ru">
      <head>
        <title>MovieGo • Unlimited Movies, Unlimited Fun!</title>
        <meta name="description" content="Experience the best movies and series with high-quality streaming, professional dubbing, and an ad-free experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/favicon.png" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta name="yandex-verification" content="4b3bda7bcb00604a" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>

        <Analytics />
        <SpeedInsights />
        <ToastContainer />
      </body>
    </html>
  );
}