"use client"

import NotFound from "@/app/not-found";
import Sidebar from "@/components/admin/sidebar";
import PageLoading from "@/components/others/loading";
import { useUser } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const roles = ["admin", "super", "read"];

export default function Admins({ children, page }: { children: React.ReactNode, page: string }) {
    const [token, setToken] = useLocalStorage("token", null);
    const { user, getUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (token && !user) return
        else if (!user || !roles.includes(user.role)) router.replace("/");
    }, [user, router]);

    if (!user) return <PageLoading />;
    if (!roles.includes(user.role)) return <NotFound />;
    return <div id="admin">
        <Sidebar />
        <main id={page}>{children}</main>
    </div>
}
