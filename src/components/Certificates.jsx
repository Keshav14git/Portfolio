import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, X, ZoomIn } from 'lucide-react'

const Certificates = () => {
    const [hoveredCert, setHoveredCert] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const defaultTheme = {
        bgDark: "#050505",
        accentPrimary: "#6366f1",
        accentGlow: "#818cf8"
    }

    const certs = [
        {
            id: 1,
            org: "LetsUpgrade",
            title: "React.Js Specialist",
            desc: "Advanced mastery of modern React ecosystem, including hooks, context API, and performance optimization patterns.",
            logo: "/LU.png",
            items: ["React.Js Certification"],
            imgs: ["/react.png"],
            theme: {
                bgDark: "#0f0502",
                accentPrimary: "#f97316",
                accentGlow: "rgba(249, 115, 22, 0.4)"
            },
            gradient: "from-orange-600 to-red-600",
            textClasses: "text-orange-100"
        },
        {
            id: 2,
            org: "HackerRank",
            title: "Problem Solving",
            desc: "Verified algorithmic prowess. Solved complex data structure challenges with optimized time & space complexity.",
            logo: "/H.png",
            items: ["Problem Solving (Basic)", "Problem Solving (Intermediate)"],
            imgs: ["/basic.png", "/intermediate.png"],
            theme: {
                bgDark: "#021a10",
                accentPrimary: "#10b981",
                accentGlow: "rgba(16, 185, 129, 0.4)"
            },
            gradient: "from-emerald-600 to-teal-600",
            textClasses: "text-emerald-100"
        },
        {
            id: 3,
            org: "Cisco",
            title: "Cyber Security",
            desc: "Comprehensive understanding of network defense, threat mitigation, and secure infrastructure design.",
            logo: "/c.png",
            items: ["Introduction to Cyber Security"],
            imgs: ["/cisco.png"],
            theme: {
                bgDark: "#020617",
                accentPrimary: "#38bdf8",
                accentGlow: "rgba(56, 189, 248, 0.4)"
            },
            gradient: "from-blue-600 to-cyan-400",
            textClasses: "text-blue-100"
        }
    ]

    const handleMouseEnter = (cert) => {
        setHoveredCert(cert.id)
        if (cert.theme) {
            document.documentElement.style.setProperty('--color-bg-dark', cert.theme.bgDark)
            document.documentElement.style.setProperty('--color-accent-primary', cert.theme.accentPrimary)
            document.documentElement.style.setProperty('--color-accent-glow', cert.theme.accentGlow)
        }
    }

    const handleMouseLeave = () => {
        setHoveredCert(null)
        document.documentElement.style.setProperty('--color-bg-dark', defaultTheme.bgDark)
        document.documentElement.style.setProperty('--color-accent-primary', defaultTheme.accentPrimary)
        document.documentElement.style.setProperty('--color-accent-glow', defaultTheme.accentGlow)
    }

    return (
        <section id="certificates" className="py-20 px-6 relative z-10 transition-colors duration-1000 ease-in-out">
            <div className="container mx-auto max-w-7xl h-[750px] md:h-[400px] flex flex-col">

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-12 pl-4 md:pl-0 border-l-2 border-accent-primary"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-white">Credentials</span>
                    </h2>
                    <p className="text-xl text-text-muted font-light max-w-xl">
                        Awards & Certifications that validate my expertise.
                    </p>
                </motion.div>

                <div className="flex-1 flex flex-col md:flex-row gap-4">
                    {certs.map((cert) => {
                        const isHovered = hoveredCert === cert.id
                        const isDimmed = hoveredCert !== null && !isHovered

                        return (
                            <motion.div
                                key={cert.id}
                                layout
                                onMouseEnter={() => handleMouseEnter(cert)}
                                onClick={() => handleMouseEnter(cert)}
                                onMouseLeave={handleMouseLeave}
                                className={`
                                    relative h-full rounded-[2rem] overflow-hidden cursor-pointer 
                                    border border-white/5 bg-white/[0.02] backdrop-blur-sm
                                    transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                    group
                                `}
                                animate={{
                                    flex: isHovered ? 4 : 1,
                                    opacity: isDimmed ? 0.5 : 1,
                                    filter: isDimmed ? 'grayscale(100%)' : 'grayscale(0%)'
                                }}
                            >
                                {/* Gradient Blob */}
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.4 }}
                                        className={`absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br ${cert.gradient} blur-[100px] z-0`}
                                    />
                                )}

                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col z-10">
                                    {/* Header: Icon & Title */}
                                    <div className="flex items-center gap-5 mb-4">
                                        <div className={`
                                            w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                                            bg-white p-2
                                            shadow-lg shadow-${cert.gradient.split('-')[1]}-500/30
                                        `}>
                                            <img
                                                src={cert.logo}
                                                alt={cert.org}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="text-lg md:text-xl font-display font-bold text-white leading-none whitespace-nowrap">
                                                {cert.org}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Collapsed Content: Brief List */}
                                    {!isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="mt-1"
                                        >
                                            <p className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-3 border-l-2 border-white/10 pl-3">
                                                {cert.title}
                                            </p>
                                            <div className="space-y-2">
                                                {cert.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 group/item">
                                                        <div
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ backgroundColor: cert.theme.accentPrimary }}
                                                        />
                                                        <span className="text-xs text-white/40 group-hover/item:text-white/70 transition-colors truncate max-w-[150px] md:max-w-none">
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.4, delay: 0.2 }}
                                                className="flex-1 flex flex-col justify-end mt-2"
                                            >
                                                <p className={`text-sm font-light leading-relaxed mb-4 max-w-lg ${cert.textClasses} line-clamp-2 md:line-clamp-none`}>
                                                    {cert.desc}
                                                </p>

                                                {/* Images */}
                                                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                                    {cert.imgs.map((img, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ y: 20, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 0.1 * i }}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setSelectedImage(img)
                                                            }}
                                                            className="relative w-32 aspect-[4/3] rounded-lg overflow-hidden border border-white/10 group/img hover:border-white/40 transition-colors shrink-0"
                                                        >
                                                            <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors z-10" />
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-20">
                                                                <ZoomIn className="text-white drop-shadow-md" size={20} />
                                                            </div>
                                                            <img
                                                                src={img}
                                                                alt="Cert"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Lightbox Modal via Portal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                        >
                            <motion.button
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={32} />
                            </motion.button>

                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={selectedImage}
                                alt="Full Screen Certificate"
                                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10 object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    )
}

export default Certificates
