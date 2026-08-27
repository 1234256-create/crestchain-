import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, TrendingUp, DollarSign, BarChart3, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import StaticResourceCard from '../components/StaticResourceCard';
import { STATIC_FEATURED_RESOURCES } from '../data/staticFeaturedResources';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 120) * 0.25;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />;
};

const AnimatedStat = ({ value, label }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
    <div className="text-3xl md:text-4xl font-black text-white"><span className="text-blue-400">{value}</span></div>
    <div className="text-blue-200/70 text-sm mt-1 font-medium">{label}</div>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const ref = params.get('ref');
      if (ref) localStorage.setItem('landingReferralCode', ref);
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
      description: 'Participate in transparent voting to provide feedback on recovery campaigns and fund distribution, helping improve future efforts and promote accountability.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Fraud Victims Helped' },
    { value: '$4.2M', label: 'Funds Recovered' },
    { value: '98%', label: 'Verification Rate' },
    { value: '47', label: 'Active Programs' }
  ];

  const highlights = [
    'On-chain Proof-of-Loss tokens (RFND)',
    'Decentralized governance & voting',
    'Government-grade verification',
    'Transparent fund distribution'
  ];

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Centered Animated Hero Section */}
      <section
        className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-hidden py-16 md:py-24"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f172a 40%, #172554 70%, #0a1628 100%)' }}
      >
        <ParticleCanvas />

        {/* Ambient radial glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(29, 78, 216, 0.22) 0%, transparent 70%)' }} />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)' }} />

        {/* Floating animated subtle squares */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-2xl border"
              style={{
                width: 45 + i * 14,
                height: 45 + i * 14,
                left: `${8 + i * 16}%`,
                top: `${12 + (i % 3) * 28}%`,
                borderColor: 'rgba(59, 130, 246, 0.16)',
                background: 'rgba(30, 58, 138, 0.05)'
              }}
              animate={{ y: [0, -22, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4.5 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* Centered Content Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center space-y-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-inner"
            style={{ background: 'rgba(30, 58, 138, 0.45)', border: '1px solid rgba(96, 165, 250, 0.35)', color: '#93c5fd' }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-400 inline" />
            Decentralized Recovery Protocol · DAO Powered
          </motion.div>

          {/* Main Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
              Avera<span style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 50%, #dbeafe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dao</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-100 leading-snug"
          >
            Driven by Truth.{' '}
            <span style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Returning What's Yours.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-blue-200/80 leading-relaxed max-w-2xl font-normal"
          >
            Averadao helps government agencies securely return cryptocurrency recovered from fraud, financial crimes, and illegal business practices to verified victims through on-chain Proof-of-Loss tokens (RFND).
          </motion.p>

          {/* Highlight Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 max-w-3xl pt-1"
          >
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-blue-200/90 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const ref = localStorage.getItem('landingReferralCode');
                navigate(ref ? `/join-notice?ref=${encodeURIComponent(ref)}` : '/join-notice');
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-extrabold text-white text-base sm:text-lg shadow-xl cursor-pointer transition-all"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)',
                border: '1px solid rgba(147, 197, 253, 0.4)',
                boxShadow: '0 10px 25px rgba(29, 78, 216, 0.45)'
              }}
            >
              Request a Refund
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-blue-200 text-base sm:text-lg transition-all"
                style={{
                  background: 'rgba(30, 58, 138, 0.3)',
                  border: '1px solid rgba(96, 165, 250, 0.35)'
                }}
              >
                Talk to Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row at bottom of Hero */}
        <div
          className="relative z-10 w-full mt-14 border-t"
          style={{ borderColor: 'rgba(59, 130, 246, 0.15)', background: 'rgba(10, 22, 40, 0.65)', backdropFilter: 'blur(10px)' }}
        >
          <div className="max-w-5xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Resources Section */}
      <section className="w-full overflow-x-hidden pt-6 pb-14 bg-gray-50">
        <div className="w-full min-w-0 mobile-padding">
          <div className="mb-10 text-center">
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
              className="mx-auto max-w-3xl text-base md:text-lg text-gray-600"
            >
              Scam alerts, Averadao refund programs, and an overview of how we help eligible victims recover funds.
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

      {/* How Averadao Helps Section */}
      <section className="w-full pt-12 pb-16 bg-white">
        <div className="w-full mobile-padding">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              How Averadao Helps
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
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/25"
                    style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Navy CTA Section */}
      <section
        className="w-full py-16 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f172a 50%, #172554 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(29, 78, 216, 0.18) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)' }} />
        </div>
        <div className="w-full mobile-padding max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            You Don't Have to Navigate This Alone
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-blue-200/85 leading-relaxed max-w-2xl mx-auto space-y-3"
          >
            <p>If you've lost funds to a scam or need help understanding the recovery process, reach out to Averadao.</p>
            <p>Tell us what happened, ask your questions, and learn more about the options available to you.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-extrabold text-white text-base md:text-lg transition-all duration-300 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                border: '1px solid rgba(147, 197, 253, 0.4)',
                boxShadow: '0 8px 25px rgba(29, 78, 216, 0.4)'
              }}
            >
              Talk to Averadao <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;