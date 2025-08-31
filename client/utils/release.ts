import { useTranslation } from "react-i18next";

export default function Release({ time }: { time: Date | string | null | undefined }) {
  const [year, month, day] = String(time).substring(0, 10).split("-");
  const {t} = useTranslation()

  const monthNames: Record<string, string> = {
    "01": t("date.release.january"), "02": t("date.release.february"), 
    "03": t("date.release.march"), "04": t("date.release.april"), 
    "05": t("date.release.may"), "06": t("date.release.june"),
    "07": t("date.release.july"), "08": t("date.release.august"), 
    "09": t("date.release.september"), "10": t("date.release.october"), 
    "11": t("date.release.november"), "12": t("date.release.december"),
  };

  return `${day} ${monthNames[month]} ${year} ${t("date.year")}`;
}
