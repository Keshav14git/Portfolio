import { motion, useScroll, useTransform } from 'framer-motion'

const Hero = () => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    }

    const item = {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1] // Apple-like ease
            }
        }
    }

    return (
        <section id="home" className="h-screen flex flex-col justify-center px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-2"
                >
                    <div className="overflow-hidden">
                        <motion.p variants={item} className="text-xl md:text-2xl font-mono text-accent-primary mb-4 tracking-widest uppercase">
                            Keshav Jangir
                        </motion.p>
                    </div>

                    <div className="overflow-hidden">
                        <motion.h1 variants={item} className="text-5xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] mix-blend-difference">
                            FULL STACK
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                        <motion.h1 variants={item} className="text-5xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                            DEVELOPER
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden mt-8 max-w-2xl">
                        <motion.p variants={item} className="text-xl md:text-3xl text-text-muted font-light leading-relaxed">
                            Crafting digital experiences that exist on the edge of <br />
                            <span className="text-white border-b border-white/20">innovation</span> and <span className="text-white border-b border-white/20">usability</span>.
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            {/* Abstract Graphic/Parallax Element */}
            <motion.div
                style={{ y }}
                className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 opacity-30 select-none pointer-events-none"
            >
                <div className="w-[600px] h-[600px] border border-white/5 rounded-full blur-[1px]" />
                <div className="absolute inset-0 w-[400px] h-[400px] border border-white/10 rounded-full blur-[1px] m-auto" />
            </motion.div>

            {/* User Image - Foreground Layer */}
            {/* User Image - Foreground Layer */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="absolute inset-0 z-0 h-full w-full md:inset-auto md:bottom-0 md:right-0 md:z-20 md:h-[90vh] md:w-auto pointer-events-none select-none opacity-40 md:opacity-100"
            >
                {/* Gradient Blend to hide bottom edge & logo */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />

                {/* Right edge soft blend to hide corner artifacts */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#050505] via-[#050505]/50 to-transparent z-10" />

                {/* Gradient overlay at bottom to merge with dark background if needed, but not requested. Keeping raw image. */}
                <img
                    src="/Keshav.png"
                    alt="Keshav Jangir"
                    className="h-full w-full md:w-auto object-cover md:object-contain object-top md:object-bottom drop-shadow-2xl grayscale md:grayscale-0"
                />
            </motion.div>

            {/* Global Section Blend - Smooth transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none" />
        </section>
    )
}

export default Hero
