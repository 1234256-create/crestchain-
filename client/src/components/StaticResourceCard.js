import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const StaticResourceCard = ({ to, title, description, iconSrc, iconAlt }) => (
  <Link
    to={to}
    className="card group flex h-full min-h-[268px] w-full max-w-[380px] flex-col p-6 text-center transition-transform duration-300 hover:scale-105 sm:p-7"
  >
    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <img src={iconSrc} alt={iconAlt || ''} className="max-h-16 max-w-16 object-contain" loading="lazy" />
    </div>
    <h3 className="mb-2 line-clamp-3 text-xl font-semibold text-gray-900 group-hover:text-purple-700">{title}</h3>
    <p className="line-clamp-3 flex-1 text-gray-600">{description}</p>
    <div className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-medium text-purple-600">
      Read
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
    </div>
  </Link>
);

export default StaticResourceCard;
