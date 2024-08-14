import Head from "next/head";

export default function Root({ children, page, title }) {
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
          <title>MovieGo</title>
        )}
        <meta name="description" content="MovieGo • MCU Movies" />
        <meta name="keywords" content="MovieGo Marvel MCU" />
      </Head>
      <div id={page}>{children}</div>
    </>
  );
}
