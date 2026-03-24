import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { artists } from '../data/artists';

export default function Artists() {
  return (
    <main className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase mb-8">MI7 Artists</h1>
        <p className="text-gray-400 text-lg font-light mb-16">The elite standard in global music production.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <Link to={`/artists/${artist.id}`} key={artist.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-gray-900 border border-white/10 rounded-lg">
                  <img
                    src={artist.coverImage}
                    alt={artist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="px-6 py-3 border border-white/30 text-white font-mono text-sm tracking-widest uppercase bg-black/50 backdrop-blur-md rounded-full transform scale-95 group-hover:scale-100 transition-transform duration-300 delay-100">
                      View Dossier
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-gray-300 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono uppercase tracking-widest mt-1">
                      {artist.role}
                    </p>
                    <p className="text-xs text-gray-600 font-mono uppercase tracking-widest mt-1">
                      {artist.genre}
                    </p>
                  </div>
                  {artist.fileNo && (
                    <span className="text-[10px] font-mono text-gray-600 border border-gray-800 px-2 py-1 rounded-full whitespace-nowrap">
                      {artist.fileNo.split('-')[1] || 'MI7'}
                    </span>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
