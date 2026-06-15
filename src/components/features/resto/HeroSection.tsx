'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);


  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  return (
    <section className="relative w-full h-[648px] md:h-[827px] mt-[-64px] md:mt-[-80px] overflow-hidden bg-slate-900">
      <Image
        src="/images/Hero-Burger.svg"
        alt="Explore Culinary Experiences Banner"
        fill
        priority
        className="object-cover"
      />
      <div 
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) -59.98%, rgba(0, 0, 0, 0.8) 110.09%)' }}
      />

      <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-[712px] flex flex-col gap-[8px] text-center mb-[40px]">
          <h1 className="text-white text-[28px] md:text-[48px] font-[800] leading-tight">
            Explore Culinary Experiences
          </h1>
          <p className="text-slate-200 text-sm md:text-[20px] font-[700]">
            Search and refine your choice to discover the perfect restaurant.
          </p>
        </div>

        <div className="w-full max-w-[340px] md:max-w-[604px] relative shadow-lg rounded-full overflow-hidden">
          <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#535862] z-30" />
          <Input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search restaurants, food and drink"
            className="w-full h-[52px] md:h-[56px] pl-[56px] pr-6 bg-white rounded-full border-none text-slate-800 placeholder-[#535862] text-sm md:text-[16px] focus-visible:ring-0"
          />
        </div>
      </div>
    </section>
  );
}