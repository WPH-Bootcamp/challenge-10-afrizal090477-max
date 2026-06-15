'use client';

import { FilterCriteriaProps } from '@/types/resto';

export default function FilterSidebar({
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
        <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center">Distance</h4>
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
        <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center">Price</h4>
        <div className={`w-full ${isMobile ? 'h-[48px]' : 'h-[54px]'} border border-[#D5D7DA] rounded-[8px] p-[8px] flex items-center gap-[8px] bg-white`}>
          <div className={`w-[38px] h-[38px] rounded-[4px] flex items-center justify-center flex-shrink-0 ${isMobile ? 'bg-[#E9EAEB]' : 'bg-[#F5F5F5]'}`}>
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
          <div className={`w-[38px] h-[38px] rounded-[4px] flex items-center justify-center flex-shrink-0 ${isMobile ? 'bg-[#E9EAEB]' : 'bg-[#F5F5F5]'}`}>
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
        <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[0%] h-[32px] flex items-center">Rating</h4>
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