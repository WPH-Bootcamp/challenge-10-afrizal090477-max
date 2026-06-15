"use client";

import Image from "next/image";
import { Star, MapPin, Bike } from "lucide-react";
import type { RestaurantDetail } from "@/types/resto";

interface RestoHeroProps {
  resto: RestaurantDetail;
}

export default function RestoHero({ resto }: RestoHeroProps) {
  const heroImage = resto.images && resto.images.length > 0 ? resto.images[0] : resto.logo;

  return (
    <div 
      className="relative w-full h-[220px] md:h-[350px] rounded-[16px] overflow-hidden bg-[#F8FAFC]"
      style={{ boxShadow: '0px 0px 20px 0px rgba(203, 202, 202, 0.25)' }}
    >
      {heroImage && heroImage !== 'string' ? (
        <Image
          src={heroImage}
          alt={resto.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400 font-bold bg-slate-100 text-sm md:text-base">
          No Restaurant Image
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6 text-white">
        <span className="text-[10px] md:text-[12px] font-[800] uppercase tracking-wider bg-[#C12116] px-2.5 py-1 rounded-[6px] w-fit mb-2">
          {resto.category || "Restaurant"}
        </span>
        <h1 className="text-[24px] md:text-[36px] font-[800] tracking-tight leading-tight">
          {resto.name}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] md:text-[16px] mt-2 font-[500] text-slate-200">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-300 flex-shrink-0" />
            <span>{resto.place || "Lokasi tidak diketahui"}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#FFAB0D] text-[#FFAB0D] flex-shrink-0" />
            <span className="text-white">{Number(resto.star || 0).toFixed(1)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Bike className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-300 flex-shrink-0" />
            <span>{resto.distance ? `${resto.distance.toFixed(1)} km` : "0 km"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}