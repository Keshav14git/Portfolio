import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Trophy, Terminal, Cpu, ArrowUpRight, Sparkles } from 'lucide-react'

// 3D Tilt Card Component
const Item = ({ children, index, title, digit }) => {
    const ref = useRef(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left - width / 2)
        mouseY.set(clientY - top - height / 2)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    const rotateX = useTransform(mouseY, [-200, 200], [5, -5])
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5])
    const shineMask = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, white, transparent)`

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group perspective-1000 mb-32 last:mb-0"
        >
            <div className="flex flex-col md:flex-row gap-8 md:items-start">
                {/* Floating Identifier */}
                <div className="md:sticky md:top-32 font-mono text-xs md:text-sm text-accent-primary/50 tracking-[0.2em] uppercase writing-vertical-rl md:h-auto flex items-center gap-4">
                    <span className="w-px h-12 bg-accent-primary/30" />
                    {digit} // {title}
                </div>

                {/* Content Void */}
                <div className="flex-1 relative">
                    {/* Hover Highlight (Holographic Shine) */}
                    <motion.div
                        style={{ maskImage: shineMask, WebkitMaskImage: shineMask }}
                        className="absolute -inset-8 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none -z-10"
                    />

                    {/* Active Glow Border (Only visible on hover) */}
                    <div className="absolute -inset-8 border border-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                    {children}
                </div>
            </div>
        </motion.div>
    )
}

const About = () => {
    return (
        <section id="about" className="relative py-32 px-6">
            <div className="container mx-auto max-w-5xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-32 pl-4 md:pl-0 border-l-2 border-accent-primary"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-white">Profile</span>
                    </h2>
                    <p className="text-xl text-text-muted font-light max-w-xl">
                        A transparent look into the data structures that define my career.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Data Line */}
                    <div className="absolute left-0 md:left-[17px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -z-10" />

                    {/* 01. Bio */}
                    <Item digit="01" title="IDENTITY">
                        <div className="md:pl-12">
                            <div className="flex items-center gap-4 mb-6 text-accent-primary">
                                <Terminal size={24} />
                                <span className="font-mono text-sm tracking-widest uppercase">System Architecture</span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                                I am <span className="text-white">Keshav Jangir</span>.<br />
                                <span className="text-text-muted">Analyzing complexity to engineer </span>
                                <span className="text-white border-b border-accent-primary/50 pb-1">clarity</span>.
                            </h3>

                            <div className="grid grid-cols-2 gap-8 max-w-lg">
                                <div>
                                    <h4 className="text-sm font-mono text-text-muted mb-2 uppercase tracking-wider">Education</h4>
                                    <p className="text-lg text-white">JECRC University</p>
                                    <p className="text-sm text-accent-primary/80 mt-1">B.Tech CSE</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-mono text-text-muted mb-2 uppercase tracking-wider">Focus</h4>
                                    <p className="text-lg text-white">Full Stack Eng.</p>
                                    <p className="text-sm text-accent-primary/80 mt-1">High Perf. Web</p>
                                </div>
                            </div>
                        </div>
                    </Item>

                    {/* 02. Education */}
                    <Item digit="02" title="ACADEMICS">
                        <div className="md:pl-12">
                            <div className="flex items-center gap-4 mb-6 text-blue-400">
                                <Globe size={24} />
                                <span className="font-mono text-sm tracking-widest uppercase">Knowledge Base</span>
                            </div>

                            <div className="space-y-12">
                                <div className="group/edu relative">
                                    <div className="absolute -left-6 top-2 w-2 h-2 bg-blue-400 rounded-full md:opacity-0 group-hover/edu:opacity-100 transition-opacity" />
                                    <h3 className="text-4xl font-bold mb-2 group-hover/edu:text-blue-400 transition-colors">JECRC University</h3>
                                    <div className="flex flex-wrap gap-4 items-center text-lg text-text-muted mb-4">
                                        <span>2022 - 2026</span>
                                    </div>
                                    <p className="text-xl font-light leading-relaxed max-w-2xl">
                                        Specializing in Computer Science & Engineering. Deep diving into Algorithms, Operating Systems, and Distributed Computing.
                                    </p>
                                </div>

                                <div className="group/edu relative">
                                    <div className="absolute -left-6 top-2 w-2 h-2 bg-blue-400 rounded-full md:opacity-0 group-hover/edu:opacity-100 transition-opacity" />
                                    <h3 className="text-3xl font-bold mb-2 group-hover/edu:text-blue-400 transition-colors">Ideal Public School</h3>
                                    <p className="text-sm text-blue-400/80 mb-4 font-mono">Rajgarh</p>

                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-4 items-center text-lg text-text-muted">
                                            <span className="text-white">Senior Secondary</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                                            <span>81%</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                                            <span className="font-mono text-sm opacity-50">2020-21</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center text-lg text-text-muted">
                                            <span className="text-white">Secondary</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                                            <span>84.6%</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                                            <span className="font-mono text-sm opacity-50">2018-19</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Item>

                    {/* 03. Metrics */}
                    <Item digit="03" title="METRICS">
                        <div className="md:pl-12">
                            <div className="flex items-center gap-4 mb-6 text-purple-400">
                                <Trophy size={24} />
                                <span className="font-mono text-sm tracking-widest uppercase">Performance Log</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group/stat overflow-hidden rounded-2xl bg-white/5 p-8 border border-white/5 hover:border-purple-500/50 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover/stat:opacity-100 transition-opacity">
                                        <ArrowUpRight size={24} className="text-purple-400" />
                                    </div>
                                    <h4 className="text-6xl font-bold text-white mb-2 group-hover/stat:text-purple-400 transition-colors">500+</h4>
                                    <p className="text-sm font-mono text-text-muted tracking-widest uppercase">DSA Problems Solved</p>
                                </div>

                                <div className="relative group/stat overflow-hidden rounded-2xl bg-white/5 p-8 border border-white/5 hover:border-purple-500/50 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover/stat:opacity-100 transition-opacity">
                                        <Sparkles size={24} className="text-purple-400" />
                                    </div>
                                    <h4 className="text-6xl font-bold text-white mb-2 group-hover/stat:text-purple-400 transition-colors">12</h4>
                                    <p className="text-sm font-mono text-text-muted tracking-widest uppercase">LeetCode Badges</p>
                                </div>
                            </div>
                        </div>
                    </Item>

                </div>
            </div>
        </section>
    )
}

export default About
