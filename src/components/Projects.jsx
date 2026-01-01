import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null)
    const containerRef = useRef(null)

    const defaultTheme = {
        bgDark: "#050505",
        accentPrimary: "#6366f1",
        accentGlow: "#818cf8"
    }

    const projects = [
        {
            id: 1,
            title: "ASSESSIQ",
            category: "Remote Interview Platform",
            year: "Apr 2025 - May 2025",
            tech: "Next.js, TypeScript, Tailwind, Convex, Stream, Clerk",
            description: [
                "Real-Time Collaborative Ecosystem: Built a seamless technical interview platform integrating live video conferencing (Stream) with a synchronized integrated code editor (Monaco).",
                "AI-Powered Integrity System: Engineered an automated proctoring module using MediaPipe computer vision to detect and log suspicious behaviors like face absence or multiple people in real-time.",
                "Generative AI Integration: Leveraged Google Gemini to dynamically generate customized interview questions and coding challenges while providing automated performance analysis.",
                "Modern Serverless Architecture: Developed using Next.js 14, TypeScript, and Convex (BaaS) to ensure instant data synchronization and scalable performance without infrastructure overhead.",
                "Premium UX/UI Design: Crafted a high-end \"ultra-dark\" aesthetic with fluid Framer Motion animations, delivering a responsive and professional user experience."
            ],
            color: "#4f46e5",
            image: "linear-gradient(to bottom right, #4f46e5, #0ea5e9)",
            url: "https://assessiqpro.vercel.app",
            theme: {
                bgDark: "#0a0a0a",
                accentPrimary: "#16a34a",
                accentGlow: "rgba(34,197,94,0.3)"
            },
            styles: {
                titleGradient: "group-hover:from-green-400 group-hover:via-emerald-400 group-hover:to-teal-400",
                buttonClass: "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] shadow-green-500/20"
            }
        },
        {
            id: 2,
            title: "TALK",
            category: "Enterprise Collaboration Workspace", // Updated category based on description
            year: "Feb 2025 - Mar 2025",
            tech: "MERN Stack, Socket.io, JWT, TailwindCSS, Zustand", // Keeping tech same or updating? User didn't explicitly say to change tech stack string, but description mentions "Integrated Project Management", etc. I will keep existing tech string unless obvious conflict, but wait, description says "Integrated Project Management...". New description points are provided. I will use them.
            description: [
                "Identity: A professional Enterprise Collaboration Workspace, designed to unify team communication and project management in a single, secure environment.",
                "Organization-First Architecture: Users operate within distinct Workspaces (e.g., \"Engineering\", \"Sales\"), each with strict Role-Based Access Control (RBAC) (Owner, Admin, Member, Guest) to ensure data security and proper hierarchy.",
                "Advanced Communication: Structured Channel-Based Messaging (public/private channels) replaces simple chats, powered by a real-time engine for instant connectivity across the entire organization.",
                "Integrated Project Management: A built-in Task & Project Hub allows teams to create projects, track tasks (status, priority, assignees), and view progress via dedicated Project Dashboards, eliminating the need for external tools.",
                "Productivity Suite: Features a comprehensive Meeting & Scheduler system (Internal/External links, Offline locations) and Calendar Integration, making it a self-sufficient productivity ecosystem."
            ],
            color: "#ffffff", // Changed to white to match theme
            image: "linear-gradient(to bottom right, #000000, #404040)", // Updated to monochrome gradient
            url: "https://nowtalk.vercel.app",
            theme: {
                bgDark: "#000000",
                accentPrimary: "#ffffff",
                accentGlow: "rgba(255,255,255,0.3)"
            },
            styles: {
                titleGradient: "group-hover:from-white group-hover:via-gray-200 group-hover:to-gray-400",
                buttonClass: "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-gray-100"
            }
        }
    ]

    // Sync theme with active/hovered project
    useEffect(() => {
        const theme = hoveredProject?.theme || defaultTheme
        const root = document.documentElement

        root.style.setProperty('--color-bg-dark', theme.bgDark)
        root.style.setProperty('--color-accent-primary', theme.accentPrimary)
        root.style.setProperty('--color-accent-glow', theme.accentGlow)

    }, [hoveredProject])

    return (
        <section
            id="projects"
            className="py-32 px-6 relative transition-colors duration-700"
            ref={containerRef}
        >

            {/* Background Image Reveal - Kept subtle */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 mix-blend-screen opacity-10">
                <AnimatePresence mode="wait">
                    {hoveredProject && (
                        <motion.div
                            key={hoveredProject.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full bg-cover bg-center blur-3xl"
                            style={{ background: hoveredProject.image }}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-24 pl-4 md:pl-0 border-l-2 border-accent-primary"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-white">Work</span>
                    </h2>
                    <p className="text-xl text-text-muted font-light max-w-xl">
                        Projects that define me.
                    </p>
                </motion.div>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative border-t border-white/10 transition-colors hover:bg-white/5"
                            onClick={() => setHoveredProject(hoveredProject?.id === project.id ? null : project)}
                        >
                            <div className="py-12 px-4 md:px-8 cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-20">
                                        <span className={`text-4xl md:text-6xl font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/50 transition-all duration-500 ${project.styles?.titleGradient || "group-hover:from-white group-hover:to-white"}`}>
                                            {project.title}
                                        </span>
                                        <span className="font-mono text-sm text-text-muted">{project.category} — {project.year}</span>
                                    </div>

                                    {/* Desktop: Animated Arrow, Mobile: Hidden (moved to expanded) */}
                                    <div className="hidden md:block transition-transform duration-500 group-hover:-rotate-45">
                                        <ArrowUpRight size={32} className="text-white/20 group-hover:text-white" />
                                    </div>
                                </div>

                                {/* The Shutter / Accordion Expansion */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: hoveredProject?.id === project.id ? 'auto' : 0,
                                        opacity: hoveredProject?.id === project.id ? 1 : 0
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-8 md:pl-4 max-w-3xl">
                                        <div className="flex flex-col gap-6">
                                            <p className="font-mono text-accent-primary text-sm">
                                                &gt; Tech Stack: {project.tech}
                                            </p>
                                            <ul className="space-y-2 border-l border-white/10 pl-6">
                                                {project.description.map((item, idx) => (
                                                    <li key={idx} className="text-text-muted font-light leading-relaxed">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Dedicated Mobile/Expanded Action Button */}
                                            <div className="pt-6">
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-transform active:scale-95 ${project.styles?.buttonClass || "bg-white text-black"}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Live Project <ArrowUpRight size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </div>
        </section>
    )
}

export default Projects
