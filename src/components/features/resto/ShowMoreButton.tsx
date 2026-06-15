'use client';

import React from 'react';

interface ShowMoreButtonProps {
  onClick: () => void;
}

export default function ShowMoreButton({ onClick }: ShowMoreButtonProps) {
  return (
    <div className="w-full flex justify-center mt-[40px] md:mt-[60px]">
      <button
        type="button"
        onClick={onClick}
        className="w-[160px] h-[40px] md:h-[48px] p-2 flex items-center justify-center gap-[8px] rounded-[100px] border border-[#D5D7DA] bg-white text-[#0A0D12] text-sm md:text-[16px] font-[700] hover:bg-slate-50 active:scale-95 transition-all duration-200 shadow-sm"
      >
        Show More
      </button>
    </div>
  );
}