import { useTranslation } from "react-i18next";

export default function Time({ time }: { time: number | undefined }) {
  const { t } = useTranslation()
  const hour: number = Math.floor(Number(time) / 60);
  const minute: number = Math.floor(Number(time) % 60);
  return hour ? `${hour}${t("movie.h")} ${minute}${t("movie.m")}` : `${minute}${t("movie.m")}`;
}
