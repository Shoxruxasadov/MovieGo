import useLocalStorage from "use-local-storage";
import { useUser } from "@/store/zustand";
import { useTranslation } from "react-i18next";
import Rodal from "rodal";
import { signOut } from "next-auth/react";

interface LogoutConfirmProps {
  logoutModal: boolean;
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutConfirm({ logoutModal, setLogoutModal }: LogoutConfirmProps) {
  const [token, setToken] = useLocalStorage("token", null);
  const setUser = useUser(state => state.setUser);
  const { t } = useTranslation()

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    setLogoutModal(false);
  };

  return (
    <Rodal visible={logoutModal} onClose={() => setLogoutModal(false)}>
      <div className="text">
        <p>{t("header.realy")}</p>
      </div>
      <div className="wrapper">
        <button className="cancel" onClick={() => setLogoutModal(false)}>{t("header.cancel")}</button>
        <button className="confirm" onClick={handleLogout}>{t("header.confirm")}</button>
      </div>
    </Rodal>
  )
}
