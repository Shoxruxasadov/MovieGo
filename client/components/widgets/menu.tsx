import { useRouter } from 'next/navigation'
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/store/zustand";

import { MdSupportAgent, MdAdminPanelSettings, MdDevices, MdOutlineLocalMovies, MdFavoriteBorder, MdNotificationsNone } from "react-icons/md";
import { PiContactlessPaymentBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

interface AccountMenuProps {
    accountMenu: boolean;
    setAccountMenu: React.Dispatch<React.SetStateAction<boolean>>;
    load: boolean;
    setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountMenu({ accountMenu, setAccountMenu, load, setLogoutModal }: AccountMenuProps) {
    const { user } = useUser();
    const { t } = useTranslation()

    useEffect(() => {
        if (accountMenu) { document.body.style.overflow = "hidden" } 
        else { document.body.style.overflow = "auto" }
    }, [accountMenu])

    return (
        <div className={classNames("account-menu-wrapper", { active: accountMenu })}>
            <div className="close" onClick={() => setAccountMenu(false)} />
            <div className="menu">
                <div className="up">
                    <div className="user">
                        <div className="name">
                            <h3>{user && user.name}</h3>
                            <p>{user && user.email}</p>
                        </div>
                        {load && <Image
                            src={user && user.image ? user.image : '/sign/user.webp'}
                            alt="avatar"
                            width={256}
                            height={256}
                            className='avatar'
                        />}
                    </div>

                    <ul>
                        <li><Link href="/"><FaRegUserCircle /><span>Profile</span></Link></li>
                        <li><Link href="/"><MdDevices /><span>Devices</span></Link></li>
                        <li><Link href="/"><PiContactlessPaymentBold /><span>Payments</span></Link></li>
                        <li><Link href="/"><MdOutlineLocalMovies className="order" /><span>Orders</span></Link></li>
                        <li className="favorite"><Link href="/"><MdFavoriteBorder /><span>Favorites</span></Link></li>
                        <li className="notification"><Link href="/"><MdNotificationsNone /><span>Notification</span></Link></li>
                        <li onClick={() => setLogoutModal(true)} className="logout"><HiOutlineLogout /><span>{t("header.logout")}</span></li>
                    </ul>
                </div>
                <div className="down">
                    <Link href="https://t.me/moviegosupport" target="_blank" rel="noopener noreferrer" className="support"><MdSupportAgent /><span>{t("header.support")}</span></Link>
                    {user && (user.role == "super" || user.role == "admin" || user.role == "read") && <Link href="/admin" rel="noopener noreferrer" className="control"><MdAdminPanelSettings /><span>{t("header.admins")}</span></Link>}
                    {/* Roles
                    * Super - Only For Owners | Istalgan ishni qilishi mumkin
                    * Admin - Content Uploader | Adminkaga kira oladi, faqat cheklovlar bor
                    * Read - (For Developers) | Adminkaga kira oladi, lekin hech narsani o'zgartira olmaydi.
                    * User - 99% Users Simple | Adminkaga kirolmaydi. Faqat film tomosha qilish uchun.
                    */}
                </div>
            </div>
        </div>
    )
}
