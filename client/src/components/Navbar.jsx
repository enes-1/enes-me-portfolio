import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const navLinks = [
        { href: '#hero', label: 'Ana Sayfa' },
        { href: '#tech-stack', label: 'Teknolojiler' },
        { href: '#certificates', label: 'Sertifikalar' },
        { href: '#projects', label: 'Projeler' },
        { href: '#references', label: 'Referanslar' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                // Navbar yüksekliğini (yaklaşık 60-80px) hesaba katmak için bir ofset ekliyoruz.
                if (window.scrollY >= sectionTop - 80 && window.scrollY < sectionTop + sectionHeight - 80) {
                    currentSection = section.getAttribute('id');
                }
            });

            if (currentSection) {
                setActiveSection(currentSection);
            } else if (window.scrollY < 400) { // En üstteyse 'Ana Sayfa'yı aktif yap
                setActiveSection('hero');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Sayfa yüklendiğinde de kontrol et

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLinkClass = (sectionId) => {
        const baseClass = "px-4 py-1.5 rounded-full text-sm font-semibold transition-all";
        if (activeSection === sectionId) {
            return `${baseClass} text-slate-50 bg-slate-700 shadow-sm font-bold`;
        }
        return `${baseClass} text-slate-400 hover:text-white hover:bg-white/5`;
    };

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-white/10 py-3' : 'bg-transparent border-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <a href="#hero" className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-all group-hover:shadow-blue-500/40 p-1">
                        <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain invert brightness-0" />
                    </div>
                    <h2 className="text-xl font-extrabold font-mono tracking-tight text-slate-50">Enes<span className="text-blue-500">.dev</span></h2>
                </a>

                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-full border border-slate-700/50 backdrop-blur-sm">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className={getLinkClass(link.href.substring(1))}>
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <a href="mailto:enesdogru747@gmail.com" className="hidden md:block px-5 py-2.5 rounded-full bg-slate-50 text-slate-900 text-sm font-extrabold shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all">
                        İletişim
                    </a>

                    <button className="md:hidden p-2 text-slate-400 hover:text-white">
                        <span className="text-2xl">☰</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
