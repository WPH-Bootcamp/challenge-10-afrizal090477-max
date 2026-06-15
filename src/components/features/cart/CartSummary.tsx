'use client';

import { Button } from '@/components/ui/button';
import type { CartItem } from '@/types/cart';

interface CartSummaryProps {
  items: CartItem[]; 
  onCheckout: () => void;
}

export default function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const totalGroupPrice = items.reduce((sum, item) => {
    const qty = Number(item.quantity || 1);
    const itemPrice = Number(item.menu?.price || 0);
    return sum + (itemPrice * qty);
  }, 0);

  return (
    <div className="w-full md:w-[760px] h-auto md:h-[60px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-0 mt-auto border-t border-slate-100 pt-4 bg-white">
      {/* Detail Ringkasan Total */}
      <div className="flex flex-col justify-center min-w-[120px]">
        <span className="text-[14px] font-[500] text-[#7E8494] tracking-[-3%] leading-none mb-1">
          Total
        </span>
        <span className="text-[20px] font-[800] text-[#0A0D12] tracking-[0%] leading-none">
          Rp{totalGroupPrice.toLocaleString("id-ID")}
        </span>
      </div>

      <Button
        onClick={onCheckout}
        className="w-full sm:w-[240px] h-[48px] bg-[#C12116] hover:bg-[#a81c12] text-[#FDFDFD] font-[700] text-[14px] tracking-[-2%] rounded-[100px] border-none cursor-pointer flex items-center justify-center shadow-sm"
      >
        Checkout
      </Button>
    </div>
  );
}