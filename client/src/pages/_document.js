import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="uz">
      <Head>
        {/* Favicons */}
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/favicon.png" rel="apple-touch-icon" />

        {/* PWA (Progressive Web App) */}
        <link href="/manifest.json" rel="manifest" />
        <meta name="theme-color" content="#0D0D0D" />

        {/* Better Compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
