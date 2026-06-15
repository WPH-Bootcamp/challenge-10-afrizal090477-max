'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FilterBarProps, FilterCriteriaProps } from '@/types/resto';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function FilterCriteriaContent({
  distance, setDistance,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  rating, setRating,
  isMobile = false
}: FilterCriteriaProps) {
  
  const handleDistanceChange = (dist: string) => {
    if (distance.includes(dist)) {
      setDistance(distance.filter((item) => item !== dist));
    } else {
      setDistance([...distance, dist]);
    }
  };

  const handleRatingChange = (starNum: number) => {
    if (rating.includes(starNum)) {
      setRating(rating.filter((item) => item !== starNum));
    } else {
      setRating([...rating, starNum]);
    }
  };

  return (
    <div 
      className={`${
        isMobile ? 'w-[266px] h-[708px] gap-[12px]' : 'w-[266px] h-[792px] gap-[24px]'
      } flex flex-col bg-white py-[16px] px-[16px] rounded-[12px]`}
      style={{ boxShadow: '0px 0px 20px 0px #CBCACA40' }}
    >

      <div className="w-[234px] h-[30px] flex items-center">
        <span className={`text-[#0A0D12] font-sans text-[14px] ${isMobile ? 'font-[700]' : 'font-[800]'}`}>
          FILTER
        </span>
      </div>
      
      <div className={`${isMobile ? 'h-[222px] gap-[10px]' : 'h-[232px] gap-[10px]'} flex flex-col`}>
        <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center">
          Distance
        </h4>
        {['Nearby', 'Within 1 km', 'Within 3 km', 'Within 5 km'].map((dist) => {
          const isChecked = distance.includes(dist);
          return (
            <label key={dist} className="w-full h-[30px] flex items-center gap-[8px] cursor-pointer text-[#0A0D12] select-none">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleDistanceChange(dist)}
                className="w-[20px] h-[20px] rounded-[4px] cursor-pointer accent-[#C12116] border border-[#A4A7AE] flex-shrink-0"
              />
              <span className="text-[14px] font-[400] tracking-[-2%]">{dist}</span>
            </label>
          );
        })}
      </div>

      <hr className="border-slate-100" />

      <div className={`${isMobile ? 'h-[146px]' : 'h-[160px]'} flex flex-col gap-[10px]`}>
        <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center">
          Price
        </h4>
        
        <div className={`w-full ${isMobile ? 'h-[48px]' : 'h-[54px]'} border border-[#D5D7DA] rounded-[8px] p-[8px] flex items-center gap-[8px] bg-white`}>
          <div className={`w-[38px] h-[38px] rounded-[4px] p-[8px] flex items-center justify-center flex-shrink-0 ${isMobile ? 'bg-[#E9EAEB]' : 'bg-[#F5F5F5]'}`}>
            <span className="text-[14px] font-[700] text-[#0A0D12]">Rp</span>
          </div>
          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full text-[#0A0D12] placeholder-[#717680] text-[14px] font-[400] tracking-[-2%] bg-transparent border-none outline-none focus:ring-0"
          />
        </div>

        <div className={`w-full ${isMobile ? 'h-[48px]' : 'h-[54px]'} border border-[#D5D7DA] rounded-[8px] p-[8px] flex items-center gap-[8px] bg-white mt-1`}>
          <div className={`w-[38px] h-[38px] rounded-[4px] p-[8px] flex items-center justify-center flex-shrink-0 ${isMobile ? 'bg-[#E9EAEB]' : 'bg-[#F5F5F5]'}`}>
            <span className="text-[14px] font-[700] text-[#0A0D12]">Rp</span>
          </div>
          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full text-[#0A0D12] placeholder-[#717680] text-[14px] font-[400] tracking-[-2%] bg-transparent border-none outline-none focus:ring-0"
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className={`${isMobile ? 'h-[260px]' : 'h-[272px]'} flex flex-col gap-[10px]`}>
        <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[0%] h-[32px] flex items-center">
          Rating
        </h4>
        <div className="flex flex-col">
          {[5, 4, 3, 2, 1].map((starNum) => {
            const isRatingChecked = rating.includes(starNum);
            return (
              <label key={starNum} className="w-full h-[44px] md:h-[46px] p-[8px] flex items-center gap-[8px] cursor-pointer text-[#0A0D12] select-none">
                <input
                  type="checkbox"
                  checked={isRatingChecked}
                  onChange={() => handleRatingChange(starNum)}
                  className="w-[20px] h-[20px] border border-[#A4A7AE] rounded-[4px] accent-[#C12116] cursor-pointer flex-shrink-0"
                />
                <div className="flex items-center gap-[4px] md:gap-[8px]">
                  <span className="text-[#FFAB0D] text-[18px]">★</span>
                  <span className="text-[14px] font-[400] text-[#0A0D12]">{starNum}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  const isAllRestoActive = activeCategory === 'All Restaurant' || activeCategory === 'All+Restaurant';

  const [distance, setDistance] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [rating, setRating] = useState<number[]>([]);

  const sharedProps: FilterCriteriaProps = {
    distance, setDistance,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    rating, setRating
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="w-full mt-[40px] md:mt-[60px]">
        <div className="w-full grid grid-cols-3 gap-3 md:flex md:items-center md:justify-between md:gap-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name || (cat.name === 'All Restaurant' && activeCategory === 'All+Restaurant');
            return (
              <button
                key={cat.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault(); 
                  onCategoryChange(isActive ? '' : cat.name);
                }}
                className="flex flex-col items-center justify-between w-full md:w-[161px] h-[105px] md:h-[138px] gap-[6px] group focus:outline-none select-none cursor-pointer"
              >
                <div 
                  className="w-full h-[75px] md:h-[100px] rounded-[16px] flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? '#F97316' : '#FFFFFF',
                    boxShadow: isActive ? 'none' : '0px 0px 20px 0px rgba(203, 202, 202, 0.25)',
                  }}
                >
                  <div className="relative w-[40px] h-[40px] md:w-[65px] md:h-[65px]">
                    <Image
                      src={cat.imageSrc}
                      alt={`${cat.name} icon`}
                      fill
                      sizes="(max-w: 768px) 40px, 65px"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
                <span className={`w-full text-[12px] md:text-[18px] font-[700] tracking-[-3%] text-center ${isActive ? 'text-orange-500' : 'text-[#0A0D12]'}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {isAllRestoActive && (
        <div className="w-full max-w-[361px] md:hidden flex justify-between items-center bg-white border border-slate-100 rounded-[12px] p-[12px] h-[52px] mx-auto">
          <span className="text-[14px] font-[800] text-[#0A0D12]">FILTER</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 font-[800] text-[#0A0D12] cursor-pointer">
                <SlidersHorizontal className="w-4 h-4 text-[#0A0D12]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[298px] p-[16px] bg-white overflow-y-auto">
              <FilterCriteriaContent {...sharedProps} isMobile={true} />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {isAllRestoActive && (
        <div className="hidden md:block absolute left-0 mt-[160px] z-10 animate-in fade-in duration-300">
          <FilterCriteriaContent {...sharedProps} isMobile={false} />
        </div>
      )}
    </div>
  );
}