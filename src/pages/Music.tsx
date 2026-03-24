import { motion } from 'motion/react';
import { ExternalLink, PlayCircle, Disc3 } from 'lucide-react';

// 임시 아티스트 및 음악 데이터 (나중에 실제 데이터로 교체)
const AUDIO_DOSSIERS = [
  {
    id: '01',
    artistName: '그레이시 (GRACEY)',
    genre: 'Jazz / K-pop',
    description: 'MI7의 창립자이자 수석 보컬 요원. 우아하고 깊이 있는 소울풀 재즈 보이스(Soulful jazz voice with graceful depth)로 공간을 압도합니다. 자라섬 재즈 페스티벌 등 다수의 굵직한 무대 경험을 보유하고 있습니다.',
    image: 'https://i.postimg.cc/gxbXsXgV/image.jpg',
    // 스포티파이 임베드 링크
    spotifyEmbed: 'https://open.spotify.com/embed/artist/5KMVJlL8CYAlEQ2yp2cdYA?utm_source=generator&theme=0',
    spotifyLink: 'https://open.spotify.com/artist/5KMVJlL8CYAlEQ2yp2cdYA?si=8tll2ySZR5K1nh62MN0ykg'
  },
  {
    id: '02',
    artistName: 'LUNA',
    genre: 'R&B / Soul',
    description: '독보적인 음색의 보컬리스트. 몽환적이면서도 소울풀한 목소리로 공간을 채웁니다. VIP 프라이빗 파티 및 프리미엄 브랜드 런칭쇼 섭외 1순위.',
    image: 'https://images.unsplash.com/photo-1618090584126-129cd1f3f043?q=80&w=1000&auto=format&fit=crop',
    spotifyEmbed: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4SBhb3jqCJD?utm_source=generator&theme=0',
    spotifyLink: '#'
  },
  {
    id: '03',
    artistName: 'ECHO SQUAD',
    genre: 'Hip-Hop / Live Band',
    description: '힙합과 라이브 밴드 사운드를 결합한 하이브리드 유닛. 폭발적인 에너지와 무대 장악력으로 페스티벌과 대규모 기업 행사에 최적화된 퍼포먼스를 선보입니다.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    spotifyEmbed: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0',
    spotifyLink: '#'
  }
];

export default function Music() {
  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-white/10 pb-12"
        >
          <div className="flex items-center gap-4 mb-4 text-[#39ff14]">
            <Disc3 size={24} className="animate-spin-slow" />
            <span className="font-mono tracking-widest uppercase text-sm">MI7 Audio Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-6">
            AUDIO DOSSIERS
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl leading-relaxed">
            MI7 소속 요원들의 기밀 오디오 파일을 공개합니다. <br className="hidden md:block" />
            각 아티스트의 고유한 사운드와 작업물을 스포티파이를 통해 직접 확인하십시오.
          </p>
        </motion.div>

        {/* Artist Audio List */}
        <div className="space-y-32">
          {AUDIO_DOSSIERS.map((dossier) => {
            return (
              <motion.div 
                key={dossier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col gap-8 bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/30 font-mono text-xs tracking-widest uppercase rounded-full">
                        FILE NO. {dossier.id}
                      </span>
                      <span className="font-mono text-sm text-gray-400 tracking-widest uppercase">{dossier.genre}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider uppercase text-white">{dossier.artistName}</h2>
                  </div>
                  <a 
                    href={dossier.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#39ff14] text-black font-bold font-mono text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-full shrink-0"
                  >
                    <ExternalLink size={16} />
                    <span>Open in Spotify</span>
                  </a>
                </div>

                <p className="text-gray-400 font-light leading-relaxed max-w-4xl text-lg">
                  {dossier.description}
                </p>

                {/* Media Grid (Image + Spotify) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  {/* Image */}
                  <div className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-4 relative group">
                    <img 
                      src={dossier.image} 
                      alt={dossier.artistName}
                      className="w-full h-auto max-h-[600px] object-contain rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Spotify */}
                  <div className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden flex flex-col relative group">
                    {/* Glow effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#39ff14]/10 blur-3xl rounded-full pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#39ff14]/10 blur-3xl rounded-full pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
                    
                    <iframe 
                      src={dossier.spotifyEmbed} 
                      width="100%" 
                      height="100%" 
                      className="flex-1 min-h-[352px] relative z-10"
                      frameBorder="0" 
                      allowFullScreen={false} 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
