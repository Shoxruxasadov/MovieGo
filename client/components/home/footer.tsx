import { useTranslation } from "react-i18next";
import { info } from "@/utils/toast";

import { SiTelegram, SiGooglechrome, SiGoogleplay  } from "react-icons/si";

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="up">
        <div className="brand">
          <img src="/logo/logo.png" alt="MovieGo Logo" />
          <h2>{t("footer.title")}</h2>
        </div>
        <div className="others">
          <div className="platform">
            <div className="title">
              <span>{t("footer.platform")}</span>
            </div>
            <ul className="list">
              <li onClick={() => info(t("movie.soon"))}>{t("footer.advertising")}</li>
              <li onClick={() => info(t("movie.soon"))}>{t("footer.support")}</li>
              <li onClick={() => info(t("movie.soon"))}>{t("footer.about")}</li>
            </ul>
          </div>
          <div className="legal">
            <div className="title">
              <span>{t("footer.legal")}</span>
            </div>
            <ul className="list">
              <li onClick={() => info(t("movie.soon"))}>{t("footer.terms")}</li>
              <li onClick={() => info(t("movie.soon"))}>{t("footer.privacy")}</li>
              <li onClick={() => info(t("movie.soon"))}>{t("footer.cookies")}</li>
            </ul>
          </div>
          <div className="socials">
            <div className="title">
              <span>{t("footer.social")}</span>
            </div>
            <ul className="list link">
              <li><a href="https://t.me/moviegosupport" target="_blank" rel="noopener noreferrer"><SiTelegram /><span>Support</span></a></li>
              <li><a href="https://t.me/moviegouz" target="_blank" rel="noopener noreferrer" ><SiTelegram /><span>Channel</span></a></li>
            </ul>
          </div>
          <div className="availables">
            <div className="title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10.0003 1.66663C5.40866 1.66663 1.66699 5.40829 1.66699 9.99996C1.66699 14.5916 5.40866 18.3333 10.0003 18.3333C14.592 18.3333 18.3337 14.5916 18.3337 9.99996C18.3337 5.40829 14.592 1.66663 10.0003 1.66663ZM13.9837 8.08329L9.25866 12.8083C9.14199 12.925 8.98366 12.9916 8.81699 12.9916C8.65033 12.9916 8.49199 12.925 8.37533 12.8083L6.01699 10.45C5.77533 10.2083 5.77533 9.80829 6.01699 9.56663C6.25866 9.32496 6.65866 9.32496 6.90033 9.56663L8.81699 11.4833L13.1003 7.19996C13.342 6.95829 13.742 6.95829 13.9837 7.19996C14.2253 7.44163 14.2253 7.83329 13.9837 8.08329Z" fill="white" />
              </svg>
              <span>{t("footer.available")}</span>
            </div>
            <ul className="list available">
              <li><SiGooglechrome /><span>Browser</span></li>
              <li><SiGoogleplay /><span>Mobile</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="down">
        <div className="left">
          <div className="brand">
            <span>&copy; 2024-{new Date().getFullYear()} </span>
            <a href="https://moviego.uz">{t('footer.legalname')}</a>.
            {/* Individual Сorporation INC
            Частное Предприятие ЧП
            Xususiy Tashkilot PE */}
          </div>
          <div className="text">
            <span>{t("footer.rights")}</span>
          </div>
        </div>
        <a href="https://shoxruxasadov.vercel.app" target="_blank" rel="noopener noreferrer" className="product">
          <img src="/logo/shoxrux.webp" alt="Shoxrux" />
        </a>
      </div>
    </footer >
  )
}
