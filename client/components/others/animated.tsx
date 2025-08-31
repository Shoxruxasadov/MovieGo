"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedProps {
    children: ReactNode;
    url?: string;
}
export default function Animated({ children, url }: AnimatedProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.main
                layout
                initial={{ y: "-1rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileInView={{ y: "0.1px", opacity: 1 }}
                exit={{ y: "1rem", opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ backgroundImage: url != "unset" ? `url(${url || "/spider/banner.webp"})` : "" }}
            >
                {children}
            </motion.main>
        </AnimatePresence>
    )
}
