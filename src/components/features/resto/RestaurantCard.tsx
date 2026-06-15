'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { RestaurantUI } from '@/types/resto';

interface RestaurantCardProps {
  restaurant: RestaurantUI;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { id, name, rating, location, distance, imageSrc, fallbackText } = restaurant;

  return (
    <Link
      href={`/resto/${id}`}
      className="group w-full md:max-w-[396px] h-[114px] md:h-[152px] p-3 md:p-4 bg-white rounded-[16px] flex gap-[12px] items-center transition-all duration-300 select-none"
      style={{ boxShadow: '0px 0px 20px 0px rgba(203, 202, 202, 0.25)' }}
    >
      <div className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-[12px] bg-slate-50 overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 90px, 120px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-[#0A0D12] font-extrabold text-sm md:text-base">
            {fallbackText}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 h-[90px] md:h-[96px] gap-[2px] min-w-0 justify-center">
        <h3 className="w-full text-[14px] md:text-[18px] font-[800] text-[#0A0D12] tracking-[0%] md:tracking-[-2%] leading-tight line-clamp-1 group-hover:text-[#C12116] transition-colors">
          {name}
        </h3>

        <div className="w-full h-[24px] md:h-[28px] flex items-center gap-[4px]">
          <div className="w-[17.12px] h-[16.35px] relative flex items-center justify-center">
            <Star className="w-full h-full fill-[#FFAB0D] text-[#FFAB0D]" />
          </div>
          <span className="text-[12px] md:text-[16px] font-[500] text-[#0A0D12] tracking-[0%] md:tracking-[-3%]">
            {Number(rating).toFixed(1)}
          </span>
        </div>

        <div className="w-full h-[28px] md:h-[30px] flex items-center gap-[6px] text-[#0A0D12]">
          <div className="flex items-center gap-[4px] min-w-0 flex-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-[12px] md:text-[16px] font-[400] tracking-[-2%] line-clamp-1">
              {location}
            </span>
          </div>
          <span className="text-[12px] md:text-[16px] font-[400] tracking-[-2%] flex-shrink-0">
            {distance}
          </span>
        </div>
      </div>
    </Link>
  );
}