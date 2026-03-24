/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoundController from './components/SoundController';
import { motion, AnimatePresence } from 'motion/react';

import Home from './pages/Home';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Music from './pages/Music';
import Shows from './pages/Shows';
import Join from './pages/Join';
import About from './pages/About';
import MissionRequest from './pages/MissionRequest';
import MissionRequestNew from './pages/MissionRequestNew';
import MissionRequestDetail from './pages/MissionRequestDetail';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-display font-bold tracking-tighter"
              >
                MI7
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed inset-0 pointer-events-none z-[90] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="fixed inset-0 pointer-events-none z-[90] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/music" element={<Music />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/join" element={<Join />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission-request" element={<MissionRequest />} />
          <Route path="/mission-request/new" element={<MissionRequestNew />} />
          <Route path="/mission-request/:id" element={<MissionRequestDetail />} />
        </Routes>
        <Footer />
        <SoundController />
      </div>
    </Router>
  );
}
