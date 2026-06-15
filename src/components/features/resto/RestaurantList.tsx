'use client';

import Link from 'next/link';
import RestaurantCard from './RestaurantCard';
import { RestaurantUI } from '@/types/resto';

interface RestaurantListProps {
  restaurants: RestaurantUI[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 md:px-0 mt-[40px] md:mt-[60px] flex flex-col gap-[32px]">
      {/* Header Row */}
      <div className="w-full h-[36px] md:h-[42px] flex items-center justify-between">
        <h2 className="text-[20px] md:text-[30px] font-[800] text-[#0A0D12] tracking-tight">
          Recommended
        </h2>
        <Link 
          href="/all-recommended" 
          className="text-sm md:text-[18px] font-[800] tracking-[0%] md:tracking-[-2%] text-[#C12116] hover:opacity-90 transition-opacity"
        >
          See All
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[20px]">
        {restaurants.map((resto) => (
          <RestaurantCard key={resto.id} restaurant={resto} />
        ))}
      </div>
    </section>
  );
}