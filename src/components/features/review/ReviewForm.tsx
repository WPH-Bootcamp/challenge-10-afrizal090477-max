import React, { useState } from 'react';
import { RatingStars } from './RatingStars';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CreateReviewPayload } from '@/types/review'; 

interface ReviewFormProps {
  onSubmit: (data: Pick<CreateReviewPayload, 'star' | 'comment'>) => void;
  isLoading?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isLoading }) => {
  const [star, setStar] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (star === 0) return;   
    onSubmit({ star, comment });
    setStar(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 w-full">
      <RatingStars rating={star} onChange={setStar} />
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Please share your thoughts about our service!"
        className="w-full h-[235px] pt-2 pr-3 pb-2 pl-3 border border-[#D5D7DA] rounded-[12px] font-normal text-[#717680] placeholder:text-[#717680] tracking-[-2%] resize-none focus-visible:ring-[#C12116]/20 focus-visible:border-[#C12116]"
        maxLength={500}
      />

      <Button
        type="submit"
        disabled={isLoading || star === 0}
        className="w-full h-[44px] md:h-[48px] p-2 bg-[#C12116] hover:bg-[#a61a10] disabled:bg-[#D5D7DA] disabled:text-[#717680] text-[#FDFDFD] rounded-[200px] font-bold text-md tracking-[-2%] transition-colors shadow-none"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};