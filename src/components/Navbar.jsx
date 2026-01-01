import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Certificates', href: '#certificates' },
        { name: 'Contact', href: '#contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)

            const scrollPosition = window.scrollY + 100

            for (const link of navLinks) {
                const sectionId = link.href.substring(1)
                const element = document.getElementById(sectionId)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId)
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: "0%",
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const linkVariants = {
        closed: { opacity: 0, y: 50 },
        open: { opacity: 1, y: 0 }
    }

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg-dark/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="#home" className="z-50 block relative">
                        <img src="/K.png" alt="Logo" className="h-8 md:h-12 w-auto object-contain transition-all duration-300" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1)
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-white' : 'text-text-muted hover:text-white'}`}
                                    onClick={() => setActiveSection(link.href.substring(1))}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-accent-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </a>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 text-white flex items-center gap-2 group relative"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="text-sm font-mono uppercase tracking-widest mr-2 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-difference">
                            {isOpen ? 'Close' : 'Menu'}
                        </span>
                        <div className="relative w-8 h-8 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay Portal */}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-0 bg-bg-dark/95 backdrop-blur-xl z-[45] flex flex-col justify-center px-8"
                        >
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, index) => {
                                    const isActive = activeSection === link.href.substring(1)
                                    return (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            variants={linkVariants}
                                            onClick={() => {
                                                setIsOpen(false)
                                                setActiveSection(link.href.substring(1))
                                            }}
                                            className={`text-5xl font-bold tracking-tighter flex items-center gap-4 group ${isActive ? 'text-accent-primary' : 'text-zinc-500'}`}
                                        >
                                            <span className="text-sm font-mono text-accent-primary opacity-50 font-normal">0{index + 1}</span>
                                            <span className="group-hover:text-white transition-colors duration-300 group-hover:translate-x-4 transform transition-transform">{link.name}</span>
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default Navbar
