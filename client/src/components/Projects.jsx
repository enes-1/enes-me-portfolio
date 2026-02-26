import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const ProjectCard = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        // scrollHeight, elemanın içeriğinin tamamının sığması için gereken minimum yüksekliktir.
        // clientHeight ise elemanın ekranda kapladığı gerçek yüksekliktir.
        // Eğer içerik, ayrılan alana sığmıyorsa, scrollHeight clientHeight'tan büyük olur.
        if (descriptionRef.current) {
            setIsClamped(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, [project.description]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col bg-slate-800/30 rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all hover:shadow-xl hover:shadow-blue-900/10 group"
        >
            <div className="h-48 bg-slate-800/50 relative overflow-hidden">
                {/* Proje Görseli için Yer Tutucu Gradyan */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                    Proje Önizle
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p
                    ref={descriptionRef}
                    className={`text-gray-400 text-sm mb-4 transition-all duration-300 ${!isExpanded && 'line-clamp-3'}`}
                >
                    {project.description}
                </p>

                {isClamped && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-400 text-sm font-semibold hover:underline mb-4 self-start"
                    >
                        {isExpanded ? 'Daha Az Göster' : 'Daha Fazla Oku'}
                    </button>
                )}

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-gray-300 border border-slate-700">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition-colors">
                            <FaGithub /> GitHub
                        </a>
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition-colors">
                                <FaExternalLinkAlt /> Canlı Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "E-Ticaret Yönetim Paneli",
            description: "Çevrimiçi mağazaları yönetmek için kapsamlı bir kontrol paneli; gerçek zamanlı analizler, envanter yönetimi ve sipariş işleme özelliklerine sahiptir.",
            tech: ["React", "Tailwind", "Node.js", "MongoDB"],
            gradient: "from-blue-600 to-indigo-900",
            github: "#",
            demo: "#"
        },
        {
            title: "Sosyal Medya Uygulaması",
            description: "Kullanıcıların anları paylaşmasına, arkadaşlarıyla bağlantı kurmasına ve temiz bir kullanıcı arayüzü ile yeni içerikler keşfetmesine olanak tanıyan modern bir sosyal platform. Bu proje, ölçeklenebilir bir mimari ve yüksek performanslı bir veritabanı yapısı ile tasarlanmıştır. Gerçek zamanlı bildirimler ve anlık mesajlaşma gibi özellikler de içermektedir.",
            tech: ["Dart", "Flutter", "Location Services (GPS)","Google Maps / Map Services"],
            gradient: "from-purple-600 to-pink-900",
            github: "#",
            demo: "#"
        },
          {
            title: "Sosyal Medya Uygulaması",
            description: "Kullanıcıların anları paylaşmasına, arkadaşlarıyla bağlantı kurmasına ve temiz bir kullanıcı arayüzü ile yeni içerikler keşfetmesine olanak tanıyan modern bir sosyal platform. Bu proje, ölçeklenebilir bir mimari ve yüksek performanslı bir veritabanı yapısı ile tasarlanmıştır. Gerçek zamanlı bildirimler ve anlık mesajlaşma gibi özellikler de içermektedir.",
            tech: ["Dart", "Flutter", "Location Services (GPS)","Google Maps / Map Services"],
            gradient: "from-purple-600 to-pink-900",
            github: "#",
            demo: "#"
        },
          {
            title: "Sosyal Medya Uygulaması",
            description: "Kullanıcıların anları paylaşmasına, arkadaşlarıyla bağlantı kurmasına ve temiz bir kullanıcı arayüzü ile yeni içerikler keşfetmesine olanak tanıyan modern bir sosyal platform. Bu proje, ölçeklenebilir bir mimari ve yüksek performanslı bir veritabanı yapısı ile tasarlanmıştır. Gerçek zamanlı bildirimler ve anlık mesajlaşma gibi özellikler de içermektedir.",
            tech: ["Dart", "Flutter", "Location Services (GPS)","Google Maps / Map Services"],
            gradient: "from-purple-600 to-pink-900",
            github: "#",
            demo: "#"
        },
        {
            title: "Sınav Takip Sistemi",
            description: "Öğrenci performansını izlemek, raporlar oluşturmak ve dönemler boyunca ilerlemeyi takip etmek için bir eğitim aracı.",
            tech: ["Vue.js", "Firebase", "Chart.js"],
            gradient: "from-emerald-600 to-teal-900",
            github: "#",
            demo: null
        }
    ];

    return (
        <section id="projects" className="min-h-screen flex items-center py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4"> Yaptığım Bazı Projeler</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">............</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
