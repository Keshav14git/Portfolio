import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [activeSection, setActiveSection] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    })

    const toggleSection = (section) => {
        const isOpening = activeSection !== section
        setActiveSection(isOpening ? section : null)

        if (isOpening && section === 'inquiry') {
            setTimeout(() => {
                const element = document.getElementById('contact')
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }, 200)
        }
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ loading: true, success: false, error: null })

        try {
            await emailjs.send(
                'service_0ykjf37',
                'template_di3znkl',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: "Keshav Jangir"
                },
                '_ATgNBSEZAR-PEjCe'
            )

            setStatus({ loading: false, success: true, error: null })
            setFormData({ name: '', email: '', message: '' })

            // Auto close after success? Maybe just show success message.
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }))
            }, 5000)

        } catch (error) {
            console.error("EmailJS Error:", error)
            setStatus({ loading: false, success: false, error: "Failed to send message. Please try again." })
        }
    }

    return (
        <section id="contact" className="py-20 px-6 bg-bg-dark flex items-center justify-center min-h-[80vh]">
            <div className="container mx-auto max-w-4xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-20 pl-4 md:pl-0 border-l-2 border-accent-primary"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                        Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-white">With Me</span>
                    </h2>
                    <p className="text-xl text-text-muted font-light max-w-xl">
                        Initiate communication.
                    </p>
                </motion.div>

                <div className="flex flex-col">

                    {/* 01 / EMAIL */}
                    <div className="group border-b border-white/10">
                        <a href="mailto:keshavjangir1411@gmail.com" className="block py-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors px-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-xs text-text-muted opacity-50">01</span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-accent-primary transition-colors">
                                    EMAIL
                                </h3>
                            </div>
                            <ArrowUpRight className="text-white opacity-20 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                        </a>
                    </div>

                    {/* 02 / INQUIRY (EXPANDING FORM) */}
                    <div className="group border-b border-white/10">
                        <div
                            className="py-6 px-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                            onClick={() => toggleSection('inquiry')}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-text-muted opacity-50">02</span>
                                    <h3 className={`text-3xl md:text-4xl font-bold transition-colors ${activeSection === 'inquiry' ? 'text-accent-primary' : 'text-white'}`}>
                                        INQUIRY
                                    </h3>
                                </div>
                                <div className={`transform transition-transform duration-300 ${activeSection === 'inquiry' ? 'rotate-90' : ''}`}>
                                    <ArrowRight size={24} className={`transition-opacity ${activeSection === 'inquiry' ? 'text-accent-primary' : 'text-white opacity-20 group-hover:opacity-100'}`} />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {activeSection === 'inquiry' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden bg-white/5 rounded-b-lg"
                                >
                                    <div className="p-8">
                                        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Jane Doe"
                                                        required
                                                        className="w-full bg-transparent border-b border-white/10 py-2 text-lg text-white focus:outline-none focus:border-accent-primary transition-colors placeholder:text-white/10"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="jane@example.com"
                                                        required
                                                        className="w-full bg-transparent border-b border-white/10 py-2 text-lg text-white focus:outline-none focus:border-accent-primary transition-colors placeholder:text-white/10"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Project Details</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows="3"
                                                    placeholder="Tell me about your vision..."
                                                    className="w-full bg-transparent border-b border-white/10 py-2 text-lg text-white focus:outline-none focus:border-accent-primary transition-colors placeholder:text-white/10 resize-none"
                                                />
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={status.loading || status.success}
                                                    className={`px-8 py-3 font-bold text-sm rounded-full transition-all flex items-center gap-2 ${status.success
                                                            ? "bg-green-500 text-white"
                                                            : "bg-white text-black hover:bg-accent-primary hover:text-white"
                                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    {status.loading ? (
                                                        <>Processing <Loader2 className="animate-spin" size={16} /></>
                                                    ) : status.success ? (
                                                        <>Sent <CheckCircle2 size={16} /></>
                                                    ) : (
                                                        <>Send Message <ArrowUpRight strokeWidth={2.5} size={16} /></>
                                                    )}
                                                </button>

                                                {status.error && (
                                                    <p className="text-red-400 text-xs flex items-center gap-1">
                                                        <AlertCircle size={14} /> {status.error}
                                                    </p>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Contact
