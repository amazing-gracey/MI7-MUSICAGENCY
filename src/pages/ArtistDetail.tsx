import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { artists } from '../data/artists';

export default function ArtistDetail() {
  const { id } = useParams<{ id: string }>();
  const artist = artists.find(a => a.id === id);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <ShieldAlert size={48} className="mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-mono uppercase tracking-widest">File Not Found</h1>
          <p className="text-gray-500 mt-2">The requested dossier does not exist or access is denied.</p>
          <Link to="/artists" className="mt-6 inline-block text-sm font-mono uppercase tracking-widest hover:text-red-500 transition-colors">
            &larr; Return to Database
          </Link>
        </div>
      </div>
    );
  }

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    
    // Handle channel URLs
    if (url.includes('youtube.com/channel/') || url.includes('youtube.com/@')) {
      return { type: 'channel', url };
    }

    // Handle video/shorts URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? { type: 'video', id: match[2] } : null;
  };

  const musicMedia = getYoutubeId(artist.youtubeMusic);
  const performanceMedia = getYoutubeId(artist.youtubePerformance);

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <Link to="/artists" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft size={16} />
          Back to Database
        </Link>

        {/* Dossier Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-1 rounded uppercase tracking-widest">
                Classified
              </span>
              {artist.fileNo && (
                <span className="text-gray-500 font-mono text-xs tracking-widest">
                  FILE NO: {artist.fileNo}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-2">
              {artist.name}
            </h1>
            {artist.koreanName && (
              <p className="text-xl text-gray-400 font-medium mb-4">{artist.koreanName}</p>
            )}
            <div className="flex flex-wrap gap-4 font-mono text-sm tracking-widest uppercase">
              <span className="text-white">{artist.role}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">{artist.genre}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">Clearance Level</div>
            <div className="text-2xl font-display font-bold text-red-500">{artist.clearanceLevel}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Images & Bio */}
          <div className="md:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 z-[100] group"
            >
              <a href={artist.coverImage} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                <img 
                  src={artist.coverImage} 
                  alt={artist.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 tracking-widest">
                    VIEW ORIGINAL
                  </span>
                </div>
              </a>
              <div className="absolute inset-0 border-[4px] border-black/20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/30 pointer-events-none" />
            </motion.div>

            {artist.profileImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-square rounded-lg overflow-hidden border border-white/10 z-[100] group"
              >
                <a href={artist.profileImage} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                  <img 
                    src={artist.profileImage} 
                    alt={`${artist.name} Profile`} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 tracking-widest">
                      VIEW ORIGINAL
                    </span>
                  </div>
                </a>
              </motion.div>
            )}

            <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Agent Bio</h3>
              <p className="text-lg font-light leading-relaxed text-gray-300">
                {artist.bio}
              </p>
            </div>
          </div>

          {/* Right Column: History & Media */}
          <div className="md:col-span-7 space-y-12">
            {/* History Profile Card */}
            {artist.history.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8"
              >
                <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Service Record
                </h3>
                <div className="space-y-8">
                  {artist.history.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                        {section.category}
                      </h4>
                      <ul className="space-y-3">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 text-sm text-gray-300">
                            <span className="text-red-500 mt-1">▹</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Media Section */}
            {(musicMedia || performanceMedia) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-display font-bold uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Media Surveillance
                </h3>

                {musicMedia && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Official Audio/Video</h4>
                    {musicMedia.type === 'video' ? (
                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${musicMedia.id}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <a href={musicMedia.url} target="_blank" rel="noopener noreferrer" className="block w-full p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center font-mono text-sm">
                        View Official Channel &rarr;
                      </a>
                    )}
                  </div>
                )}

                {performanceMedia && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">View channel</h4>
                    {performanceMedia.type === 'video' ? (
                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${performanceMedia.id}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <a href={performanceMedia.url} target="_blank" rel="noopener noreferrer" className="block w-full p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center font-mono text-sm">
                        View Performance Channel &rarr;
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
