import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, TrendingUp, DollarSign, Shield, BarChart3 } from 'lucide-react';
import StaticResourceCard from '../components/StaticResourceCard';
import { STATIC_FEATURED_RESOURCES } from '../data/staticFeaturedResources';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const joinNoticeHref = (() => {
    try {
      const ref = localStorage.getItem('landingReferralCode');
      return ref ? `/join-notice?ref=${encodeURIComponent(ref)}` : '/join-notice';
    } catch { return '/join-notice'; }
  })();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const ref = params.get('ref');
      if (ref) {
        localStorage.setItem('landingReferralCode', ref);
      }
    } catch {}
  }, [location.search]);

  const features = [
    {
      icon: DollarSign,
      title: 'Secure Distribution',
      description: 'Help ensure recovered funds are securely distributed to verified victims through a transparent, structured recovery process.'
    },
    {
      icon: BarChart3,
      title: 'Victim & Recovery Stats',
      description: 'View key statistics on verified victims, recovered funds, and active refund programs.'
    },
    {
      icon: TrendingUp,
      title: 'Recovery Program Tracker',
      description: 'Track active refund programs, recovery milestones, and the distribution of recovered funds.'
    },
    {
      icon: Vote,
      title: 'Transparent Voting',
      description: 'Participate in transparent voting to provide feedback on recovery campaigns and fund distribution, helping improve future efforts and promote accountability, with voting results displayed in real time.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Veritas */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#085464] via-[#05323c] to-[#02141a] py-12 md:py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated blockchain background across entire hero */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="bgTealGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00A4E4" />
                <stop offset="100%" stopColor="#00C2FF" />
              </linearGradient>
              <radialGradient id="nodeGlowHalo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>


            {Array.from({ length: 120 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={(i * 73) % 1200}
                cy={((i * 137) % 400)}
                r={(i % 7) * 0.6 + 0.4}
                fill="#7dd3fc"
                initial={{ opacity: 0.12 }}
                animate={{ opacity: [0.12, 0.5, 0.12] }}
                transition={{ duration: 2 + (i % 5) * 0.4, repeat: Infinity }}
              />
            ))}
            {(() => {
              const centerX = 600;
              const ys = [340,300,260,220,180,140,100];
              const makeLeft = (y) => `M 0 ${y} C 220 ${y-90}, 440 ${Math.min(y+30,395)}, ${centerX} ${Math.min(y-10,395)}`;
              const makeRight = (y) => `M 1200 ${Math.max(y-20,5)} C 980 ${y-80}, 760 ${Math.min(y+20,395)}, ${centerX} ${Math.min(y-10,395)}`;
              return (
                <g>
                  {ys.map((y, i) => (
                    <motion.path key={`left-grow-${i}`} d={makeLeft(y)} fill="none" stroke="#ffffff"
                      strokeWidth={i < 2 ? 3 : i < 4 ? 2.8 : 2.5} strokeOpacity={i < 2 ? 0.22 : 0.18}
                      strokeLinecap="round" strokeDasharray={12 + i * 1.5 + " " + (20 + i * 2)}
                      initial={{ pathLength: 0, strokeDashoffset: 40 }}
                      animate={{ pathLength: 1, strokeDashoffset: [40, 0, 40] }}
                      transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                  ))}
                  {ys.map((y, i) => (
                    <motion.path key={`right-grow-${i}`} d={makeRight(y)} fill="none" stroke="#ffffff"
                      strokeWidth={i < 2 ? 3 : i < 4 ? 2.8 : 2.5} strokeOpacity={i < 2 ? 0.22 : 0.18}
                      strokeLinecap="round" strokeDasharray={12 + i * 1.5 + " " + (20 + i * 2)}
                      initial={{ pathLength: 0, strokeDashoffset: 40 }}
                      animate={{ pathLength: 1, strokeDashoffset: [40, 0, 40] }}
                      transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                  ))}
                </g>
              );
            })()}
            {/* Nodes without outer halo; crisp glow via bright core and stroke */}
            <g>
              {(() => {
                const points = [
                  // lower arcs
                  [120,320],[240,330],[360,340],[480,330],[600,300],[720,285],[840,290],[960,295],[1080,290],
                  [140,290],[260,305],[380,315],[500,305],[620,275],[740,260],[860,265],[980,270],[1100,265],
                  // mid arcs
                  [160,260],[280,275],[400,285],[520,275],[640,250],[760,235],[880,240],[1000,245],[1120,240],
                  // upper arcs
                  [180,220],[300,235],[420,245],[540,235],[660,210],[780,200],[900,205],[1020,210],[1140,205],
                  [200,185],[320,200],[440,210],[560,200],[680,180],[800,170],[920,175],[1040,180],[1160,175]
                ];
                // add extra nodes for top-most chains
                points.push(
                  // high arcs around y ~ 160
                  [180,160],[300,165],[420,170],[540,165],[660,150],[780,140],[900,145],[1020,150],[1140,145],
                  // very top arcs around y ~ 120
                  [200,120],[320,130],[440,135],[560,130],[680,115],[800,105],[920,110],[1040,115],[1160,110]
                );
                // derive center meeting nodes for all arc rows
                const centerX = 600;
                const ys = [380,340,300,260,220,180,140,100,60];
                const centers = ys.map((y) => [centerX, Math.min(y - 10, 395)]);
                return (
                  <g>
                    {points.map(([x,y], i) => (
                      <g key={`web-node-${i}`}>
                        <motion.circle
                          cx={x} cy={y}
                          r={i % 10 === 0 ? 2.6 : 2}
                          fill="url(#bgTealGrad)"
                          stroke="#ffffff"
                          strokeWidth="0.6"
                          strokeOpacity="0.5"
                          initial={{ opacity: 0.3, scale: 0.98 }}
                          animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.98, 1.04, 0.98] }}
                          transition={{ duration: 1.6 + (i % 6) * 0.2, repeat: Infinity }}
                        />
                        <circle cx={x} cy={y} r="0.8" fill="#ffffff" fillOpacity="0.9" />
                        {/* subtle radial glow halo (no blur, no shadow) */}
                        <motion.circle
                          cx={x} cy={y}
                          r={i % 10 === 0 ? 14 : 12}
                          fill="url(#nodeGlowHalo)"
                          initial={{ opacity: 0.15 }}
                          animate={{ opacity: [0.15, 0.6, 0.28, 0.6, 0.15] }}
                          transition={{ duration: 2.2 + (i % 6) * 0.2, repeat: Infinity }}
                        />
                        {/* joining ripple to imply repair */}
                        <motion.circle
                          cx={x} cy={y}
                          r={9}
                          fill="none"
                          stroke="#93c5fd"
                          strokeWidth="1.2"
                          strokeOpacity="0.35"
                          initial={{ opacity: 0.0, scale: 0.9 }}
                          animate={{ opacity: [0.0, 0.35, 0.0], scale: [0.9, 1.25, 0.9] }}
                          transition={{ duration: 1.8 + (i % 4) * 0.2, repeat: Infinity }}
                        />
                      </g>
                    ))}

                    {/* special meeting nodes with stronger timed glow */}
                    {centers.map(([x,y], i) => (
                      <g key={`center-node-${i}`}>
                        <motion.circle
                          cx={x} cy={y}
                          r={3.2}
                          fill="url(#bgTealGrad)"
                          stroke="#ffffff"
                          strokeWidth="0.8"
                          strokeOpacity="0.6"
                          initial={{ opacity: 0.45, scale: 1.0 }}
                          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1.0, 1.18, 1.0] }}
                          transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, repeatType: "mirror" }}
                        />
                        <circle cx={x} cy={y} r="1.0" fill="#ffffff" fillOpacity="0.95" />
                        {/* stronger radial glow halo for meeting nodes */}
                        <motion.circle
                          cx={x} cy={y}
                          r={18}
                          fill="url(#nodeGlowHalo)"
                          initial={{ opacity: 0.18 }}
                          animate={{ opacity: [0.18, 0.7, 0.35, 0.7, 0.18] }}
                          transition={{ duration: 3.4 + i * 0.2, repeat: Infinity, repeatType: "mirror" }}
                        />
                        {/* burst ring at the moment of meeting */}
                        <motion.circle
                          cx={x} cy={y}
                          r={12}
                          fill="none"
                          stroke="#93c5fd"
                          strokeWidth="1.6"
                          strokeOpacity="0.6"
                          initial={{ opacity: 0.0, scale: 0.8 }}
                          animate={{ opacity: [0.0, 0.7, 0.0], scale: [0.8, 1.5, 0.8] }}
                          transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                        />
                      </g>
                    ))}
                  </g>
                );
              })()}
            </g>

          </svg>
        </div>
        <div className="relative z-10 w-full px-10 md:px-14 lg:px-16 pt-6 md:pt-10 pb-16 flex-1 flex flex-col justify-start md:justify-center">
          <div className="max-w-3xl space-y-5 md:space-y-6 -mt-4 md:-mt-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                Veritas
              </h1>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              Driven by Truth. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-200 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                Returning What's Yours
              </span>
            </h2>

            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/60 border border-amber-400/30 text-amber-300 text-sm md:text-base font-semibold shadow-inner backdrop-blur-sm">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                </span>
                We've helped over <span className="font-bold text-white">10,000+</span> fraud victims already!
              </div>
            </div>

            <p className="text-base md:text-xl text-slate-200/90 leading-relaxed max-w-2xl font-normal">
              Veritas helps government agencies securely return cryptocurrency recovered from fraud, financial crimes, and illegal business practices to verified victims through on-chain Proof-of-Loss tokens (RFND), granting eligible victims access to a private liquidity pool for refunds.
            </p>

            <div className="pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const ref = localStorage.getItem('landingReferralCode');
                  navigate(ref ? `/join-notice?ref=${encodeURIComponent(ref)}` : '/join-notice');
                }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 text-slate-950 text-base md:text-lg font-extrabold shadow-xl shadow-emerald-950/60 hover:shadow-emerald-400/30 border border-emerald-300/40 transition-all cursor-pointer"
              >
                Are you a victim? Request a refund →
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured resources */}
      <section className="w-full overflow-x-hidden pt-4 pb-12 bg-gray-50">
        <div className="w-full min-w-0 mobile-padding">
          <div className="mb-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2 text-3xl font-extrabold text-gray-900 md:text-4xl tracking-tight"
            >
              Recovery resources and guides
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-5xl text-base md:text-lg text-gray-600"
            >
              Scam alerts, Veritas refund programs, and an overview of how we help eligible victims recover funds.
            </motion.p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-8 md:grid-cols-3 md:justify-items-stretch md:gap-8">
            {STATIC_FEATURED_RESOURCES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full max-w-[380px] md:max-w-none"
              >
                <StaticResourceCard
                  to={item.path}
                  title={item.title}
                  description={item.description}
                  iconSrc={item.iconSrc}
                  iconAlt={item.iconAlt}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full pt-10 pb-16 bg-white">
        <div className="w-full mobile-padding">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              How Veritas Helps
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Verify eligible victims, issue on-chain Proof-of-Loss tokens, and facilitate the secure distribution of recovered funds.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6 text-center hover:scale-105 transition-transform duration-300 w-full"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00A4E4] to-[#00C2FF] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-950/40">
                    <Icon size={32} className="text-white" />
                  </div>


                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigate Alone CTA Section */}
      <section className="w-full py-16 bg-gradient-to-br from-[#085464] via-[#05323c] to-[#02141a] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-950/20 pointer-events-none" />
        <div className="w-full mobile-padding max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            You Don’t Have to Navigate This Alone
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto space-y-3"
          >
            <p>
              If you’ve lost funds to a scam or need help understanding the recovery process, reach out to Veritas.
            </p>
            <p>
              Tell us what happened, ask your questions, and learn more about the options available to you.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-extrabold text-base md:text-lg hover:from-emerald-300 hover:to-teal-200 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:-translate-y-0.5"
            >
              Talk to Veritas
            </Link>
          </motion.div>
        </div>
      </section>
    </div>


  );
};

export default Home;
