import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link href="/favicon.ico?" rel="icon" />
        <link href="/favicon.png?" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
