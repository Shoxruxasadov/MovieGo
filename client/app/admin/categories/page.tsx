"use client"

import Admins from "@/layouts/admins";
import api from "@/library/axios";
import CategoriesDto from "@/types/admin/categories.dto";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AdminCategories() {
  const [columnCount, setColumnCount] = useState(6);
  const { t, i18n } = useTranslation();

  const { data, isSuccess, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoriesDto[]> => api.get(`/categories`).then(({ data }) => data).catch(error => { throw error }),
  })

   const breakpoints = [
    { width: 576, columns: 1 },
    { width: 768, columns: 2 },
    { width: 991, columns: 2 },
    { width: 1024, columns: 3 },
    { width: 1280, columns: 3 },
    { width: 1440, columns: 4 },
    { width: 1536, columns: 5 },
    { width: 1680, columns: 6 },
    { width: 1920, columns: 6 },
    { width: 2160, columns: 7 },
    { width: 2560, columns: 8 },
    { width: 3840, columns: 9 },
  ];

  const updateColumns = useCallback(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let columns = breakpoints.find(bp => screenWidth <= bp.width)?.columns || 2;
    if (screenHeight < 600 && screenWidth < 1024) columns = 5;

    setColumnCount(columns);
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  return (
    <Admins page="admin-categories">
      <header><div id="wrapper">
        <h1>{t("admin.sidebar.categories")}</h1>
      </div></header>
      <div id="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
        {data?.map((item: CategoriesDto) => (
          <Link
            href={`/categories/${item.path}`}
            className="card"
            key={item._id}
          >
            <div className="shadow" />
            <img src={item.image} alt={item.title[i18n.language as keyof typeof item.title]} />
            <div className="title">
              <h3 title={item.title[i18n.language as keyof typeof item.title]}>{item.title[i18n.language as keyof typeof item.title]}</h3>
            </div>
          </Link>
        ))}
      </div>
    </Admins>
  )
}
