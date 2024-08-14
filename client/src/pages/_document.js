import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico?" rel="icon" />
        <link href="/favicon.png?" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
