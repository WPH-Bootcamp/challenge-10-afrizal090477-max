import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <Loader2 className="h-8 w-8 animate-spin text-[#C12116]" />
      <span className="text-sm font-medium text-[#717680]">
        Loading amazing food near you...
      </span>
    </div>
  );
}