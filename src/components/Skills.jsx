import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Layout, Server, Cpu, Globe, Terminal, Layers, Box, GitBranch, Cloud, Lock, Smartphone, Send, Key, Wifi, Share2, Radio, Shield } from 'lucide-react'

// Layout Configuration: span-12 (mobile), span-6 (tablet), span-X (desktop)
const skillCategories = [
    {
        id: "frontend",
        title: "Frontend & UI",
        subtitle: "Crafting pixel-perfect, immersive experiences.",
        colSpan: "md:col-span-7",
        skills: [
            { name: "React.js", icon: <Layout />, color: "#61DAFB" },
            { name: "Next.js", icon: <Globe />, color: "#ffffff" },
            { name: "Tailwind CSS", icon: <Box />, color: "#06B6D4" },
            { name: "Context API", icon: <Share2 />, color: "#61DAFB" }, // Using Share2 for Context/State
            { name: "Zustand", icon: <Database />, color: "#443E38" }, // Database imply state store
            { name: "Responsive UI", icon: <Smartphone />, color: "#FFD700" },
        ]
    },
    {
        id: "languages",
        title: "Languages & Core",
        subtitle: "The raw logic behind the magic.",
        colSpan: "md:col-span-5",
        skills: [
            { name: "JavaScript (ES6+)", icon: <Code2 />, color: "#F7DF1E" },
            { name: "TypeScript", icon: <Code2 />, color: "#3178C6" },
            { name: "HTML5", icon: <Layout />, color: "#E34F26" },
            { name: "CSS3", icon: <Layout />, color: "#1572B6" },
            { name: "C++", icon: <Cpu />, color: "#00599C" },
            { name: "Python", icon: <Code2 />, color: "#3776AB" },
        ]
    },
    {
        id: "backend",
        title: "Backend Integration",
        subtitle: "Scalable architecture & secure data flow.",
        colSpan: "md:col-span-6",
        skills: [
            { name: "Node.js", icon: <Server />, color: "#339933" },
            { name: "REST APIs", icon: <Wifi />, color: "#FF5733" },
            { name: "Convex", icon: <Database />, color: "#F5A623" },
            { name: "Appwrite", icon: <Database />, color: "#F02E65" },
            { name: "JWT", icon: <Lock />, color: "#F50057" },
            { name: "Socket.io", icon: <Radio />, color: "#ffffff" },
            { name: "RBAC", icon: <Shield />, color: "#22C55E" },
            { name: "WebAssembly", icon: <Cpu />, color: "#654FF0" },
        ]
    },
    {
        id: "tools",
        title: "Tools & DevOps",
        subtitle: "Deployment, CI/CD, and Development Platforms.",
        colSpan: "md:col-span-6",
        skills: [
            { name: "Git", icon: <GitBranch />, color: "#F05032" },
            { name: "GitHub", icon: <GitBranch />, color: "#ffffff" },
            { name: "Vercel", icon: <Cloud />, color: "#ffffff" },
            { name: "Postman", icon: <Send />, color: "#FF6C37" },
            { name: "Monaco Editor", icon: <Code2 />, color: "#1E1E1E" },
            { name: "Clerk", icon: <Key />, color: "#6C47FF" },
            { name: "Docker", icon: <Box />, color: "#2496ED" },
            { name: "GitHub Actions", icon: <Terminal />, color: "#2088FF" },
            { name: "AWS EC2", icon: <Cloud />, color: "#FF9900" },
        ]
    }
]

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className={`relative rounded-3xl border border-white/10 bg-zinc-900/50 overflow-hidden group ${className}`}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            {/* Content Container */}
            <div className="relative h-full">{children}</div>
        </div>
    );
};

const SkillPill = ({ skill }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
        <span className="text-xs text-white/60 font-mono">{skill.name}</span>
        {/* Simple colored dot for category coding */}
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
    </div>
)

const Skills = () => {
    return (
        <section id="skills" className="py-24 md:py-32 relative z-20 overflow-hidden">


            <div className="container mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="pl-4 md:pl-0 border-l-2 border-accent-primary"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-white">SkillSet</span>
                    </h2>
                    <p className="text-xl text-text-muted font-light max-w-xl">
                        A curated stack of technologies I use to architect scalable and resilient digital solutions.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    {skillCategories.map((category, index) => (
                        <SpotlightCard key={index} className={`p-8 md:p-10 flex flex-col justify-between ${category.colSpan}`}>
                            <div className="mb-6">
                                <h3 className="text-3xl font-light text-white mb-2">{category.title}</h3>
                                <p className="text-white/40 font-mono text-sm tracking-wide">{category.subtitle}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, idx) => (
                                    <SkillPill key={idx} skill={skill} />
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
