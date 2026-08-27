import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DEFAULT_TRUSTPILOT = {
  title: 'Excellent',
  starRating: '4.5',
  subheading: 'We’ve helped over 10,000+ fraud victims already!',
  reviewCount: '780 reviews',
  reviewLink: 'https://www.trustpilot.com/review/averadao.com',
  buttonText: 'Are you a victim? Request a refund →'
};

const TrustpilotSection = () => {
  const [data, setData] = useState(DEFAULT_TRUSTPILOT);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrustpilotData();
    window.addEventListener('datastore:update', loadTrustpilotData);
    return () => window.removeEventListener('datastore:update', loadTrustpilotData);
  }, []);

  const loadTrustpilotData = async () => {
    try {
      const res = await axios.get('/api/settings/TRUSTPILOT_DATA');
      const val = res.data?.data?.value;
      if (val && typeof val === 'object') {
        setData({
          title: val.title || DEFAULT_TRUSTPILOT.title,
          starRating: val.starRating || DEFAULT_TRUSTPILOT.starRating,
          subheading: val.subheading || DEFAULT_TRUSTPILOT.subheading,
          reviewCount: val.reviewCount || DEFAULT_TRUSTPILOT.reviewCount,
          reviewLink: val.reviewLink || DEFAULT_TRUSTPILOT.reviewLink,
          buttonText: val.buttonText || DEFAULT_TRUSTPILOT.buttonText
        });
      }
    } catch (_) {}
  };

  const handleAction = () => {
    const ref = localStorage.getItem('landingReferralCode');
    navigate(ref ? `/join-notice?ref=${encodeURIComponent(ref)}` : '/join-notice');
  };

  const renderStars = () => {
    const numericRating = parseFloat(data.starRating || 4.5);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (numericRating >= i) {
        stars.push(
          <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 flex items-center justify-center rounded-sm shadow-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      } else if (numericRating >= i - 0.5) {
        stars.push(
          <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 relative overflow-hidden rounded-sm shadow-sm">
            <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 flex items-center justify-center rounded-sm shadow-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white/40" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      }
    }
    return stars;
  };

  return (
    <section className="w-full bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-7 relative z-10">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-gray-900"
        >
          Rated <span className="text-blue-600">{data.title || 'Excellent'}</span> on Trustpilot.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-xl"
        >
          {data.subheading}
        </motion.p>

        {/* Navy Blue Trustpilot Rating Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center space-y-3.5 shadow-2xl max-w-sm w-full transition-all"
          style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #0f172a 60%, #1e293b 100%)',
            border: '2px solid rgba(59, 130, 246, 0.35)',
            boxShadow: '0 20px 40px rgba(10, 22, 40, 0.4)'
          }}
        >
          {/* Rating Title */}
          <div className="text-xl sm:text-2xl font-bold tracking-wide text-white">
            {data.title}
          </div>

          {/* 5 Stars Graphic */}
          <div className="flex items-center space-x-1.5">
            {renderStars()}
          </div>

          {/* Review Link */}
          <div className="text-sm sm:text-base text-gray-300 font-medium pt-1">
            Based on{' '}
            <a
              href={data.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-white hover:text-blue-400 transition-colors cursor-pointer"
            >
              {data.reviewCount}
            </a>
          </div>

          {/* Trustpilot Brand Logo */}
          <a
            href={data.reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 pt-1.5 group cursor-pointer"
          >
            <svg className="w-5 h-5 text-blue-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Trustpilot
            </span>
          </a>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2 w-full max-w-sm"
        >
          <button
            onClick={handleAction}
            className="w-full py-4 px-6 rounded-2xl text-white font-extrabold text-base sm:text-lg shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)',
              border: '1px solid rgba(147, 197, 253, 0.4)',
              boxShadow: '0 8px 25px rgba(29, 78, 216, 0.35)'
            }}
          >
            {data.buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustpilotSection;