import React from 'react';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center px-0 py-12 md:py-32 lg:py-40 overflow-hidden">
            {/* Background elements moved to App.jsx/Global */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Elements - Hidden on mobile */}
                <div className="hidden lg:block absolute top-20 left-10 opacity-50 animate-[float_6s_ease-in-out_infinite]">
                    <div className="text-xs font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm text-blue-400">
                        const developer = &#123;<br />&nbsp;&nbsp;name: "Enes",<br />&nbsp;&nbsp;role: "Full Stack"<br />&#125;;
                    </div>
                </div>
                <div className="hidden lg:block absolute bottom-20 right-10 opacity-50 animate-[float_6s_ease-in-out_infinite] delay-2000">
                    <div className="text-xs font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm text-purple-400">
                        &lt;Component <br />&nbsp;&nbsp;prop="creative" <br />&nbsp;&nbsp;mode="dark" <br />/&gt;
                    </div>
                </div>
                <div className="hidden lg:block absolute bottom-40 left-40 opacity-10 animate-[float_6s_ease-in-out_infinite] delay-4000">
                    <div className="text-4xl font-mono font-bold text-white">&lt;/&gt;</div>
                </div>
                <div className="hidden lg:block absolute top-1/4 right-1/2 opacity-10 animate-[float_6s_ease-in-out_infinite] delay-4000">
                    <div className="text-4xl font-mono font-bold text-white">&lt;/&gt;</div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-14 flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="flex-1 text-center lg:text-left mt-16 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-medium mb-8 backdrop-blur-sm shadow-sm">
                        <span className="relative w-2 h-2">
                            <span className="absolute w-full h-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                            <span className="relative block w-full h-full rounded-full bg-green-500"></span>
                        </span>
                        Open to Work
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-black leading-[1.05] mb-8 tracking-tighter text-slate-50">
                        Merhaba, Ben <br />
                        <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 bg-clip-text text-transparent">Enes.</span>
                    </h1>

                    <div className="font-mono text-lg md:text-xl text-slate-400 mb-8 h-8 flex items-center justify-center lg:justify-start">
                        <span className="text-blue-500 mr-2">&gt;</span>
                        <span>Full Stack Yazılım Geliştirici</span>
                        <span className="w-2.5 h-5 bg-blue-500 ml-1 animate-[blink_1s_step-end_infinite]"></span>
                    </div>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                        Ben Enes Doğru, modern teknolojilerle uçtan uca çözümler geliştiren bir Full Stack Developer’ım.
                        Performans, güvenlik ve ölçeklenebilirliği merkeze alan yazılım mimarileri tasarlayarak; fikirleri, gerçek dünyada değer üreten dijital ürünlere dönüştürüyorum.
                        Amacım sadece çalışan değil, uzun ömürlü, sürdürülebilir ve yüksek kaliteli sistemler inşa etmek.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <button className="w-full sm:w-auto h-14 px-8 rounded-full font-extrabold text-[15px] tracking-wide transition-all duration-300 cursor-pointer border-none bg-slate-900 text-slate-50 shadow-xl hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 group flex items-center justify-center gap-2">
                            <span>Projelerimi Gör</span>
                            <span className="icon-arrow transition-transform group-hover:translate-x-1"></span>
                        </button>
                    </div>

                    {/* <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 opacity-80">
                        <div className="flex -space-x-2 mr-4">
                            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-[#61DAFB] text-slate-900 flex items-center justify-center text-[10px] font-bold" title="React">Re</div>
                            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-[#3178C6] text-white flex items-center justify-center text-[10px] font-bold" title="TypeScript">TS</div>
                            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-[#38B2AC] text-white flex items-center justify-center text-[10px] font-bold" title="Tailwind">Tw</div>
                            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-[#333333] text-white flex items-center justify-center text-[10px] font-bold" title="Next.js">Nx</div>
                        </div>
                        <div className="h-8 w-px bg-slate-700"></div>
                        <div className="flex gap-4">
                            <span className="icon-code text-slate-400 hover:text-white cursor-pointer transition-colors"></span>
                            <span className="icon-work text-slate-400 hover:text-white cursor-pointer transition-colors"></span>
                            <span className="icon-email text-slate-400 hover:text-white cursor-pointer transition-colors"></span>
                        </div>
                    </div> */}
                </div>

                {/* Code Window / Visual */}
                <div className="flex-1 w-full p-2 max-w-[450px] lg:max-w-none">
                    <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square group">
                        <div className="absolute inset-4  p-22 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2rem] blur-[40px] opacity-90 animate-[pulse-slow_4s_cubic-bezier(0.4,0,0.6,1)_infinite] group-hover:opacity-75 transition-opacity"></div>

                        <div className="relative h-full w-full bg-slate-800/50 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col transition-transform duration-500 group-hover:scale-[1.02]">
                            <div className="h-12 bg-slate-900/50 border-b border-white/5 flex items-center px-6 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
                                <div className="ml-4 text-xs font-mono text-slate-400">~/enes/portfolio/main.tsx</div>
                            </div>

                            <div className="flex-1 p-6 font-mono text-sm bg-slate-900/95 relative overflow-hidden">
                                <div className="absolute left-2 top-6 bottom-0 w-8 md:w-12 text-right pr-2 md:pr-4 text-slate-700 select-none leading-relaxed hidden sm:block">
                                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11<br />12<br />13
                                </div>
                                <div className="sm:pl-8 md:pl-10 relative overflow-x-auto text-slate-300 leading-relaxed text-xs md:text-sm">
                                    <span className="text-[#a78bfa]">import</span> &#123; <span className="text-[#fbbf24]">Passion</span>, <span className="text-[#fbbf24]">Creativity</span> &#125; <span className="text-[#a78bfa]">from</span> <span className="text-[#4ade80]">'@life/values'</span>;<br /><br />
                                    <span className="text-[#60a5fa]">const</span> <span className="text-[#fbbf24]">EnesPortfolio</span> = () =&gt; &#123;<br />
                                    &nbsp;&nbsp;<span className="text-[#60a5fa]">return</span> (<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-[#f86855]">Developer</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a78bfa]">name</span>=<span className="text-[#4ade80]">"Enes"</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a78bfa]">skills</span>=&#123;[<span className="text-[#4ade80]">"Frontend"</span>, <span className="text-[#4ade80]">"Backend"</span>, <span className="text-[#4ade80]">"UI/UX"</span>]&#125;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a78bfa]">status</span>=<span className="text-[#4ade80]">"Ready to Build"</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
                                    &nbsp;&nbsp;);<br />
                                    &#125;;<br /><br />
                                    <span className="text-[#a78bfa]">export default</span> <span className="text-[#fbbf24]">EnesPortfolio</span>;
                                </div>

                                <div className="absolute bottom-6 right-6 w-32 h-32 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl rotate-[-6deg] transition-transform duration-300 hover:rotate-0">
                                    <img src="/img/profil.png" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
