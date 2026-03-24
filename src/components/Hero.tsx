import { motion } from 'motion/react';
import { Play, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Spline 3D Background */}
      <iframe 
        src="https://my.spline.design/animatedbackgroundgradientforweb-G6O39SMC0dEMyllDSEWVXSrN/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        className="absolute top-0 left-0 w-full h-full z-0 opacity-70 pointer-events-none"
        title="Spline 3D Background"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-gray-400 uppercase border border-gray-700 px-4 py-1 rounded-full bg-black/30 backdrop-blur-sm">
            MI7 MUSIC AGENTS
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative text-8xl md:text-[12rem] font-bold tracking-tighter leading-none font-display text-white mix-blend-overlay select-none glitch-intense"
          data-text="MI7"
        >
          MI7
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide flex flex-col gap-1"
        >
          <span>Where espionage meets entertainment.</span>
          <span>The elite standard in global music production.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a href="https://youtu.be/PjLAtMdm5Wc" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm overflow-hidden transition-all hover:bg-gray-200">
            <span className="relative z-10 flex items-center gap-2">
              <Play size={16} className="fill-current" />
              Watch Showreel
            </span>
            <div className="absolute inset-0 bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
          
          <a href="https://www.youtube.com/channel/UCYn1ToOdf4L_enXEWzWOd9g" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/20 text-white font-medium tracking-widest uppercase text-sm hover:bg-white/5 transition-colors backdrop-blur-sm">
            Explore MI7
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
