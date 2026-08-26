import React, { useState, useEffect } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import axios from 'axios';

const DEFAULT_PR_LINKS = [
  { id: '1', title: 'Yahoo Finance', url: 'https://finance.yahoo.com', logoUrl: 'https://img.icons8.com/color/144/yahoo.png', active: true },
  { id: '2', title: 'Bloomberg', url: 'https://www.bloomberg.com', logoUrl: 'https://img.icons8.com/color/144/bloomberg.png', active: true },
  { id: '3', title: 'CoinDesk', url: 'https://www.coindesk.com', logoUrl: 'https://img.icons8.com/color/144/bitcoin.png', active: true },
  { id: '4', title: 'Cointelegraph', url: 'https://cointelegraph.com', logoUrl: 'https://img.icons8.com/color/144/ethereum.png', active: true }
];

const PrCoverageSection = () => {
  const [prLinks, setPrLinks] = useState(DEFAULT_PR_LINKS);

  useEffect(() => {
    loadPrLinks();
    window.addEventListener('datastore:update', loadPrLinks);
    return () => window.removeEventListener('datastore:update', loadPrLinks);
  }, []);

  const loadPrLinks = async () => {
    try {
      const res = await axios.get('/api/settings/PR_LINKS');
      const val = res.data?.data?.value;
      if (Array.isArray(val) && val.length > 0) {
        setPrLinks(val.filter(item => item.active !== false));
      }
    } catch (_) {}
  };

  const activeLinks = prLinks.filter(item => item.active !== false);
  if (activeLinks.length === 0) return null;

  return (
    <section className="w-full bg-white border-y border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-5 tracking-tight">
          As Seen On
        </h3>

        {/* Logos grid / row */}
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 md:gap-5">
          {activeLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-sky-50/80 border border-gray-200 hover:border-[#00A4E4]/40 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md active:scale-95"
              title={`Read PR coverage on ${item.title}`}
            >
              <div className="w-6 h-6 rounded-lg bg-gray-50 p-0.5 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={item.logoUrl}
                  alt={item.title}
                  className="w-full h-full object-contain filter brightness-95 group-hover:brightness-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://img.icons8.com/color/144/news.png'; }}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#00A4E4] transition-colors">
                {item.title}
              </span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#00A4E4] opacity-0 group-hover:opacity-100 transition-all duration-200" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrCoverageSection;
