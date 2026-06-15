"use client";

import Image from "next/image"; 
import { Star } from "lucide-react";
import type { Review } from "@/types/resto";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { star, comment, createdAt, user } = review;

  return (
    <div 
      className="w-full p-4 bg-white rounded-[16px] flex flex-col gap-[10px] border border-slate-50"
      style={{ boxShadow: '0px 0px 20px 0px rgba(203, 202, 202, 0.15)' }}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="relative w-[36px] h-[36px] rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200 flex-shrink-0">
            {user?.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name || "User"} 
                fill 
                className="object-cover" 
                sizes="36px" 
              />
            ) : (
              <span className="text-xs font-[800] text-slate-500">
                {(user?.name || "A").substring(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="text-[14px] font-[700] text-[#0A0D12] leading-tight">
              {user?.name || "Pelanggan Anonim"}
            </span>
            <span className="text-[11px] text-slate-400 font-[400]">
              {new Date(createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-[4px] bg-amber-50 px-2 py-1 rounded-[8px]">
          <Star className="w-3.5 h-3.5 fill-[#FFAB0D] text-[#FFAB0D]" />
          <span className="text-[12px] font-[700] text-[#0A0D12]">
            {Number(star || 0).toFixed(1)}
          </span>
        </div>
      </div>

      <p className="text-[13px] md:text-[14px] font-[400] text-slate-600 leading-relaxed pl-[46px]">
        &ldquo;{comment}&rdquo;
      </p>
    </div>
  );
}