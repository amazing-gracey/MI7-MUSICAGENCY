import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, ShieldAlert } from 'lucide-react';
import { missionService, Mission } from '../services/missionService';

export default function MissionRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mission, setMission] = useState<Mission | null>(null);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsVerifying(true);
    setError('');
    
    try {
      const result = await missionService.verifyAndGetMission(id, password);
      if (result.success && result.mission) {
        setMission(result.mission);
        setIsAuthorized(true);
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('인증 중 오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isAuthorized) {
    return (
      <main className="pt-32 pb-24 px-4 min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-lg"
        >
          <div className="text-center mb-8">
            <Lock size={48} className="mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-display font-bold uppercase tracking-widest mb-2">Classified File</h1>
            <p className="text-gray-400 font-mono text-sm">FILE NO: {id}</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 text-center">
                Enter Password
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={8}
                className="w-full bg-black border border-white/20 focus:border-white outline-none py-3 text-center text-2xl tracking-[0.5em] transition-colors font-mono rounded"
                autoFocus
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center font-mono">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isVerifying || !password}
              className="w-full bg-white text-black py-3 rounded font-mono font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Access File'}
            </button>
            
            <div className="text-center mt-4">
              <Link to="/mission-request" className="text-xs text-gray-500 hover:text-white font-mono uppercase tracking-widest transition-colors">
                Cancel
              </Link>
            </div>
          </form>
        </motion.div>
      </main>
    );
  }

  if (!mission) return null;

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/mission-request" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft size={16} />
          Back to List
        </Link>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-12 relative overflow-hidden"
        >
          {/* Top Secret Stamp */}
          <div className="absolute top-8 right-8 border-4 border-red-500/30 text-red-500/30 text-4xl font-display font-bold uppercase tracking-widest p-4 transform rotate-12 pointer-events-none">
            CONFIDENTIAL
          </div>

          <div className="border-b border-white/10 pb-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded uppercase tracking-widest ${
                mission.status === '완료' ? 'bg-green-500 text-black' :
                mission.status === '연락완료' ? 'bg-blue-500 text-white' :
                'bg-yellow-500 text-black'
              }`}>
                {mission.status}
              </span>
              <span className="text-gray-500 font-mono text-xs tracking-widest">
                FILE NO: {mission.id}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tighter uppercase mb-2">
              {mission.title}
            </h1>
            <p className="text-gray-500 font-mono text-sm">
              Submitted: {new Date(mission.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Event Details</h3>
                <dl className="space-y-4 mt-4">
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Date & Time</dt>
                    <dd className="text-lg">{mission.date}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Location</dt>
                    <dd className="text-lg">{mission.location || '미정'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Budget</dt>
                    <dd className="text-lg text-green-400">{mission.budgetMin}만원 ~ {mission.budgetMax}만원</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Requested Genres</dt>
                    <dd className="flex gap-2 mt-2">
                      {mission.genres.map(g => (
                        <span key={g} className="bg-white/10 px-3 py-1 rounded-full text-sm font-mono">{g}</span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Client Information</h3>
                <dl className="space-y-4 mt-4">
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Name / Organization</dt>
                    <dd className="text-lg">{mission.name}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Contact Number</dt>
                    <dd className="text-lg font-mono">{mission.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs font-mono uppercase mb-1">Email Address</dt>
                    <dd className="text-lg">{mission.email}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Additional Notes</h3>
                <div className="mt-4 bg-black/50 p-4 rounded border border-white/5 min-h-[100px]">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {mission.notes || 'No additional notes provided.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
