import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/artists', label: 'MI7 Artists', koLabel: '아티스트 소개' },
  { path: '/music', label: 'Music', koLabel: '음악 & 앨범' },
  { path: '/shows', label: 'Shows', koLabel: '공연 & 영상' },
  { path: '/mission-request', label: 'Booking', koLabel: '공연 섭외 문의' },
  { path: '/about', label: 'About', koLabel: 'MI7 소개' },
  { path: '/join', label: 'Join Us', koLabel: '채용 정보' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-5 mix-blend-difference text-white"
      >
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity">
            MI7
          </Link>
          
          <div className="hidden lg:flex gap-8 text-sm uppercase tracking-widest font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="relative group py-2"
                >
                  <span className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                  
                  {/* Active Underline */}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                    />
                  )}
                  
                  {/* Hover Tooltip (Korean) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.koLabel}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            to="/mission-request" 
            className="hidden md:block px-5 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-full"
          >
            섭외 문의
          </Link>
          
          <button className="hover:opacity-70 transition-opacity hidden md:block">
            <Search size={24} />
          </button>
          <button className="hover:opacity-70 transition-opacity hidden md:block">
            <ShoppingBag size={24} />
          </button>

          <button 
            className="lg:hidden hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-5">
              <Link to="/" className="text-2xl font-display font-bold tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                MI7
              </Link>
              <button 
                className="hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8 gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex flex-col gap-1"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className={`text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                        {item.label}
                      </span>
                      <span className={`text-sm md:text-base font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                        {item.koLabel}
                      </span>
                    </div>
                    {isActive && <div className="w-12 h-1 bg-white mt-2" />}
                  </Link>
                );
              })}
              
              <Link 
                to="/mission-request" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 inline-block text-center px-8 py-4 bg-white text-black text-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-full"
              >
                섭외 문의
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
