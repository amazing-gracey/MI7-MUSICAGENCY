import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Headquarters</h3>
            <address className="not-italic text-lg font-light leading-relaxed text-gray-300">
              MI7 Agency<br />
              Seoul, South Korea
            </address>
          </div>
          
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Contact</h3>
            <ul className="space-y-4 text-lg font-light text-gray-300">
              <li><a href="mailto:dpfmfl@naver.com" className="hover:text-white transition-colors">dpfmfl@naver.com</a></li>
              <li><a href="tel:+821090773635" className="hover:text-white transition-colors">(+82) 010 9077 3635</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Network</h3>
            <ul className="space-y-4 text-lg font-light text-gray-300">
              <li><Link to="/artists" className="hover:text-white transition-colors">MI7 Artists</Link></li>
              <li><Link to="/music" className="hover:text-white transition-colors">Music</Link></li>
              <li><Link to="/shows" className="hover:text-white transition-colors">Shows</Link></li>
              <li><Link to="/mission-request" className="hover:text-white transition-colors">Mission Request</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/join" className="hover:text-white transition-colors">Join Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Intelligence</h3>
            <p className="text-gray-400 mb-4 font-light">Subscribe for classified updates.</p>
            <form className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full outline-none text-white placeholder-gray-600 font-light"
              />
              <button type="submit" className="text-sm uppercase tracking-widest hover:text-gray-400 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12">
          <div className="w-full md:w-auto">
            <Link to="/">
              <h1 className="text-[12vw] leading-none font-display font-bold tracking-tighter text-white/10 hover:text-white/20 transition-colors select-none">
                MI7
              </h1>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto mt-8 md:mt-0">
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between text-xs font-mono text-gray-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} MI7 Entertainment. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
