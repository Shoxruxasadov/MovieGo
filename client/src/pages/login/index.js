import Animated from "@/components/others/animated";
import Root from "@/layouts/root";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [screenWidth, setScreenWidth] = useState();
  const [loading, setLoading] = useState(false);
  const [oauthGoogle, setOauthGoogle] = useLocalStorage("oauthGoogle", "null");
  const { data } = useSession();
  const router = useRouter();

  const auth = async (userData) => {
    // setLoading(true)
    // userData.method = "username"
    // userData.user.split("").map(item => { if (item == "@") userData.method = "email" })

    // axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/login/${userData.method}`, {
    //   headers: {
    //     'login': userData.user,
    //     'password': userData.password,
    //     'secret': process.env.NEXT_PUBLIC_SECRET
    //   }
    // }).then(({ data }) => {
    //   setToken(data.id)
    //   success("You a signed in");
    //   setTimeout(() => router.push('/'), 1000)
    // }).catch(error => wrong(error.response.data.message)).finally(() => setLoading(false))

    console.log(auth);
  }

  const authGoogle = () => {
    setLoading(true);
    signIn("google");
    setOauthGoogle("signed");
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    localStorage.removeItem("oauthGoogle");
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // if (oauthGoogle == "signed" && data) {
    //   setLoading(true);
    //   axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/email/${data.user.email}`).then((res) => {
    //     if (res.data == null) {
    //       // warning("You don't have an account, create one first");
    //       router.push("/signup");
    //       // setPage(5);
    //       // setEmail(data.user.email);
    //       // setName(data.user.name);
    //       // setImage(data.user.image);
    //     } else {
    //       setToken(res.data._id);
    //       // success("You a signed in");
    //       router.push("/");
    //     }
    //   }).finally(() => setLoading(false));
    // }
    // localStorage.removeItem("oauthGoogle");

    console.log(data);
  }, [data]);

  return (
    <Root page="sign" title={"Login"}>
      <Animated>
        <section id="login">
          <Link href={"/"} className="logo">
            <Image src={"/logo/logo.png"} width={50} height={50} alt="logo" />
            <p>Login to MovieGo</p>
          </Link>
          <form onSubmit={handleSubmit(auth)}>
            {screenWidth > 439 && (
              <>
                <p className="providers-paragraph">Login with:</p>
                <div className="providers">
                  <button className="provider google" onClick={authGoogle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M17.42 9.1875C17.42 8.6025 17.3675 8.04 17.27 7.5H9.5V10.6913H13.94C13.7488 11.7225 13.1675 12.5963 12.2938 13.1813V15.2512H14.96C16.52 13.815 17.42 11.7 17.42 9.1875Z"
                        fill="white"
                      />
                      <path
                        d="M9.50043 17.2509C11.7279 17.2509 13.5954 16.5121 14.9604 15.2521L12.2942 13.1821C11.5554 13.6771 10.6104 13.9696 9.50043 13.9696C7.35168 13.9696 5.53293 12.5184 4.88418 10.5684H2.12793V12.7059C3.48543 15.4021 6.27543 17.2509 9.50043 17.2509Z"
                        fill="white"
                      />
                      <path
                        d="M4.88375 10.5675C4.71875 10.0725 4.625 9.54375 4.625 9C4.625 8.45625 4.71875 7.9275 4.88375 7.4325V5.295H2.1275C1.55 6.44464 1.24949 7.71346 1.25 9C1.25 10.3313 1.56875 11.5913 2.1275 12.705L4.88375 10.5675Z"
                        fill="white"
                      />
                      <path
                        d="M9.50043 4.03125C10.7117 4.03125 11.7992 4.4475 12.6542 5.265L15.0204 2.89875C13.5917 1.5675 11.7242 0.75 9.50043 0.75C6.27543 0.75 3.48543 2.59875 2.12793 5.295L4.88418 7.4325C5.53293 5.4825 7.35168 4.03125 9.50043 4.03125Z"
                        fill="white"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button className="provider facebook">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
                        fill="white"
                      />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>

                <div className="or">
                  <hr />
                  <span>or</span>
                  <hr />
                </div>
              </>
            )}

            <label htmlFor="user" className="user">
              <p>Username or email</p>
              <div className="wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4.43033 16.1987C4.93727 15.0043 6.12085 14.1667 7.50008 14.1667H12.5001C13.8793 14.1667 15.0629 15.0043 15.5698 16.1987M13.3334 7.91667C13.3334 9.75762 11.841 11.25 10.0001 11.25C8.15913 11.25 6.66675 9.75762 6.66675 7.91667C6.66675 6.07572 8.15913 4.58334 10.0001 4.58334C11.841 4.58334 13.3334 6.07572 13.3334 7.91667ZM18.3334 10C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 10C1.66675 5.39763 5.39771 1.66667 10.0001 1.66667C14.6025 1.66667 18.3334 5.39763 18.3334 10Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input type="text" placeholder="Username or email" id="user" />
              </div>
            </label>
            <label htmlFor="password" className="password">
              <p>Password</p>
              <div className="wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M14.1666 8.33333V6.66667C14.1666 4.36548 12.3011 2.5 9.99992 2.5C7.69873 2.5 5.83325 4.36548 5.83325 6.66667V8.33333M9.99992 12.0833V13.75M7.33325 17.5H12.6666C14.0667 17.5 14.7668 17.5 15.3016 17.2275C15.772 16.9878 16.1544 16.6054 16.3941 16.135C16.6666 15.6002 16.6666 14.9001 16.6666 13.5V12.3333C16.6666 10.9332 16.6666 10.2331 16.3941 9.69836C16.1544 9.22795 15.772 8.8455 15.3016 8.60582C14.7668 8.33333 14.0667 8.33333 12.6666 8.33333H7.33325C5.93312 8.33333 5.23306 8.33333 4.69828 8.60582C4.22787 8.8455 3.84542 9.22795 3.60574 9.69836C3.33325 10.2331 3.33325 10.9332 3.33325 12.3333V13.5C3.33325 14.9001 3.33325 15.6002 3.60574 16.135C3.84542 16.6054 4.22787 16.9878 4.69828 17.2275C5.23306 17.5 5.93312 17.5 7.33325 17.5Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input type="password" placeholder="Password" id="password" />
              </div>
            </label>
            <label htmlFor="cbx" className="remember">
              <div className="cbx">
                <input id="cbx" type="checkbox" />
                <label htmlFor="cbx"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <p className="rememberme">Remember Me</p>
            </label>

            <button>Log In</button>

            <p className="have">
              Do not have an account? <Link href="signup">Sign Up</Link>
            </p>

            {screenWidth < 440 && (
              <>
                <div className="or">
                  <hr />
                  <span>or</span>
                  <hr />
                </div>

                <div className="providers">
                  <button className="provider google" onClick={authGoogle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M17.42 9.1875C17.42 8.6025 17.3675 8.04 17.27 7.5H9.5V10.6913H13.94C13.7488 11.7225 13.1675 12.5963 12.2938 13.1813V15.2512H14.96C16.52 13.815 17.42 11.7 17.42 9.1875Z"
                        fill="white"
                      />
                      <path
                        d="M9.50043 17.2509C11.7279 17.2509 13.5954 16.5121 14.9604 15.2521L12.2942 13.1821C11.5554 13.6771 10.6104 13.9696 9.50043 13.9696C7.35168 13.9696 5.53293 12.5184 4.88418 10.5684H2.12793V12.7059C3.48543 15.4021 6.27543 17.2509 9.50043 17.2509Z"
                        fill="white"
                      />
                      <path
                        d="M4.88375 10.5675C4.71875 10.0725 4.625 9.54375 4.625 9C4.625 8.45625 4.71875 7.9275 4.88375 7.4325V5.295H2.1275C1.55 6.44464 1.24949 7.71346 1.25 9C1.25 10.3313 1.56875 11.5913 2.1275 12.705L4.88375 10.5675Z"
                        fill="white"
                      />
                      <path
                        d="M9.50043 4.03125C10.7117 4.03125 11.7992 4.4475 12.6542 5.265L15.0204 2.89875C13.5917 1.5675 11.7242 0.75 9.50043 0.75C6.27543 0.75 3.48543 2.59875 2.12793 5.295L4.88418 7.4325C5.53293 5.4825 7.35168 4.03125 9.50043 4.03125Z"
                        fill="white"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button className="provider facebook">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
                        fill="white"
                      />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </>
            )}
          </form>

          <footer>
            <ul className="list">
              <li>Terms</li>•<li>Privacy</li>•<li>Docs</li>•<li>Helps</li>
            </ul>
            <div className="language">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M1.66675 10H18.3334M1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334M1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334M18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669M10.0001 1.66669C12.0845 3.94865 13.269 6.91005 13.3334 10C13.269 13.09 12.0845 16.0514 10.0001 18.3334M10.0001 1.66669C7.91568 3.94865 6.73112 6.91005 6.66675 10C6.73112 13.09 7.91568 16.0514 10.0001 18.3334"
                  stroke="#64748B"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>English</span>
            </div>
          </footer>
        </section>
        <div id="light" />
        <div id="shadow" />
      </Animated>
    </Root>
  );
}
