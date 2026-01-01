import { Github, Linkedin, Code2 } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="py-8 px-6 border-t border-white/5 relative z-10">
            <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 text-white text-sm">
                <p>© {new Date().getFullYear()} Keshav Jangir.</p>
                <div className="flex items-center gap-6">
                    <a href="https://github.com/Keshav14git" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent-primary transition-colors">
                        <Github size={18} />
                        <span>GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/keshavjangir14" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent-primary transition-colors">
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://leetcode.com/Keshav-Jangir" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent-primary transition-colors">
                        <Code2 size={18} />
                        <span>LeetCode</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
