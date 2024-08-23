import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'next-themes'
import useLocalStorage from "use-local-storage";
const queryClient = new QueryClient()
import "@/styles/globals.scss";
import { useEffect } from "react";
import { useUser } from "@/store/zustand";

export default function App({ Component, pageProps }) {
  const [token, setToken] = useLocalStorage("token", null);
  const getUser = useUser(state => state.getUser);
  const user = useUser(state => state.user);

  useEffect(() => {
    if (!token) return
    if (!user) getUser(token)
  }, [])

  return <>
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>

    <ToastContainer />
    <SpeedInsights />
    <Analytics />
  </>;
}
