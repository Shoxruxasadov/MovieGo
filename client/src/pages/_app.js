import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'next-themes'
const queryClient = new QueryClient()
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
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
