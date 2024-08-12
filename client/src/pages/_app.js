import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from 'next-themes'
import axios from "axios";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient()

import useLocalStorage from "../hooks/useLocalStorage";
// import Animation from "../components/loading/animation"

import "@/styles/globals.scss";
import 'plyr/dist/plyr.css';
import "plyr-react/plyr.css"

export default function App({ Component, pageProps }) {
  // const [access, setAccess] = useState(true)

  // if (access) return <Animation />
  return <>
    <ThemeProvider>
      {/* <SessionProvider session={pageProps.session}> */}
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      {/* </SessionProvider> */}
    </ThemeProvider>

    <ToastContainer />
    <SpeedInsights />
    <Analytics />
  </>;
}
