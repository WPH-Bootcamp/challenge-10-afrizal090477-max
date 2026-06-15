import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        <UtensilsCrossed className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium text-[#535862] max-w-[280px]">
        {message}
      </p>
    </div>
  );
}