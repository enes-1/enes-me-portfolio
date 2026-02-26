import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certificates from './components/Certificates';
import TechStack from './components/TechStack';


import Projects from './components/Projects';
import References from './components/References';

function App() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30">
      {/* Global Background */}
      <div className="global-bg">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="grid-pattern"></div>
      </div>

      <Navbar />

      <main>
        <Hero />
        <TechStack />
        <Certificates />


        {/* Existing Sections kept for functionality */}

        <Projects />
        <References />
      </main>

      <footer className="py-12 bg-slate-900/50 backdrop-blur-sm border-t border-[#233648]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start md:gap-2">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-1.5 shadow-lg shadow-blue-500/20">
                  <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain invert brightness-0" />
                </div>
                <span className="text-xl font-bold font-mono text-slate-50">Enes.dev</span>
              </div>
              <p className="text-sm text-slate-400">© {new Date().getFullYear()} Enes. Tüm hakları saklıdır.</p>
            </div>




          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
