import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Aurora from './components/Aurora'
import Cursor from './components/Cursor'

import Skills from './components/Skills'

function App() {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
            <div className="min-h-screen relative font-sans text-text-main selection:bg-accent-primary/30 cursor-none">
                <Aurora />
                <Cursor />

                <div className="noise-bg" />
                <Navbar />

                <main className="relative z-10">
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Certificates />
                    <Contact />
                </main>

                <Footer />
            </div>
        </ReactLenis>
    )
}

export default App
