import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from 'react';
import Footer from './footer';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout({ children }) {
    const contentRef = useRef()
    const { scrollYProgress } = useScroll({
        container: contentRef
    })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <>
            <main className='flex w-screen h-screen font-roboto'>
                <Sidebar />
                <div className="content grow overflow-auto scroll-smooth" ref={contentRef}>
                    <div className='sticky top-0 z-10 bg-black'>
                        <Navbar />
                        {/* progress bar */}
                        <motion.div
                            className='h-1 bg-gradient-to-r from-bpom-b to-bpom-g via-bpom-m origin-left'
                            style={{ scaleX }}
                        />
                    </div>
                    {children}
                    <Footer />
                </div>
            </main>
        </>
    )
}