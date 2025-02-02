import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { appWithTranslation } from 'next-i18next';
import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from "react-toastify";
import useLocalStorage from "use-local-storage";
import { ThemeProvider } from 'next-themes'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@/store/zustand";

import "@/styles/globals.scss";
import "@/styles/loading/loading.scss"
import 'aos/dist/aos.css';
import 'rodal/lib/rodal.css';

const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  const [token, setToken] = useLocalStorage("token", null);
  const [locale, setLocale] = useLocalStorage("locale", "ru");
  const getUser = useUser(state => state.getUser);
  const user = useUser(state => state.user);
  const router = useRouter();

  useEffect(() => {
    console.info(
      '%cMovieGo',
      'color: red; font-size: 20pt; font-weight: 600',
    )
  }, [])

  useEffect(() => {
    if (token || !user) return;
    getUser(token)
  }, [token, user, getUser])

  useEffect(() => {
    // Dynamically set the language attribute on <html>
    document.documentElement.lang = router.locale || "ru";
  }, [router]);

  useEffect(() => {
    if (token || !user) return;
    getUser(token)
  }, [token, user, getUser])

  useEffect(() => {
    if (locale && locale !== router.locale) router.push(router.asPath, router.asPath, { locale });
  }, [router.isReady, router.locale]);

  return <>
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
    
    <Analytics />
    <SpeedInsights />
    <ToastContainer />
  </>;
}

export default appWithTranslation(App)