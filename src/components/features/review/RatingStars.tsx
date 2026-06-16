import React, { useState } from 'react';
import { Star } from 'lucide-react';


interface RatingStarsProps {
  rating: number;
  onChange: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, onChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-between w-full h-auto md:h-[79px] gap-[6px] md:gap-0">
      <span className="text-[#0A0D12] font-extrabold text-sm md:text-md text-center block w-full leading-normal select-none">
        Give Rating
      </span>

      <div className="flex items-center gap-[4.08px] justify-center w-full h-[40px] md:h-[49px]">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hoverRating !== null ? star <= hoverRating : star <= rating;
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className="w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center transition-transform active:scale-95 focus:outline-none"
            >
              <Star
                className="w-[28.53px] h-[27.25px] md:w-[34.95px] md:h-[33.38px] transition-colors duration-150"
                fill={isFilled ? '#FDB022' : 'transparent'}
                color={isFilled ? '#FDB022' : '#D5D7DA'}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};