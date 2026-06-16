import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ReviewForm } from './ReviewForm';
import { CreateReviewPayload } from '@/types/review'; 

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pick<CreateReviewPayload, 'star' | 'comment'>) => void;
  isLoading?: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[361px] h-auto md:w-[439px] md:h-auto rounded-[16px] p-4 md:p-6 gap-4 md:gap-6 border-none bg-white max-h-[95vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader className="flex flex-row justify-between items-center space-y-0 h-[34px] md:h-[36px] w-full">
          <DialogTitle className="font-extrabold text-[#0A0D12] tracking-0% text-xl md:text-display-xs flex items-center">
            Give Review
          </DialogTitle>

          <button
            onClick={onClose}
            type="button"
            className="w-6 h-6 flex items-center justify-center text-[#0A0D12] hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <DialogDescription className="sr-only">
            Share your thoughts and ratings about our service.
          </DialogDescription>
        </DialogHeader>

        <ReviewForm onSubmit={onSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};