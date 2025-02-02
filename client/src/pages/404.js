import { motion } from 'framer-motion';
import Image from 'next/image'
import { TbLogout2 } from "react-icons/tb";
import Animated from '@/components/others/animated'
import Root from '@/layouts/root'
import Header from '@/components/home/header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import language from "@/language/translate.json"

export default function ErrorPage() {
   const { locale } = useRouter()
    
    return (
        <Root page='error' title={language[locale].error.not}>
            <Header />
            <Animated>
                <div id="animate">
                    <div id='stars' />
                    <div id='stars2' />
                    <div id='stars3' />
                </div>
                <motion.div className="container"
                    initial={{ y: "-1rem", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "1rem", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div id="title">
                        <motion.h1
                        initial={{ y: "-60%", opacity: 0 }}
                        animate={{ y: "-50%", opacity: 1 }}
                        exit={{ y: "40%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        >404</motion.h1>
                        <h2>{language[locale].error.oops}</h2>
                        <h3>{language[locale].error.not}</h3>
                        <p>{language[locale].error.address}</p>
                        <Link href='/' >
                            <TbLogout2 />
                            <span>{language[locale].error.gohome}</span>
                        </Link>
                    </div>
                    <div id="image">
                        <Image src="/error/stark.webp" width={423} height={577} alt="logo" />
                    </div>
                </motion.div>
            </Animated>
        </Root>
    )
}
