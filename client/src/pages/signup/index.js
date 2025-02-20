import Animated from "@/components/others/animated";
import Root from "@/layouts/root";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useStore, useUser } from "@/store/zustand";
import { success, wrong } from "@/utils/toastify";
import translate from "@/language/translate.json"
import SceletLoading from "@/components/loading/loading";

export default function Signup() {
  const setUser = useUser(state => state.setUser);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [oauthGoogle, setOauthGoogle] = useLocalStorage("oauthGoogle", false);
  const [token, setToken] = useLocalStorage("token", null);
  const [screenWidth, setScreenWidth] = useState();
  const [loading, setLoading] = useState(false);
  const [eyepass, setEyepass] = useState(false);
  const { locale } = useRouter();
  const { data } = useSession();
  const router = useRouter();

  const auth = async (user) => {
    if (user.password !== user.repass) return wrong("Repeat Password Wrong!");
    setLoading(true)
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/users`, {
      name: user.lastname ? `${user.firstname} ${user.lastname}` : user.firstname,
      email: user.email,
      password: user.password,
      image: null,
    }).then(({ data }) => {
      setToken(data._id)
      setUser(data)
      success("You a signup");
      setTimeout(() => router.push("/"), 1000)
    }).catch(error => wrong(error.response.data.message)).finally(() => setLoading(false))
  }

  const authGoogle = () => {
    setLoading(true);
    signIn("google");
    setOauthGoogle(true)
  };

  const handleLanguage = () => {
    if (locale == 'uz') router.push(router.pathname, router.asPath, { locale: 'ru' })
    if (locale == 'ru') router.push(router.pathname, router.asPath, { locale: 'en' })
    if (locale == 'en') router.push(router.pathname, router.asPath, { locale: 'uz' })
  }

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (oauthGoogle && data) {
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
    <Root page="sign" title={"Sign Up"}>
      <Animated>
        <div id="signup">
        <form onSubmit={handleSubmit(auth)}>
            {screenWidth > 439 && (
              <>
                <div className="auth">
                  <p className="providers-paragraph">{translate[locale].sign.signup.with}</p>
                  <div className="providers">
                    <div className="provider google" onClick={authGoogle}>
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
                    </div>
                    <div className="provider facebook">
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
                    </div>
                  </div>
                </div>

                <div className="or">
                  <hr />
                  <span>{translate[locale].sign.login.or}</span>
                  <hr />
                </div>
              </>
            )}

            <div className="name">
              <label htmlFor="firstname" className="firstname">
                <p>{translate[locale].sign.signup.name.first}</p>
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
                      d="M15.8332 17.5L13.3332 15M13.3332 15L15.8332 12.5M13.3332 15H18.3332M9.99984 12.9167H6.24984C5.08687 12.9167 4.50538 12.9167 4.03222 13.0602C2.96688 13.3834 2.1332 14.217 1.81004 15.2824C1.6665 15.7555 1.6665 16.337 1.6665 17.5M12.0832 6.25C12.0832 8.32107 10.4042 10 8.33317 10C6.2621 10 4.58317 8.32107 4.58317 6.25C4.58317 4.17893 6.2621 2.5 8.33317 2.5C10.4042 2.5 12.0832 4.17893 12.0832 6.25Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input type="text" placeholder={translate[locale].sign.signup.name.first} id="firstname" {...register("firstname", { required: true })} />
                </div>
              </label>
              <label htmlFor="lastname" className="lastname">
                <p>{translate[locale].sign.signup.name.last}</p>
                <div className="wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    className="icon"
                  >
                    <path
                      d="M16.3332 17.5L18.8332 15M18.8332 15L16.3332 12.5M18.8332 15H13.8332M10.4998 12.9167H6.74984C5.58687 12.9167 5.00538 12.9167 4.53222 13.0602C3.46688 13.3834 2.6332 14.217 2.31004 15.2824C2.1665 15.7555 2.1665 16.337 2.1665 17.5M12.5832 6.25C12.5832 8.32107 10.9042 10 8.83317 10C6.7621 10 5.08317 8.32107 5.08317 6.25C5.08317 4.17893 6.7621 2.5 8.83317 2.5C10.9042 2.5 12.5832 4.17893 12.5832 6.25Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input type="text" placeholder={translate[locale].sign.signup.name.last} id="lastname" {...register("lastname")} />
                </div>
              </label>
            </div>
            <label htmlFor="email" className="email">
              <p>{translate[locale].sign.login.email}</p>
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
              <p>{translate[locale].sign.login.password}</p>
              <div className="wrapper pass">
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
                <input type={eyepass ? 'text' : 'password'} placeholder={translate[locale].sign.login.password} id="password"{...register("password", { required: true })} />
                <div className="eye" onClick={() => setEyepass(!eyepass)}>
                  {eyepass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </label>
            <label htmlFor="repass" className="password">
              <p>{translate[locale].sign.signup.repeat}</p>
              <div className="wrapper pass char">
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
                <input type={eyepass ? 'text' : 'password'} placeholder={translate[locale].sign.signup.repeat} id="repass" {...register("repass", { required: true })} />
                <div className="eye" onClick={() => setEyepass(!eyepass)}>
                  {eyepass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
              <span>{translate[locale].sign.signup.minimal}</span>
            </label>

            <button>{translate[locale].sign.signup.button}</button>

            <p className="have">{translate[locale].sign.signup.have} <Link href={'/login'}>{translate[locale].sign.login.button}</Link></p>

            {screenWidth < 440 && (
              <>
                <div className="or">
                  <hr />
                  <span>{translate[locale].sign.login.or}</span>
                  <hr />
                </div>

                <div className="providers">
                  <div className="provider google" onClick={authGoogle}>
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
                  </div>
                  <div className="provider facebook">
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
                  </div>
                </div>
              </>
            )}
          </form>
          <section>
            <div className="wrapper">
              <div className="part">
                <Link href={'/'} className="logo">
                  <Image src={"/logo/logo.png"} width={36} height={36} alt="logo" />
                  <h1>MovieGo</h1>
                </Link>
                {screenWidth > 439 && (
                  <>
                    <h2>{translate[locale].sign.signup.title}</h2>
                    <div className="card">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1_38899)">
                          <path
                            d="M5.00016 8L7.00016 10L11.0002 6M14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8Z"
                            stroke="#8996A9"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_38899">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>{translate[locale].sign.signup.card}</span>
                    </div>
                  </>
                )}
              </div>
              {screenWidth > 439 && (
                <>
                  <div className="part">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g opacity="0.24">
                        <path
                          d="M12.6664 16C15.9802 16 18.6664 13.3137 18.6664 10C18.6664 6.68629 15.9802 4 12.6664 4C9.35274 4 6.66645 6.68629 6.66645 10C6.66645 13.3137 9.35274 16 12.6664 16Z"
                          fill="#FA3B3C"
                        />
                        <path
                          d="M12.6664 20C8.89228 20 5.53783 22.0594 3.41209 25.2511C2.9464 25.9503 2.71355 26.2999 2.74036 26.7466C2.76123 27.0943 2.98918 27.52 3.26703 27.7301C3.62389 28 4.11468 28 5.09626 28H20.2366C21.2182 28 21.709 28 22.0659 27.7301C22.3437 27.52 22.5717 27.0943 22.5925 26.7466C22.6193 26.2999 22.3865 25.9503 21.9208 25.2511C19.7951 22.0594 16.4406 20 12.6664 20Z"
                          fill="#FA3B3C"
                        />
                      </g>
                      <path
                        d="M23.9998 21.1158C25.941 22.091 27.6053 23.6559 28.8201 25.6128C29.0607 26.0004 29.181 26.1941 29.2225 26.4624C29.3071 27.0077 28.9342 27.678 28.4264 27.8938C28.1765 28 27.8954 28 27.3331 28M21.3331 15.3763C23.3087 14.3945 24.6664 12.3558 24.6664 10C24.6664 7.64419 23.3087 5.60548 21.3331 4.62368M18.6664 10C18.6664 13.3137 15.9802 16 12.6664 16C9.35274 16 6.66645 13.3137 6.66645 10C6.66645 6.68629 9.35274 4 12.6664 4C15.9802 4 18.6664 6.68629 18.6664 10ZM3.41209 25.2511C5.53783 22.0594 8.89228 20 12.6664 20C16.4406 20 19.7951 22.0594 21.9208 25.2511C22.3865 25.9503 22.6193 26.2999 22.5925 26.7466C22.5717 27.0943 22.3437 27.52 22.0659 27.7301C21.709 28 21.2182 28 20.2366 28H5.09626C4.11468 28 3.62389 28 3.26703 27.7301C2.98918 27.52 2.76123 27.0943 2.74036 26.7466C2.71355 26.2999 2.9464 25.9503 3.41209 25.2511Z"
                        stroke="#FA3B3C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3>{translate[locale].sign.signup.invite.title}</h3>
                    <p>{translate[locale].sign.signup.invite.description}</p>
                  </div>
                  <div className="part">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        opacity="0.24"
                        d="M23.8681 6.66468C24.1426 7.32871 24.6696 7.85654 25.3332 8.1321L27.6602 9.09597C28.3242 9.37105 28.8518 9.89866 29.1269 10.5627C29.4019 11.2268 29.4019 11.973 29.1269 12.6371L28.1637 14.9624C27.8885 15.6268 27.8882 16.3737 28.1646 17.0378L29.1261 19.3624C29.2624 19.6913 29.3326 20.0439 29.3327 20.3999C29.3328 20.756 29.2627 21.1086 29.1264 21.4375C28.9902 21.7665 28.7904 22.0654 28.5386 22.3171C28.2868 22.5688 27.9879 22.7685 27.6589 22.9046L25.3336 23.8678C24.6696 24.1424 24.1418 24.6694 23.8663 25.333L22.9024 27.66C22.6274 28.3241 22.0998 28.8517 21.4357 29.1268C20.7717 29.4019 20.0255 29.4019 19.3615 29.1268L17.0362 28.1636C16.3721 27.8892 15.6263 27.8898 14.9626 28.1652L12.6357 29.1277C11.972 29.4021 11.2265 29.4019 10.563 29.127C9.89947 28.8522 9.37217 28.3252 9.09692 27.6618L8.1328 25.3341C7.85824 24.6701 7.33123 24.1423 6.66763 23.8667L4.34072 22.9028C3.67695 22.6279 3.14951 22.1006 2.87435 21.4369C2.59918 20.7732 2.59881 20.0274 2.87331 19.3634L3.83646 17.0381C4.11084 16.374 4.11028 15.6281 3.8349 14.9644L2.87313 12.6357C2.73677 12.3068 2.66656 11.9542 2.6665 11.5982C2.66645 11.2421 2.73655 10.8895 2.8728 10.5606C3.00905 10.2316 3.20879 9.93274 3.46059 9.68101C3.7124 9.42928 4.01134 9.22963 4.34032 9.09348L6.66557 8.13029C7.329 7.85597 7.85648 7.32961 8.13224 6.66675L9.09608 4.33975C9.37114 3.67567 9.89874 3.14805 10.5628 2.87298C11.2269 2.5979 11.973 2.5979 12.6371 2.87298L14.9623 3.83616C15.6264 4.11056 16.3722 4.10999 17.0359 3.8346L19.3638 2.87447C20.0278 2.59955 20.7737 2.59961 21.4377 2.87463C22.1016 3.14965 22.6291 3.67711 22.9042 4.34102L23.8684 6.66871L23.8681 6.66468Z"
                        fill="#FA3B3C"
                      />
                      <path
                        d="M11.9998 16L14.6665 18.6667L20.6665 12.6667M23.8681 6.66468C24.1426 7.32872 24.6696 7.85654 25.3332 8.1321L27.6602 9.09597C28.3242 9.37105 28.8518 9.89866 29.1269 10.5628C29.4019 11.2268 29.4019 11.973 29.1269 12.6371L28.1637 14.9624C27.8885 15.6268 27.8882 16.3737 28.1646 17.0378L29.1261 19.3624C29.2624 19.6913 29.3326 20.0439 29.3327 20.3999C29.3328 20.756 29.2627 21.1086 29.1264 21.4375C28.9902 21.7665 28.7904 22.0654 28.5386 22.3171C28.2868 22.5688 27.9879 22.7685 27.6589 22.9046L25.3336 23.8678C24.6696 24.1424 24.1418 24.6694 23.8663 25.333L22.9024 27.66C22.6274 28.3241 22.0998 28.8517 21.4357 29.1268C20.7717 29.4019 20.0255 29.4019 19.3615 29.1268L17.0362 28.1636C16.3721 27.8892 15.6263 27.8898 14.9626 28.1652L12.6357 29.1277C11.972 29.4021 11.2265 29.4019 10.563 29.127C9.89947 28.8522 9.37217 28.3252 9.09692 27.6618L8.1328 25.3341C7.85824 24.6701 7.33123 24.1423 6.66763 23.8667L4.34072 22.9028C3.67695 22.6279 3.14951 22.1006 2.87435 21.4369C2.59918 20.7732 2.59881 20.0274 2.87331 19.3634L3.83646 17.0381C4.11084 16.374 4.11028 15.6281 3.8349 14.9644L2.87313 12.6357C2.73677 12.3068 2.66656 11.9542 2.6665 11.5982C2.66645 11.2421 2.73655 10.8895 2.8728 10.5606C3.00905 10.2316 3.20879 9.93274 3.46059 9.68101C3.7124 9.42928 4.01134 9.22963 4.34032 9.09348L6.66557 8.13029C7.329 7.85597 7.85648 7.32961 8.13224 6.66675L9.09608 4.33975C9.37114 3.67567 9.89874 3.14805 10.5628 2.87298C11.2269 2.5979 11.973 2.5979 12.6371 2.87298L14.9623 3.83616C15.6264 4.11056 16.3722 4.10999 17.0359 3.8346L19.3638 2.87447C20.0278 2.59955 20.7737 2.59961 21.4377 2.87463C22.1016 3.14965 22.6291 3.67711 22.9042 4.34102L23.8684 6.66871L23.8681 6.66468Z"
                        stroke="#FA3B3C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3>{translate[locale].sign.signup.ensure.title}</h3>
                    <p>{translate[locale].sign.signup.ensure.description}</p>
                  </div>
                  <div className="part">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        opacity="0.24"
                        d="M15.0695 28.82C15.3647 28.9922 15.5123 29.0783 15.7206 29.123C15.8822 29.1576 16.1181 29.1576 16.2797 29.123C16.488 29.0783 16.6356 28.9922 16.9308 28.82C19.5282 27.3047 26.6668 22.5447 26.6668 16.0001V9.62361C26.6668 8.5576 26.6668 8.02459 26.4925 7.56642C26.3385 7.16166 26.0882 6.80051 25.7633 6.51418C25.3955 6.19006 24.8964 6.00291 23.8983 5.62861L16.7492 2.94771C16.472 2.84376 16.3334 2.79179 16.1909 2.77118C16.0644 2.75291 15.9359 2.75291 15.8095 2.77118C15.6669 2.79179 15.5283 2.84376 15.2511 2.94771L8.10204 5.62861C7.10389 6.00291 6.60482 6.19006 6.23704 6.51418C5.91214 6.80051 5.66186 7.16166 5.50784 7.56642C5.3335 8.02459 5.3335 8.5576 5.3335 9.62361V16.0001C5.3335 22.5447 12.4721 27.3047 15.0695 28.82Z"
                        fill="#FA3B3C"
                      />
                      <path
                        d="M17.3335 9.99999L13.3335 14L18.6668 16.6667L14.6668 20.6667M26.6668 16C26.6668 22.5446 19.5282 27.3045 16.9308 28.8198C16.6356 28.992 16.488 29.0781 16.2797 29.1228C16.1181 29.1575 15.8822 29.1575 15.7206 29.1228C15.5123 29.0781 15.3647 28.992 15.0695 28.8198C12.4721 27.3045 5.3335 22.5446 5.3335 16V9.62346C5.3335 8.55744 5.3335 8.02444 5.50784 7.56626C5.66186 7.16151 5.91214 6.80036 6.23704 6.51403C6.60482 6.18991 7.10389 6.00276 8.10204 5.62845L15.2511 2.94756C15.5283 2.84361 15.6669 2.79163 15.8095 2.77103C15.9359 2.75276 16.0644 2.75276 16.1908 2.77103C16.3334 2.79163 16.472 2.84361 16.7492 2.94756L23.8983 5.62845C24.8964 6.00276 25.3955 6.18991 25.7633 6.51403C26.0882 6.80036 26.3385 7.16151 26.4925 7.56626C26.6668 8.02444 26.6668 8.55744 26.6668 9.62346V16Z"
                        stroke="#FA3B3C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3>{translate[locale].sign.signup.security.title}</h3>
                    <p>{translate[locale].sign.signup.security.description}</p>
                  </div>
                </>
              )}
            </div>

            {screenWidth > 439 && (
              <footer>
                <ul className="list">
                  <li>{translate[locale].sign.login.terms}</li>•<li>{translate[locale].sign.login.privacy}</li>•<li>{translate[locale].sign.login.docs}</li>•<li>{translate[locale].sign.login.helps}</li>
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
                  <span>{translate[locale].header.language}</span>
                </div>
              </footer>
            )}
          </section>

        </div>
        <div id="light" />
        <div id="shadow" />
      </Animated>
      {loading && <div id="loading">
        <SceletLoading />
      </div>}
    </Root>
  );
}
