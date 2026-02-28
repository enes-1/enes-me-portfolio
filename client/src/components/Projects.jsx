import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

// Görseller
import eticaretImg from '../assets/E-ticaretSitesi.png';
import kuranVeNamazImg from '../assets/kuranvenamazpro.png';
import lightJumpImg from '../assets/LihgtJump.png';
import meetingAppImg from '../assets/meetingapp.png';
import otoparkImg from '../assets/Otoparkotomasyonu.png';
import portfolioImg from '../assets/portfolio.png';
import portfolioEskiImg from '../assets/portfolioeski.png';

const ProjectCard = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
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
            className="flex flex-col bg-slate-800/30 rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all hover:shadow-xl hover:shadow-blue-900/10 group h-full"
        >
            {/* Görsel kapsayıcısını büyütüp, background color'ını görsellerin karanlık temasına uyumlu yapıyoruz. 
                object-contain ile resmin tamamen sığmasını sağlayıp kırpılmasını (taşmasını) engelliyoruz. */}
            <div className="h-60 relative flex items-center justify-center bg-[#0d1117] p-4 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain rounded-lg opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-0 transition-opacity pointer-events-none`}></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p
                    ref={descriptionRef}
                    className={`text-gray-400 text-sm mb-4 transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}
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
                            <span key={i} className="px-2 py-1 rounded-md bg-slate-800 space-x-1 text-xs text-gray-300 border border-slate-700 shadow-sm">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {project.github ? (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition-colors">
                                <FaGithub /> GitHub
                            </a>
                        ) : (
                            <span className="flex items-center gap-2 text-sm text-gray-500 cursor-help" title="Projelerim gizlidir, istek doğrultusunda kişiye özel açılabilir.">
                                <FaLock className="text-gray-600" /> Gizli Depo
                            </span>
                        )}

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
            title: "Kuran ve Namaz Pro",
            description: "Mobil cihazlar için özel olarak geliştirilmiş, Diyanet işleri uyumlu Kuran-ı Kerim okuma ve namaz vakti takip uygulaması. Şık kullanıcı arayüzü, zengin özellikler (kaza takibi, cami bulucu, dualar) ve dinamik tasarımıyla öne çıkar.",
            tech: ["Dart", "HTML", "Python", "C++", "CMake", "Swift"],
            gradient: "from-green-600 to-emerald-900",
            image: kuranVeNamazImg,
            github: "",
            demo: ""
        },
        {
            title: "Online Toplantı Platformu",
            description: "Ekipler için tasarlanmış yüksek çözünürlüklü ve düşük gecikmeli, güvenilir çevrimiçi görüntülü görüşme platformu. WebRTC teknolojisi kullanılarak kesintisiz bir iletişim deneyimi sağlanmaktadır.",
            tech: ["HTML", "C#", "CSS"],
            gradient: "from-blue-600 to-indigo-900",
            image: meetingAppImg,
            github: "",
            demo: ""
        },
        {
            title: "E-Ticaret Yönetim ve Satış Sistemi",
            description: "Modern, hızlı ve güvenli e-ticaret çözümü. Kapsamlı katalog yönetimi, zengin filtreler, güvenli ödeme altyapısı ve gelişmiş panel ile hem kullanıcılar hem de satıcılar için ideal.",
            tech: ["JavaScript", "HTML", "Python"],
            gradient: "from-orange-600 to-red-900",
            image: eticaretImg,
            github: "",
            demo: ""
        },
        {
            title: "Light Jump Oyun Geliştirme",
            description: "Mobil platformlar ve web için geliştirilen, oyuncuların reflekslerini zorlayan eğlenceli ve dinamik platform zıplama oyunu. Akıcı mekanikler ve optimize edilmiş bir oyun motoru deneyimi.",
            tech: ["C#", "HLSL", "ShaderLab"],
            gradient: "from-yellow-500 to-orange-800",
            image: lightJumpImg,
            github: "",
            demo: ""
        },
        {
            title: "Otopark Otomasyon Sistemi",
            description: "Geniş kapasiteli otoparkların günlük operasyonlarını kolaylaştıran; araç giriş-çıkış kontrolü, plaka takibi ve otomatik ücret hesaplaması yapan masaüstü yönetim sistemi.",
            tech: ["HTML", "Visual Basic .NET"],
            gradient: "from-gray-600 to-slate-900",
            image: otoparkImg,
            github: "",
            demo: ""
        },
        {
            title: "Güncel React Portfolyom",
            description: "Kişisel becerilerimi ve projelerimi sunduğum, son teknoloji frontend kütüphaneleri ve pürüzsüz animasyonlar ile tasarlanan modern ve güncel CV / portfolyo web sitesi.",
            tech: ["JavaScript", "CSS", "HTML"],
            gradient: "from-purple-600 to-fuchsia-900",
            image: portfolioImg,
            github: "",
            demo: ""
        },
        {
            title: "İlk Nesil Portfolyo (Classic)",
            description: "Geçmişte geliştirmiş olduğum ve temellerin gücünü yansıtan eski versiyon portfolyo sitem. Sade yapısı, doğrudan içeriğe odaklanması ile dikkat çeker.",
            tech: ["HTML", "CSS", "JavaScript"],
            gradient: "from-slate-500 to-zinc-800",
            image: portfolioEskiImg,
            github: "",
            demo: ""
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Öne Çıkan Projelerim</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Geliştirdiğim bazı önemli projeler ve kullanılan teknolojilerin detayları aşağıda listelenmiştir. Kaynak kodları gizlilik standartlarına uygun olarak korunmaktadır, ancak detayları ve kodları incelemek için iletişime geçebilirsiniz.
                    </p>
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
