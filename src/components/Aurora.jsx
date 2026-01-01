import { motion } from "framer-motion";

const Aurora = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#050505] opacity-90" />

            {/* Aurora Blurs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[120px] mix-blend-screen will-change-transform"
            />

            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen will-change-transform"
            />

            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[40%] left-[30%] w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen will-change-transform"
            />
        </div>
    )
}

export default Aurora
