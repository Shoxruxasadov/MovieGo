import { useEffect } from "react";
import Head from "next/head";
import Aos from "aos"

export default function Root({ children, page, title }) {

  useEffect(() => { Aos.init({ duration: 500 }) })

  return (
    <>
      <Head>
        {title ? (
          title == "Login" ? (
            <title>Login • MovieGo</title>
          ) : title == "Sign Up" ? (
            <title>Sign Up • MovieGo</title>
          ) : (
            <title>{title} • MovieGo</title>
          )
        ) : (
          <title>MovieGo • Marvel Movies</title>
        )}
        <meta name="description" content="MovieGo • Marvel Movies" />
        <meta name="keywords" content="MovieGo Marvel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div id={page}>{children}</div>
    </>
  );
}

