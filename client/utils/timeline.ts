import { useTranslation } from "react-i18next";

export default function Timeline({ time }: { time: Date | string | null | undefined }) {
  const { t } = useTranslation();
  const year = String(time).substring(0, 7).split("-")[0];
  const month = String(time).substring(0, 7).split("-")[1];

  const seasons: Record<string, string> = {
    "01": t("date.season.winter"), "02": t("date.season.winter"), "03": t("date.season.spring"),
    "04": t("date.season.spring"), "05": t("date.season.spring"), "06": t("date.season.summer"),
    "07": t("date.season.summer"), "08": t("date.season.summer"), "09": t("date.season.autumn"),
    "10": t("date.season.autumn"), "11": t("date.season.autumn"), "12": t("date.season.december"),
  };

  return `${seasons[month]} ${year} ${t("date.year")}`;
}
