import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLAYLIST = [
  {
    id: 1,
    title: "Groove Supreme",
    artist: "MI7",
    src: "https://archive.org/download/mi-7-groove-supreme/MI7_Groove%20Supreme.mp3",
  },
];

export default function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
    };

    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        window.addEventListener('click', handleFirstInteraction);
      });
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <audio
        ref={audioRef}
        src={PLAYLIST[0].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
        loop
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-72 bg-black/90 backdrop-blur-xl border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                  Now Playing
                </p>
                <h3 className="font-display font-bold text-white text-base leading-tight">
                  {PLAYLIST[0].title}
                </h3>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
                  {PLAYLIST[0].artist}
                </p>
              </div>
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white transition-colors mt-1"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            <div
              ref={progressRef}
              onClick={handleSeek}
              className="w-full h-px bg-white/10 mb-2 cursor-pointer relative group"
            >
              <div
                className="absolute top-0 left-0 h-full bg-red-600 transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-6">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {isPlaying
                  ? <Pause size={20} fill="currentColor" />
                  : <Play size={20} fill="currentColor" className="ml-0.5" />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-full pl-3 pr-4 py-3 text-white hover:bg-white/10 transition-all"
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isPlaying ? 'bg-red-600' : 'bg-white/10'}`}>
          {isPlaying ? (
            <div className="flex gap-[2px] h-3 items-end">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 6, 10, 4] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.12,
                    repeatType: 'reverse',
                  }}
                  className="w-[2px] bg-white rounded-full"
                />
              ))}
            </div>
          ) : (
            <Volume2 size={14} />
          )}
        </div>

        <div className="flex flex-col items-start">
          <span className="text-xs font-bold font-display leading-none">
            {PLAYLIST[0].title}
          </span>
          <span className="text-[10px] text-gray-400 font-mono leading-none mt-1 uppercase tracking-wider">
            {isPlaying ? 'Playing' : '일시정지'}
          </span>
        </div>

        {isExpanded
          ? <Minimize2 size={14} className="ml-1 opacity-50" />
          : <Maximize2 size={14} className="ml-1 opacity-50" />
        }
      </motion.button>
    </div>
  );
}
