import { AnimatePresence, motion } from 'framer-motion'

export default function Animated({ children }) {
    return (
        <AnimatePresence mode='wait'>
            <motion.main
                initial={{ y: "-1rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "1rem", opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            >
                {children}
            </motion.main>
        </AnimatePresence>
    )
}
