import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { missionService } from '../services/missionService';

const GENRES = ['Jazz', 'Pop', 'R&B', 'K-pop', 'OST', '기타'];

export default function MissionRequestNew() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    budgetMin: '',
    budgetMax: '',
    genres: [] as string[],
    location: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await missionService.createMission(formData);
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/mission-request');
        }, 3000);
      } else {
        alert('요청 접수에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="pt-32 pb-24 px-4 min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-4">Mission Accepted</h2>
          <p className="text-gray-400 font-mono">요청이 성공적으로 접수되었습니다.<br/>검토 후 곧 연락드리겠습니다.</p>
          <p className="text-gray-600 font-mono text-sm mt-8 animate-pulse">Redirecting to database...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <Link to="/mission-request" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft size={16} />
          Back to List
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter uppercase mb-2">New Mission</h1>
          <p className="text-red-500 font-mono text-sm tracking-widest uppercase">Classified Request Form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* 1. 공연 타이틀 */}
          <div className="group">
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
              01. 공연 타이틀 <span className="text-red-500">*</span>
            </label>
            <input 
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예) 2026 MI7 연말 콘서트 게스트 섭외"
              className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700"
            />
          </div>

          {/* 2. 공연 일정 */}
          <div className="group">
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
              02. 공연 일정 (날짜 및 시간) <span className="text-red-500">*</span>
            </label>
            <input 
              required
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="예) 2026년 12월 24일 오후 7시"
              className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700"
            />
          </div>

          {/* 3. 예상 비용 */}
          <div className="group">
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
              03. 예상 비용 (만원 단위) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <input 
                required
                type="number"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                placeholder="최소 (예: 50)"
                className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700"
              />
              <span className="text-gray-500 font-mono">~</span>
              <input 
                required
                type="number"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                placeholder="최대 (예: 70)"
                className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700"
              />
            </div>
          </div>

          {/* 4. 공연 장르 */}
          <div>
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              04. 희망 장르 (복수 선택 가능) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-4 py-2 rounded-full font-mono text-sm border transition-colors ${
                    formData.genres.includes(genre) 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* 5. 공연 장소 */}
          <div className="group">
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
              05. 공연 장소
            </label>
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="예) 서울 올림픽홀 (미정인 경우 비워두세요)"
              className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700"
            />
          </div>

          {/* 6, 7, 8. 담당자 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
                06. 담당자명 (Client) <span className="text-red-500">*</span>
              </label>
              <input 
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
                07. 연락처 <span className="text-red-500">*</span>
              </label>
              <input 
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
                className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
                08. 이메일 <span className="text-red-500">*</span>
              </label>
              <input 
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors"
              />
            </div>
          </div>

          {/* 9. 추가 요청사항 */}
          <div className="group">
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
              09. 추가 요청사항
            </label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="기타 문의사항이나 특별한 요청이 있다면 자유롭게 적어주세요."
              className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-lg transition-colors placeholder:text-gray-700 resize-none"
            />
          </div>

          {/* 10. 비밀번호 */}
          <div className="group bg-white/5 p-6 rounded-lg border border-white/10">
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
              10. 열람 비밀번호 <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-4">글 확인시 필요합니다. 꼭 기억해주세요. (숫자 4자리 권장)</p>
            <input 
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              maxLength={4}
              placeholder="****"
              className="w-full max-w-[200px] bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-2xl tracking-[0.5em] transition-colors placeholder:text-gray-700 font-mono"
            />
          </div>

          <div className="pt-8">
            <button 
              type="submit"
              disabled={isSubmitting || formData.genres.length === 0}
              className="w-full bg-white text-black py-4 rounded font-display font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Transmitting...' : '문의 접수하기'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
