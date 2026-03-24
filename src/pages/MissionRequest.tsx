import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Plus } from 'lucide-react';
import { missionService, Mission } from '../services/missionService';

export default function MissionRequest() {
  const [missions, setMissions] = useState<Partial<Mission>[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMissions = async () => {
      const data = await missionService.getMissions();
      setMissions(data);
      setLoading(false);
    };
    fetchMissions();
  }, []);

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-4">Mission Request</h1>
            <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
              공연 섭외 문의를 남겨주세요. 확인 후 연락드립니다.
            </p>
          </div>
          <Link 
            to="/mission-request/new" 
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-mono text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            <Plus size={18} />
            문의 접수하기
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-gray-400">
                  <th className="p-4 font-normal">File No.</th>
                  <th className="p-4 font-normal">Title</th>
                  <th className="p-4 font-normal hidden md:table-cell">Genre</th>
                  <th className="p-4 font-normal hidden sm:table-cell">Date</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-center">Access</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-mono text-sm uppercase tracking-widest">
                      Decrypting Database...
                    </td>
                  </tr>
                ) : missions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-mono text-sm uppercase tracking-widest">
                      No mission requests found.
                    </td>
                  </tr>
                ) : (
                  missions.map((mission, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={mission.id}
                      onClick={() => navigate(`/mission-request/${mission.id}`)}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <td className="p-4 font-mono text-xs text-gray-500 group-hover:text-white transition-colors whitespace-nowrap">
                        {mission.id}
                      </td>
                      <td className="p-4 font-medium text-gray-300 group-hover:text-white transition-colors">
                        {mission.title}
                      </td>
                      <td className="p-4 text-sm text-gray-500 hidden md:table-cell">
                        {mission.genres?.join(', ')}
                      </td>
                      <td className="p-4 font-mono text-xs text-gray-500 hidden sm:table-cell">
                        {mission.date}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${
                          mission.status === '완료' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                          mission.status === '연락완료' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                          'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                        }`}>
                          {mission.status}
                        </span>
                      </td>
                      <td className="p-4 text-center text-gray-600 group-hover:text-red-500 transition-colors">
                        <Lock size={16} className="mx-auto" />
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
