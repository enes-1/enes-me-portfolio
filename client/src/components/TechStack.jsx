import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const technologies = [
    // Frontend
    { name: 'Next.js', icon: <i className="devicon-nextjs-plain"></i>, category: 'Frontend', color: '#000000' },
    { name: 'React', icon: <i className="devicon-react-original"></i>, category: 'Frontend', color: '#61DAFB' },
    { name: 'Redux', icon: <i className="devicon-redux-original"></i>, category: 'Frontend', color: '#764ABC' },
    { name: 'Vue.js', icon: <i className="devicon-vuejs-plain"></i>, category: 'Frontend', color: '#4FC08D' },
    { name: 'Nuxt.js', icon: <i className="devicon-nuxtjs-plain"></i>, category: 'Frontend', color: '#00DC82' },
    { name: 'Svelte', icon: <i className="devicon-svelte-plain"></i>, category: 'Frontend', color: '#FF3E00' },
    { name: 'JavaScript', icon: <i className="devicon-javascript-plain"></i>, category: 'Frontend', color: '#F7DF1E' },
    { name: 'TypeScript', icon: <i className="devicon-typescript-plain"></i>, category: 'Frontend', color: '#3178C6' },
    { name: 'Tailwind CSS', icon: <i className="devicon-tailwindcss-original"></i>, category: 'Frontend', color: '#06B6D4' },

    // Backend
    { name: 'C#', icon: <i className="devicon-csharp-plain"></i>, category: 'Backend', color: '#512BD4' },
    { name: '.NET Core', icon: <i className="devicon-dot-net-plain"></i>, category: 'Backend', color: '#512BD4' },
    { name: 'NestJS', icon: <i className="devicon-nestjs-original"></i>, category: 'Backend', color: '#E0234E' },
    { name: 'Node.js', icon: <i className="devicon-nodejs-plain"></i>, category: 'Backend', color: '#339933' },
    { name: 'Python', icon: <i className="devicon-python-plain"></i>, category: 'Backend', color: '#3776AB' },
    { name: 'PHP', icon: <i className="devicon-php-plain"></i>, category: 'Backend', color: '#777BB4' },
    { name: 'Laravel', icon: <i className="devicon-laravel-plain"></i>, category: 'Backend', color: '#FF2D20' },

    // Databases
    { name: 'MongoDB', icon: <i className="devicon-mongodb-plain"></i>, category: 'Databases', color: '#47A248' },
    { name: 'PostgreSQL', icon: <i className="devicon-postgresql-plain"></i>, category: 'Databases', color: '#4169E1' },
    { name: 'MySQL', icon: <i className="devicon-mysql-plain"></i>, category: 'Databases', color: '#4479A1' },

    // Tools & Platforms
    { name: 'Vite', icon: <i className="devicon-vitejs-plain"></i>, category: 'Tools', color: '#646CFF' },
    { name: 'Figma', icon: <i className="devicon-figma-plain"></i>, category: 'Tools', color: '#F24E1E' },
    { name: 'Postman', icon: <i className="devicon-postman-plain"></i>, category: 'Tools', color: '#FF6C37' },
    { name: 'Git', icon: <i className="devicon-git-plain"></i>, category: 'Tools', color: '#F05032' },
    { name: 'GitHub', icon: <i className="devicon-github-original"></i>, category: 'Tools', color: '#181717' },
    { name: 'Docker', icon: <i className="devicon-docker-plain"></i>, category: 'Tools', color: '#2496ED' },

    // Mobile
    { name: 'Dart', icon: <i className="devicon-dart-plain"></i>, category: 'Mobile', color: '#0175C2' },
    { name: 'Flutter', icon: <i className="devicon-flutter-plain"></i>, category: 'Mobile', color: '#02569B' },
];

// Tooltip özellikli, küçük teknoloji ikonu
const TechItem = ({ item }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative group"
        >
            <div
                className="w-20 h-20 flex items-center justify-center
                           bg-slate-800/50 border border-slate-700 rounded-lg
                           transition-all duration-300 ease-in-out
                           hover:border-[var(--hover-color)]"
                style={{ '--hover-color': item.color }}
            >
                <div className="text-4xl text-slate-400 group-hover:text-white transition-colors duration-300"
                    style={{ color: item.name === 'Next.js' && 'white' }} // Next.js ikonu için özel durum
                >
                    {item.icon}
                </div>
            </div>
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2
                           scale-0 group-hover:scale-100
                           bg-slate-900 text-white text-xs font-bold
                           px-2 py-1 rounded shadow-lg whitespace-nowrap z-10
                           transition-all duration-200 pointer-events-none">
                {item.name}
            </span>
        </motion.div>
    );
};

// Kategori Filtreleme Düğmesi
const FilterButton = ({ category, selectedCategory, setCategory }) => {
    const isSelected = category === selectedCategory;
    return (
        <button
            onClick={() => setCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300
                        ${isSelected
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
        >
            {category}
        </button>
    );
}

const TechStack = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tümü');

    const categories = useMemo(() =>
        ['Tümü', ...new Set(technologies.map(t => t.category))]
        , []);

    const filteredTechs = useMemo(() =>
        selectedCategory === 'Tümü'
            ? technologies
            : technologies.filter(t => t.category === selectedCategory)
        , [selectedCategory]);

    return (
        <section id="tech-stack" className="py-20 relative overflow-hidden min-h-screen flex items-center">
            {/* Arka Plan Aydınlatması */}
            <div className="absolute -top-1/4 -left-40 w-1/2 h-1/2 bg-sky-500/20 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-1/4 -right-40 w-1/2 h-1/2 bg-indigo-500/20 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-50 mb-4 tracking-tight">Aktif Olarak Kullandığım Teknolojiler</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Projelerimde kullandığım araçlar, diller ve framework'ler.</p>
                </div>

                {/* Filtreleme Düğmeleri */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map(cat => (
                        <FilterButton
                            key={cat}
                            category={cat}
                            selectedCategory={selectedCategory}
                            setCategory={setSelectedCategory}
                        />
                    ))}
                </div>

                {/* Teknoloji Grid'i */}
                <motion.div layout className="flex flex-wrap justify-center gap-4">
                    <AnimatePresence>
                        {filteredTechs.map((item) => (
                            <TechItem key={item.name} item={item} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
