import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function SpyScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barrelCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39ff14'; // Fluorescent green code rain
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isInView]);

  // 007 Barrel Roll Effect
  useEffect(() => {
    const canvas = barrelCanvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let angle = 0;
    let pulse = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * 0.2);

      // Draw concentric circles for the target
      ctx.lineWidth = 1.5;
      for (let i = 1; i <= 15; i++) {
        const radius = i * 60;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        if (i % 3 === 0) {
          ctx.strokeStyle = `rgba(57, 255, 20, ${0.3 + Math.sin(pulse) * 0.1})`;
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = `rgba(57, 255, 20, 0.15)`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }

      // Draw crosshairs
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(57, 255, 20, 0.4)`;
      
      ctx.beginPath();
      ctx.moveTo(-maxRadius, 0);
      ctx.lineTo(maxRadius, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -maxRadius);
      ctx.lineTo(0, maxRadius);
      ctx.stroke();

      // Draw diagonal crosshairs (fainter)
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(57, 255, 20, 0.15)`;
      ctx.beginPath();
      ctx.moveTo(-maxRadius, -maxRadius);
      ctx.lineTo(maxRadius, maxRadius);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-maxRadius, maxRadius);
      ctx.lineTo(maxRadius, -maxRadius);
      ctx.stroke();

      // Draw center dot
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 0, 0.8)`;
      ctx.fill();

      ctx.restore();
      angle += 0.01;
      pulse += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Background Canvases */}
      <canvas 
        ref={matrixCanvasRef} 
        className="absolute inset-0 w-full h-full opacity-30"
      />
      <canvas 
        ref={barrelCanvasRef} 
        className="absolute inset-0 w-full h-full mix-blend-screen"
      />

      {/* Spotlight */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Agent Image */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#39ff14]/50 drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]">
          <img 
            src="https://archive.org/download/gemini-generated-image-wad-61wad-61wad-61w/Gemini_Generated_Image_wad61wad61wad61w.png" 
            alt="MI7 Agent"
            className="w-[110%] h-[110%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* MI7 Glitch Text */}
        <div className="mt-8 text-center">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter glitch-intense" data-text="MI7">
            MI7
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[#39ff14] font-mono mt-4 tracking-[0.3em] uppercase text-sm md:text-base"
          >
            secret music agents
          </motion.p>
        </div>
      </motion.div>

      {/* Corner Markers */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#39ff14]/70" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#39ff14]/70" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#39ff14]/70" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#39ff14]/70" />

      {/* Classified Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
      >
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        <span className="text-red-500 font-mono text-xs tracking-[0.2em]">CLASSIFIED / MISSION ACTIVE</span>
      </motion.div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-20" />
    </section>
  );
}
