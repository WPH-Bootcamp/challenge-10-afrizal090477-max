"use client";

import type { Review } from "@/types/resto";
import ReviewCard from "@/components/features/resto/ReviewCard";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-slate-500 italic bg-slate-50 p-6 rounded-[16px] border border-dashed border-slate-300 text-center w-full">
        Belum ada ulasan untuk restoran ini.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[12px] md:gap-[16px]">
      {reviews.map((rev) => (
        <ReviewCard key={rev.id} review={rev} />
      ))}
    </div>
  );
}