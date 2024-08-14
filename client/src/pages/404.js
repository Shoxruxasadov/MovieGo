import { motion } from 'framer-motion';
import Image from 'next/image'
import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";
import Animated from '@/components/others/animated'
import Root from '@/layouts/root'
import Header from '@/components/home/header';
import Link from 'next/link';

export default function ErrorPage() {
    return (
        <Root page='error' title='Oops!'>
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
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    <div id="title">
                        <motion.h1
                        initial={{ y: "-60%", opacity: 0 }}
                        animate={{ y: "-50%", opacity: 1 }}
                        exit={{ y: "40%", opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        >404</motion.h1>
                        <h2>Oooopss..</h2>
                        <h3>Page not found</h3>
                        <p>Entered page address incorrectly.</p>
                        <Link href='/' >
                            <HiMiniArrowLeftEndOnRectangle />
                            <span>Go Home</span>
                        </Link>
                    </div>
                    <div id="image">
                        <Image src="/error/stark.webp" width={423} height={577} />
                    </div>
                </motion.div>
            </Animated>
        </Root>
    )
}
