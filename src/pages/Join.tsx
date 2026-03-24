import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Plus, ChevronDown, ChevronUp, X } from 'lucide-react';

const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with actual URL

interface ApplicationForm {
  field: string;
  fieldDetail: string;
  nameKo: string;
  nameEn: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
  email: string;
  genres: string[];
  experience: string;
  videoLink: string;
  intro: string;
  snsLink: string;
  password: string[];
}

const initialFormState: ApplicationForm = {
  field: '',
  fieldDetail: '',
  nameKo: '',
  nameEn: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  phone: '',
  email: '',
  genres: [],
  experience: '',
  videoLink: '',
  intro: '',
  snsLink: '',
  password: ['', '', '', '']
};

const GENRES = ['Jazz', 'Pop', 'R&B', 'K-pop', 'OST', 'Rock', 'Classical', '기타'];

const FAQS = [
  { q: "지원 자격이 있나요?", a: "별도 자격 제한 없이 누구나 지원 가능합니다.\n단, 실제 공연 활동이 가능한 분을 우대합니다." },
  { q: "합격하면 어떻게 되나요?", a: "MI7 전속 에이전트로 등록되어 공연 섭외 및\n매니지먼트 서비스를 받게 됩니다." },
  { q: "계약 조건은 어떻게 되나요?", a: "합격 후 개별 상담을 통해 계약 조건을 협의합니다.\n모든 계약은 표준 계약서로 진행됩니다." },
  { q: "결과는 언제 알 수 있나요?", a: "지원 후 2주 이내에 개별 연락드립니다." },
  { q: "지원 영상은 어떻게 준비하나요?", a: "YouTube 또는 Instagram에 업로드된 본인의\n연주 또는 보컬 영상 링크를 첨부해주세요.\n비공개 영상도 가능합니다." }
];

export default function Join() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [applications, setApplications] = useState([
    { id: 'MI7-APP-20250301-001', field: '보컬', date: '2025.03.01' },
    { id: 'MI7-APP-20250302-002', field: '악기', date: '2025.03.02' },
  ]);

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handlePasswordChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newPassword = [...formData.password];
    newPassword[index] = value;
    setFormData(prev => ({ ...prev, password: newPassword }));

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pwd-${index + 1}`);
      nextInput?.focus();
    }
  };

  const generateFileNo = () => {
    const date = new Date();
    const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `MI7-APP-${yyyymmdd}-${randomNum}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fileNo = generateFileNo();
    const submissionData = {
      ...formData,
      fileNo,
      password: formData.password.join(''),
      genres: formData.genres.join(', '),
      timestamp: new Date().toISOString()
    };

    try {
      // In a real scenario, uncomment this to send to Google Apps Script
      /*
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      */
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setApplications(prev => [
        { id: fileNo, field: formData.field, date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1) },
        ...prev
      ]);

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
        setFormData(initialFormState);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppClick = (id: string) => {
    setSelectedAppId(id);
    setShowPasswordModal(true);
    setPasswordInput('');
    setPasswordError(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'MI7ADMIN') {
      alert('관리자 권한으로 열람합니다. (데모)');
      setShowPasswordModal(false);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-6 glitch-intense" data-text="MI7 AGENT AUDITION">
            MI7 AGENT AUDITION
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-lg tracking-widest uppercase">
            MI7과 함께 미션을 수행할 에이전트를 모집합니다
          </p>
        </motion.div>
      </section>

      {/* 2. ABOUT MI7 Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest mb-12 border-l-4 border-red-500 pl-4"
          >
            ABOUT MI7
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "공연 연결", desc: "공연이 필요한 고객과 최적의 아티스트를 매칭해드립니다" },
              { title: "홍보 & 매니지먼트", desc: "아티스트의 활동을 기획하고 브랜딩을 함께 만들어갑니다" },
              { title: "법적 보호 시스템", desc: "계약서 제공 및 계약 대행으로 아티스트가 안전하게 활동할 수 있는 환경을 보장합니다" },
              { title: "전문 네트워크", desc: "검증된 공연 기획사, 행사 업체와의 네트워크로 더 많은 기회를 연결합니다" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/10 bg-black/50 hover:bg-white/5 transition-colors group"
              >
                <h3 className="text-xl font-bold mb-4 text-red-500 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RECRUIT FIELDS Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest mb-12 border-l-4 border-red-500 pl-4"
          >
            RECRUIT FIELDS
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-10 border border-white/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 text-white/10 font-mono text-6xl font-black">01</div>
              <h3 className="text-2xl font-display font-bold mb-4 tracking-wider">VOCAL AGENT</h3>
              <p className="text-gray-400 font-mono text-sm leading-loose">
                보컬리스트<br/>
                Jazz · Pop · R&B · K-pop · OST 등
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-10 border border-white/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 text-white/10 font-mono text-6xl font-black">02</div>
              <h3 className="text-2xl font-display font-bold mb-4 tracking-wider">INSTRUMENT AGENT</h3>
              <p className="text-gray-400 font-mono text-sm leading-loose">
                악기 세션<br/>
                Guitar · Keys · Bass · Drums 등
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. AGENT APPLICATION Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest border-l-4 border-red-500 pl-4"
            >
              AGENT APPLICATION
            </motion.h2>
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-mono text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                <Plus size={18} />
                지원하기
              </button>
            )}
            {showForm && (
              <button 
                onClick={() => setShowForm(false)}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded font-mono text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                목록으로
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div 
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/50 border border-white/10 rounded-lg overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-gray-400">
                        <th className="p-4 font-normal">File No.</th>
                        <th className="p-4 font-normal">Field</th>
                        <th className="p-4 font-normal">Date</th>
                        <th className="p-4 font-normal text-center">Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app, idx) => (
                        <tr 
                          key={app.id}
                          onClick={() => handleAppClick(app.id)}
                          className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group"
                        >
                          <td className="p-4 font-mono text-xs text-gray-500 group-hover:text-white transition-colors whitespace-nowrap">
                            {app.id}
                          </td>
                          <td className="p-4 font-medium text-gray-300 group-hover:text-white transition-colors">
                            {app.field} 지원
                          </td>
                          <td className="p-4 font-mono text-xs text-gray-500">
                            {app.date}
                          </td>
                          <td className="p-4 text-center text-gray-600 group-hover:text-red-500 transition-colors">
                            <Lock size={16} className="mx-auto" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/50 border border-white/10 p-6 md:p-12 rounded-lg"
              >
                {submitSuccess ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">지원이 완료되었습니다</h3>
                    <p className="text-gray-400">검토 후 2주 이내에 개별 연락드리겠습니다.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    {/* 1. 지원 분야 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">① 지원 분야 *</label>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="field" value="보컬" required className="accent-red-500 w-4 h-4" 
                            onChange={(e) => setFormData({...formData, field: e.target.value})} />
                          <span>보컬</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="field" value="악기" required className="accent-red-500 w-4 h-4"
                            onChange={(e) => setFormData({...formData, field: e.target.value})} />
                          <span>악기</span>
                        </label>
                      </div>
                      <input 
                        type="text" 
                        required
                        placeholder="세부 분야 예) Jazz Vocal / 재즈 기타 / 클래식 피아노" 
                        className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                        value={formData.fieldDetail}
                        onChange={(e) => setFormData({...formData, fieldDetail: e.target.value})}
                      />
                    </div>

                    {/* 2. 이름 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">② 이름 *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" required placeholder="한글명" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                          value={formData.nameKo} onChange={(e) => setFormData({...formData, nameKo: e.target.value})} />
                        <input type="text" required placeholder="영문명" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                          value={formData.nameEn} onChange={(e) => setFormData({...formData, nameEn: e.target.value})} />
                      </div>
                    </div>

                    {/* 3. 생년월일 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">③ 생년월일 *</label>
                      <div className="grid grid-cols-3 gap-4">
                        <input type="number" required placeholder="YYYY" min="1900" max="2026" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                          value={formData.birthYear} onChange={(e) => setFormData({...formData, birthYear: e.target.value})} />
                        <select required className="w-full bg-black border-b border-white/20 py-2 outline-none focus:border-white transition-colors text-white"
                          value={formData.birthMonth} onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}>
                          <option value="" disabled>MM</option>
                          {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                            <option key={m} value={m.toString().padStart(2, '0')}>{m.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select required className="w-full bg-black border-b border-white/20 py-2 outline-none focus:border-white transition-colors text-white"
                          value={formData.birthDay} onChange={(e) => setFormData({...formData, birthDay: e.target.value})}>
                          <option value="" disabled>DD</option>
                          {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                            <option key={d} value={d.toString().padStart(2, '0')}>{d.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 4. 연락처 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">④ 연락처 *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="tel" required placeholder="전화번호 (010-0000-0000)" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                          value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                        <input type="email" required placeholder="이메일" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>

                    {/* 5. 주요 장르 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">⑤ 주요 장르 *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {GENRES.map(genre => (
                          <label key={genre} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-red-500 w-4 h-4"
                              checked={formData.genres.includes(genre)}
                              onChange={() => handleGenreToggle(genre)}
                            />
                            <span>{genre}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 6. 경력사항 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">⑥ 경력사항</label>
                      <textarea rows={4} placeholder="주요 공연, 활동 이력을 입력해주세요" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors resize-none"
                        value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}></textarea>
                    </div>

                    {/* 7. 지원 영상 링크 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">⑦ 지원 영상 링크 *</label>
                      <input type="url" required placeholder="YouTube 또는 Instagram 링크 (본인 연주/보컬 영상 필수)" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                        value={formData.videoLink} onChange={(e) => setFormData({...formData, videoLink: e.target.value})} />
                    </div>

                    {/* 8. 자기소개 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">⑧ 자기소개 *</label>
                      <textarea required rows={4} placeholder="MI7에 지원하는 이유, 활동 목표 등을 자유롭게 작성해주세요" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors resize-none"
                        value={formData.intro} onChange={(e) => setFormData({...formData, intro: e.target.value})}></textarea>
                    </div>

                    {/* 9. SNS / 포트폴리오 링크 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">⑨ SNS / 포트폴리오 링크 (선택)</label>
                      <input type="text" placeholder="Instagram, YouTube 채널 등" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors"
                        value={formData.snsLink} onChange={(e) => setFormData({...formData, snsLink: e.target.value})} />
                    </div>

                    {/* 10. 비밀번호 */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-4">⑩ 비밀번호 *</label>
                      <div className="flex gap-4 mb-2">
                        {[0, 1, 2, 3].map((idx) => (
                          <input 
                            key={idx}
                            id={`pwd-${idx}`}
                            type="password" 
                            inputMode="numeric"
                            required
                            maxLength={1}
                            className="w-12 h-12 text-center text-xl bg-transparent border-b-2 border-white/20 outline-none focus:border-white transition-colors"
                            value={formData.password[idx]}
                            onChange={(e) => handlePasswordChange(idx, e.target.value)}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">지원서 확인시 필요합니다. 꼭 기억해주세요.</p>
                    </div>

                    <div className="pt-8 text-center">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'MI7 AGENT 지원하기'}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest mb-12 border-l-4 border-red-500 pl-4"
          >
            FAQ
          </motion.h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border border-white/10 bg-white/5 rounded-lg overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold pr-8">Q. {faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-400 whitespace-pre-line leading-relaxed"
                    >
                      A. {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-lg max-w-sm w-full relative"
            >
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-display font-bold mb-2">보안 인증</h3>
              <p className="text-sm text-gray-400 mb-6 font-mono">{selectedAppId}</p>
              
              <form onSubmit={handlePasswordSubmit}>
                <input 
                  type="password" 
                  placeholder="비밀번호 4자리" 
                  className="w-full bg-black border border-white/20 p-3 rounded outline-none focus:border-red-500 transition-colors mb-4 text-center tracking-widest"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mb-4 text-center">비밀번호가 올바르지 않습니다.</p>
                )}
                <button 
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  열람하기
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
