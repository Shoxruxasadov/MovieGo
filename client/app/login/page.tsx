"use client"

import Animated from "@/components/others/animated";
import Root from "@/layouts/root";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useUser } from "@/store/zustand";
import { success, warn, wrong } from "@/utils/toast";
import SceletLoading from "@/components/loading/loading";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface userProps {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const setUser = useUser(state => state.setUser);
  const { register, handleSubmit, formState: { errors }, } = useForm<userProps>();
  const [oauthGoogle, setOauthGoogle] = useLocalStorage("oauthGoogle", false);
  const [token, setToken] = useLocalStorage("token", null);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [eyepass, setEyepass] = useState(false);
  const { t, i18n } = useTranslation()
  const { data } = useSession();
  const router = useRouter();

  const auth = async (user: userProps) => {
    if (!user.remember) {
      warn('Check Remember')
      return
    }
    setLoading(true)
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/login`, {
      headers: {
        'email': user.email,
        'password': user.password,
      }
    }).then(({ data }) => {
      setToken(data._id)
      setUser(data)
      success("You a login");
      setTimeout(() => router.push("/"), 1000)
    }).catch(error => wrong(error.response.data.message)).finally(() => setLoading(false))
  }

  const authGoogle = () => {
    setLoading(true);
    signIn("google");
    setOauthGoogle(true)
  };

  const handleLanguage = () => {
    if (i18n.language == 'uz') {
      i18n.changeLanguage("ru");
      Cookies.set("language", "ru", { expires: 365 });
    } else if (i18n.language == 'ru') {
      i18n.changeLanguage("en");
      Cookies.set("language", "en", { expires: 365 });
    } else if (i18n.language == 'en') {
      i18n.changeLanguage("uz");
      Cookies.set("language", "uz", { expires: 365 });
    }
  }

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (oauthGoogle && data?.user) {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/google`, { headers: { 'email': data.user.email, name: data.user.name, image: data.user.image } }).then(({ data }) => {
        setToken(data._id)
        setUser(data)
        success("You a login");
        setTimeout(() => router.push("/"), 1000)
      }).finally(() => setLoading(false));
      setOauthGoogle(false)
    }
  }, [data]);

  return (
    <Root page="sign">
      <Animated url="unset">
        <section id="login">
          <Link href={"/"} className="logo">
            <Image src={"/logo/logo.png"} width={50} height={50} alt="logo" />
            <p>{t("sign.login.title")}</p>
          </Link>
          <form onSubmit={handleSubmit(auth)}>
            {screenWidth > 439 && (
              <>
                <p className="providers-paragraph">{t("sign.login.with")}</p>
                <div className="providers">
                  <button type="button" className="provider google" onClick={authGoogle}>
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
                  <button type="button" className="provider facebook">
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
                  <span>{t("sign.login.or")}</span>
                  <hr />
                </div>
              </>
            )}

            <label htmlFor="email" className="email">
              <p>{t("sign.login.email")}</p>
              <div className="wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="icon"
                >
                  <path
                    d="M1.6665 5.83334L8.4706 10.5962C9.02158 10.9819 9.29707 11.1747 9.59672 11.2494C9.86142 11.3154 10.1383 11.3154 10.403 11.2494C10.7026 11.1747 10.9781 10.9819 11.5291 10.5962L18.3332 5.83334M5.6665 16.6667H14.3332C15.7333 16.6667 16.4334 16.6667 16.9681 16.3942C17.4386 16.1545 17.821 15.7721 18.0607 15.3017C18.3332 14.7669 18.3332 14.0668 18.3332 12.6667V7.33334C18.3332 5.93321 18.3332 5.23315 18.0607 4.69837C17.821 4.22796 17.4386 3.84551 16.9681 3.60583C16.4334 3.33334 15.7333 3.33334 14.3332 3.33334H5.6665C4.26637 3.33334 3.56631 3.33334 3.03153 3.60583C2.56112 3.84551 2.17867 4.22796 1.93899 4.69837C1.6665 5.23315 1.6665 5.93321 1.6665 7.33334V12.6667C1.6665 14.0668 1.6665 14.7669 1.93899 15.3017C2.17867 15.7721 2.56112 16.1545 3.03153 16.3942C3.56631 16.6667 4.26637 16.6667 5.6665 16.6667Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input type="email" placeholder="example@domain.com" id="email" {...register("email", { required: true })} />
              </div>
            </label>
            <label htmlFor="password" className="password">
              <p>{t("sign.login.password")}</p>
              <div className="wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="icon"
                >
                  <path
                    d="M14.1666 8.33333V6.66667C14.1666 4.36548 12.3011 2.5 9.99992 2.5C7.69873 2.5 5.83325 4.36548 5.83325 6.66667V8.33333M9.99992 12.0833V13.75M7.33325 17.5H12.6666C14.0667 17.5 14.7668 17.5 15.3016 17.2275C15.772 16.9878 16.1544 16.6054 16.3941 16.135C16.6666 15.6002 16.6666 14.9001 16.6666 13.5V12.3333C16.6666 10.9332 16.6666 10.2331 16.3941 9.69836C16.1544 9.22795 15.772 8.8455 15.3016 8.60582C14.7668 8.33333 14.0667 8.33333 12.6666 8.33333H7.33325C5.93312 8.33333 5.23306 8.33333 4.69828 8.60582C4.22787 8.8455 3.84542 9.22795 3.60574 9.69836C3.33325 10.2331 3.33325 10.9332 3.33325 12.3333V13.5C3.33325 14.9001 3.33325 15.6002 3.60574 16.135C3.84542 16.6054 4.22787 16.9878 4.69828 17.2275C5.23306 17.5 5.93312 17.5 7.33325 17.5Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input type={eyepass ? 'text' : 'password'} placeholder={t("sign.login.password")} id="password" {...register("password", { required: true })} />
                <div className="eye" onClick={() => setEyepass(!eyepass)}>
                  {eyepass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </label>
            <label htmlFor="cbx" className="remember">
              <div className="cbx">
                <input id="cbx" type="checkbox" {...register("remember")} />
                <label htmlFor="cbx"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <p className="rememberme">{t("sign.login.remember")}</p>
            </label>

            <button>{t("sign.login.button")}</button>

            <p className="have">
              {t("sign.login.have")} <Link href="signup">{t("sign.signup.button")}</Link>
            </p>

            {screenWidth < 440 && (
              <>
                <div className="or">
                  <hr />
                  <span>{t("sign.login.or")}</span>
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
              <li>{t("sign.login.terms")}</li>•<li>{t("sign.login.privacy")}</li>•<li>{t("sign.login.helps")}</li>
            </ul>
            <div className="language" onClick={handleLanguage}>
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
              <span>{t("header.language")}</span>
            </div>
          </footer>
        </section>
        <div id="light" />
        <div id="shadow" />
      </Animated>
      {loading && <div id="loading">
        <SceletLoading />
      </div>}
    </Root>
  );
}
