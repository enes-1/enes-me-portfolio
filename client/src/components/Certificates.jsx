import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- VERİ ---

// Sertifika resimlerini Vite'in işleyebilmesi için doğrudan import ediyoruz.
import reactCert from '../assets/sertifika/react.png';
import jsCert from '../assets/sertifika/javascript.png';
import nodejsCert from '../assets/sertifika/nodejs.png';
import aspnetCert from '../assets/sertifika/aspnet.png';
import pythonCert from '../assets/sertifika/python.jpg';
import eticaretCert from '../assets/sertifika/eticaretkursu.png';

// Sertifikaları ve Eğitimleri tek bir yerde topluyoruz.
const allContent = [
    // --- Sertifikalar ---
    {
        type: 'Sertifika',
        title: "Sıfırdan Uygulamalı React Geliştirme",
        description: "Hooks, Redux & Firebase ile modern React geliştirme",
        instructor: "Sadık TURAN",
        platform: "Udemy",
        platformColor: "blue",
        bgColor: "blue",
        image: reactCert
    },
    {
        type: 'Sertifika',
        title: "Modern JavaScript Dersleri ES7+",
        description: "Sıfırdan ileri seviye JavaScript eğitimi",
        instructor: "Sadık TURAN",
        platform: "Udemy",
        platformColor: "yellow",
        bgColor: "yellow",
        image: jsCert
    },
    {
        type: 'Sertifika',
        title: "Node.js Eğitimi",
        description: "Backend geliştirme ile Node.js",
        instructor: "Sadık TURAN",
        platform: "Udemy",
        platformColor: "green",
        bgColor: "green",
        image: nodejsCert
    },
    {
        type: 'Sertifika',
        title: "ASP.NET Core Eğitimi",
        description: "Modern web uygulamaları geliştirme",
        instructor: "Sadık TURAN",
        platform: "Udemy",
        platformColor: "purple",
        bgColor: "purple",
        image: aspnetCert
    },
    {
        type: 'Sertifika',
        title: "Python Programlama",
        description: "Sıfırdan Python öğrenme",
        instructor: "Sadık TURAN",
        platform: "Udemy",
        platformColor: "blue",
        bgColor: "indigo",
        image: pythonCert
    },
    {
        type: 'Sertifika',
        title: "E-Ticaret Kursu",
        description: "E-ticaret sitesi geliştirme",
        instructor: "Sadık TURAN",
        platform: "Udemy",
        platformColor: "orange",
        bgColor: "orange",
        image: eticaretCert
    },

    // --- Eğitimler (YouTube) ---
    // Bilgiler sağlanan linkler kontrol edilerek güncellenmiştir.
    {
        type: 'Eğitim',
        title: "C# 101 Dersleri",
        description: "React Dersleri",
        instructor: "Enes Bayram",
        platform: "YouTube",
        platformColor: "red", // YouTube için kırmızı tema
        bgColor: "red",
        url: "https://www.youtube.com/watch?v=wSDZyaLlCeo&list=PLURN6mxdcwL-xIXzq92ZJN9yRW7Q0mjzw"
    },
    {
        type: 'Eğitim',
        title: "SQL Dersleri",
        description: "Javascript Dersleri ",
        instructor: "Enes Bayram",
        platform: "YouTube",
        platformColor: "red",
        bgColor: "red",
        url: "https://www.youtube.com/watch?v=mcwBvvThO40&list=PLURN6mxdcwL86Q8tCF1Ef6G6rN2jAg5Ht"
    },
    {
        type: 'Eğitim',
        title: "C# Başlangıç ve İleri Düzey Eğitimi",
        description: "Modern versiyon kontrol sistemleri.",
        instructor: "Enes Bayram",
        platform: "YouTube",
        platformColor: "red",
        bgColor: "red",
        url: "https://www.youtube.com/watch?v=RJ-4hIXK-Ms&list=PLURN6mxdcwL960S-bRuf1F6K09yzNjgcn"
    },
    {
        type: 'Eğitim',
        title: "Tasarım Desenleri (Design Patterns)",
        description: "Baştan Sona Dart Programlama Dili (7+ saat)",
        instructor: "Veli Bacık",
        platform: "YouTube",
        platformColor: "red",
        bgColor: "red",
        url: "https://www.youtube.com/watch?v=H6NJHb5BJyE"
    },
    {
        type: 'Eğitim',
        title: "Temelden Zirveye Flutter:#0 Giriş, Nedir, Mantık ve Düşüncesi",
        description: "Dart ve Flutter ile cross-platform geliştirme.",
        instructor: "Veli Bacık",
        platform: "YouTube",
        platformColor: "red",
        bgColor: "red",
        url: "https://www.youtube.com/watch?v=lpvuM9lo3HU&list=PL1k5oWAuBhgXdw1BbxVGxxWRmkGB1C11l"
    },
];

// --- BİLEŞENLER ---

const Card = ({ content }) => {
    const { type, title, description, instructor, platform, platformColor, bgColor, image, url } = content;

    const platformStyles = {
        blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        yellow: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
        green: "bg-green-500/20 text-green-400 border-green-500/30",
        purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        red: "bg-red-500/20 text-red-400 border-red-500/30", // YouTube için
    };

    const bgGradients = {
        blue: "from-blue-500/10 to-purple-500/10",
        yellow: "from-yellow-500/20 to-orange-500/20",
        green: "from-green-500/20 to-teal-500/20",
        purple: "from-purple-500/20 to-pink-500/20",
        indigo: "from-indigo-500/20 to-indigo-600/20",
        orange: "from-orange-500/20 to-red-500/20",
        red: "from-red-500/10 to-red-600/10", // YouTube için
    };
    
    const cardContent = (
        <div className="group relative bg-slate-800/30 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/50 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className={`relative h-48 p-4 flex items-center justify-center bg-gradient-to-br ${bgGradients[bgColor]}`}>
                {image ? (
                    <img src={image} alt={title} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                ) : (
                    <div className="text-5xl">{type === 'Eğitim' ? '▶️' : '📜'}</div>
                )}
                <div className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-full border ${platformStyles[platformColor]} backdrop-blur-sm`}>
                    {platform}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-extrabold text-slate-50 mb-2 leading-tight group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{description}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="opacity-70">👤</span>
                    {instructor}
                </div>
            </div>
        </div>
    );

    // Eğer URL varsa kartı tıklanabilir bir link yap
    if (url) {
        return <a href={url} target="_blank" rel="noopener noreferrer">{cardContent}</a>;
    }
    return cardContent;
};

const TabButton = ({ text, activeTab, setActiveTab }) => {
    const isSelected = activeTab === text;
    return (
        <button
            onClick={() => setActiveTab(text)}
            className={`px-6 py-2 font-bold rounded-full text-lg transition-all duration-300
                ${isSelected 
                    ? 'bg-sky-500 text-white shadow-lg' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
        >
            {text}
        </button>
    )
}

const CertificatesAndTrainings = () => {
    const [activeTab, setActiveTab] = useState('Sertifika');

    const filteredContent = useMemo(() =>
        allContent.filter(item => item.type === activeTab)
    , [activeTab]);

    return (
        <section id="certificates" className="py-20 relative min-h-screen flex items-center">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-50 mb-4 tracking-tight">Sertifika ve Eğitimlerim</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Aldığım sertifikalar ve takip ettiğim önemli eğitim serileri</p>
                </div>
                
                {/* Filtre Butonları */}
                <div className='flex items-center justify-center gap-4 mb-12'>
                    <TabButton text="Sertifika" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton text="Eğitim" activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Kartlar */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredContent.map((item, index) => (
                           <motion.div
                             key={item.title}
                             layout
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -20 }}
                             transition={{ duration: 0.3 }}
                           >
                             <Card content={item} />
                           </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default CertificatesAndTrainings;
