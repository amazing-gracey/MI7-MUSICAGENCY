import { motion } from 'motion/react';
import { Shield, Target, Zap, ArrowRight, Spade, Heart, Club, Diamond, Briefcase, FileCheck, Camera, Users, Scale, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-32 px-4 flex flex-col items-center justify-center text-center min-h-[80vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://archive.org/download/gemini-generated-image-wad-61wad-61wad-61w/Gemini_Generated_Image_wad61wad61wad61w.png" 
            alt="MI7 Headquarters" 
            className="w-full h-full object-cover opacity-20 grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center w-full text-center"
        >
          <div className="inline-block border border-[#39ff14]/50 bg-[#39ff14]/10 px-4 py-1 mb-8">
            <span className="text-[#39ff14] font-mono text-sm tracking-[0.3em] uppercase">B2B Music Agency & Artist Crew</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-8 glitch-intense" data-text="MI7 music AGENCY">
            MI7 music AGENCY
          </h1>
          <p className="text-gray-300 font-mono text-lg md:text-xl tracking-widest leading-relaxed">
            <span className="italic text-white">"혼자서는 세상을 바꿀 수 없지만, 작은 힘들이 모이면 거대한 파동이 됩니다."</span><br /><br />
            우리는 단순한 그림자가 아닙니다.<br />
            아티스트라는 빛을 증폭시켜 음악으로 세상을 구원하는 위대한 조력자,<br />
            <span className="text-[#39ff14] font-bold">MI7 (Secret Music Agents)</span> 입니다.
          </p>
        </motion.div>
      </section>

      {/* 2. Identity Section */}
      <section className="py-24 px-4 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-[#39ff14]/20 bg-[#39ff14]/5 transform -skew-x-3 z-0" />
              <img 
                src="https://archive.org/download/gemini-generated-image-wad-61wad-61wad-61w/Gemini_Generated_Image_wad61wad61wad61w.png" 
                alt="Secret Agent" 
                className="relative z-10 w-full h-[600px] object-cover grayscale contrast-125 hover:contrast-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-sm border border-[#39ff14]/30 p-4 font-mono text-xs text-[#39ff14]">
                FILE: AGENT_ORIGIN.DAT<br/>
                STATUS: VERIFIED
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-8 border-l-4 border-[#39ff14] pl-6">
                IDENTITY
              </h2>
              <div className="space-y-8 text-gray-400 font-light text-lg leading-relaxed">
                <p>
                  MI7은 단순한 엔터테인먼트 회사가 아닙니다. 우리는 이벤트 기획사와 대행사를 위한 <strong className="text-white font-medium">최적의 음악 공연 기획 파트너</strong>이자, 실력 있는 뮤지션들을 보호하고 연결하는 <strong className="text-[#39ff14] font-medium">프리미엄 아티스트 에이전시(크루)</strong>입니다.
                </p>
                <p>
                  음악이라는 무기로 세상을 구원하기 위해, 우리는 기꺼이 가장 강력한 조력자가 됩니다. 수많은 아티스트 요원들이 각자의 재능을 결합하여, 행사의 목적과 예산에 맞는 <strong className="text-white font-medium">다양한 형태의 유닛(Unit)</strong>으로 투입될 준비를 마쳤습니다.
                </p>
                <p>
                  클라이언트에게는 가장 확실한 타격(성공적인 공연 기획)을, 아티스트에게는 세상을 바꿀 수 있는 가장 안전한 베이스캠프(법적 보호 및 수익 창출)를 약속합니다.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-6 font-mono text-sm">
                <div className="border border-white/10 p-4 bg-white/5">
                  <div className="text-[#39ff14] mb-2">ESTABLISHED</div>
                  <div className="text-white text-xl">2025</div>
                </div>
                <div className="border border-white/10 p-4 bg-white/5">
                  <div className="text-[#39ff14] mb-2">OPERATIONS</div>
                  <div className="text-white text-xl">B2B & B2C</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Client Protocol (B2B Benefits) */}
      <section className="py-32 px-4 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-4 text-white">
              CLIENT PROTOCOL
            </h2>
            <p className="text-[#ff2a2a] font-mono tracking-widest uppercase">기업 및 기획사 제휴 혜택 (B2B)</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#ff2a2a]/5 to-transparent relative overflow-hidden"
            >
              <Target className="absolute -right-4 -bottom-4 w-48 h-48 text-[#ff2a2a]/5" />
              <div className="relative z-10">
                <Target className="w-10 h-10 text-[#ff2a2a] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">맞춤형 공연 기획</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  해당 행사 기획 및 예산에 알맞은 최적의 음악 공연 기획 서비스를 제공합니다. 타겟과 목적을 정확히 분석하여 실패 없는 무대를 설계합니다.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#ff2a2a]/5 to-transparent relative overflow-hidden"
            >
              <Users className="absolute -right-4 -bottom-4 w-48 h-48 text-[#ff2a2a]/5" />
              <div className="relative z-10">
                <Users className="w-10 h-10 text-[#ff2a2a] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">다목적 유닛 배치</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  각 기획에 맞는 다양한 장르의 뮤지션들을 제공합니다. 다수의 아티스트들이 행사의 성격에 맞춰 여러 형태의 유닛으로 투입 가능합니다.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#ff2a2a]/5 to-transparent relative overflow-hidden"
            >
              <Briefcase className="absolute -right-4 -bottom-4 w-48 h-48 text-[#ff2a2a]/5" />
              <div className="relative z-10">
                <Briefcase className="w-10 h-10 text-[#ff2a2a] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">안전한 B2B 계약</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  개인 아티스트와의 불안정한 거래가 아닌, 회사 대 회사(B2B)의 안전한 사업자 계약을 체결합니다. 세금 계산서 발행 및 부가세 문제를 완벽히 해결합니다.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#ff2a2a]/5 to-transparent relative overflow-hidden"
            >
              <Camera className="absolute -right-4 -bottom-4 w-48 h-48 text-[#ff2a2a]/5" />
              <div className="relative z-10">
                <Camera className="w-10 h-10 text-[#ff2a2a] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">완벽한 증빙 자료</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  행사 종료 후 결과 보고 및 홍보에 필요한 고품질 사진, 영상 및 각종 행정 증빙 자료 일체를 깔끔하게 제공합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Agent Protocol (Artist Benefits) */}
      <section className="py-32 px-4 bg-black border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-4">
              AGENT PROTOCOL
            </h2>
            <p className="text-[#39ff14] font-mono tracking-widest uppercase">소속 아티스트(크루) 합류 혜택</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#39ff14]/5 to-transparent relative overflow-hidden"
            >
              <Shield className="absolute -right-4 -bottom-4 w-48 h-48 text-[#39ff14]/5" />
              <div className="relative z-10">
                <Scale className="w-10 h-10 text-[#39ff14] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">강력한 법적 보호망 (Legal Shield)</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  에이전시에 속한 아티스트로서 회사의 철저한 보호를 받습니다. 불공정 계약, 임금 체불, 저작권 침해 등 외부의 위협으로부터 아티스트를 보호하는 법률 방어 시스템을 가동하여 안전한 활동을 보장합니다.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#39ff14]/5 to-transparent relative overflow-hidden"
            >
              <TrendingUp className="absolute -right-4 -bottom-4 w-48 h-48 text-[#39ff14]/5" />
              <div className="relative z-10">
                <Zap className="w-10 h-10 text-[#39ff14] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">지속적인 수익 창출 (Operation Deployment)</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  MI7의 탄탄한 B2B 네트워크를 통해 각종 기업 행사, 축제, 기획 공연에 우선적으로 소개됩니다. 정식 계약을 통해 안정적이고 다양한 수입 활동을 영위하며, 아티스트로서의 커리어를 확장할 수 있습니다.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#39ff14]/5 to-transparent relative overflow-hidden"
            >
              <FileCheck className="absolute -right-4 -bottom-4 w-48 h-48 text-[#39ff14]/5" />
              <div className="relative z-10">
                <Club className="w-10 h-10 text-[#39ff14] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">행정 및 실무 지원 (Covert Support)</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  복잡한 세금 처리, 클라이언트와의 협상, 일정 조율 등은 본부가 전담합니다. 아티스트는 오직 '음악'과 '무대'에만 집중할 수 있도록 보이지 않는 곳에서 완벽하게 백업합니다.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#39ff14]/5 to-transparent relative overflow-hidden"
            >
              <Heart className="absolute -right-4 -bottom-4 w-48 h-48 text-[#39ff14]/5" />
              <div className="relative z-10">
                <Spade className="w-10 h-10 text-[#39ff14] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-wider">네트워크 및 시너지 (Crew Synergy)</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  검증된 MI7 소속 요원(뮤지션)들과의 교류를 통해 음악적 영감을 나눕니다. 솔로 활동뿐만 아니라, 다른 아티스트들과 새로운 형태의 유닛 프로젝트를 기획하고 실행할 수 있는 기회가 주어집니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="py-32 px-4 relative border-t border-white/10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest mb-8">
              CHOOSE YOUR PLAY
            </h2>
            <p className="text-gray-400 font-mono mb-12 text-lg">
              <span className="italic">"판을 뒤집을 패를 쥐고 있거나, 판을 벌릴 준비가 되었거나."</span><br />
              당신의 선택이 새로운 무대를 만듭니다.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/join" 
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-mono font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                <Spade size={18} className="text-black" />
                <span>요원 합류 (Join Crew)</span>
              </Link>
              <Link 
                to="/mission-request/new" 
                className="group relative inline-flex items-center justify-center gap-3 border border-white/30 bg-black text-white px-8 py-4 font-mono font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                <Diamond size={18} className="text-[#39ff14]" />
                <span>공연 섭외 문의 (Booking)</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
