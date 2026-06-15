
'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/cart';


interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

export function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const totalGroupPrice = items.reduce((sum, item) => {
    const qty = Number(item.quantity || 1);
    const itemPrice = Number(item.menu?.price || 0);
    return sum + itemPrice * qty;
  }, 0);

  return (
    <div className="w-full md:w-[760px] h-auto md:h-[60px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-0 mt-auto border-t border-slate-100 pt-4 bg-white">
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

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (menuId: number, currentQty: number, action: 'increment' | 'decrement') => void;
  isMutating: boolean;
}

export function CartItemCard({ item, onUpdateQuantity, isMutating }: CartItemCardProps) {
  const { quantity, menu } = item;
  const currentQuantity = Number(quantity || 1);
  
  const rawMenu = menu as unknown as Record<string, unknown>;
  const foodName = menu?.foodName || (typeof rawMenu?.name === 'string' ? rawMenu.name : '') || '';
  const price = Number(menu?.price || (typeof rawMenu?.price === 'number' ? rawMenu.price : 0) || 0);
  const imageSrc = menu?.image || (typeof rawMenu?.image === 'string' ? rawMenu.image : '') || '/icons/Burger-Bang.png';
  const menuId = Number(menu?.id || rawMenu?.id || 0);

  return (
    <div className="w-full md:w-[760px] h-auto md:h-[88px] flex items-center justify-between border-b border-dashed border-slate-100 pb-4 md:pb-[24px] pt-[24px] first:pt-0 last:border-none bg-white">
      <div className="flex items-center gap-[17px] min-w-0 flex-1">
        <div className="relative w-[80px] h-[80px] rounded-[12px] bg-slate-50 overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc}
            alt={foodName || "food"}
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
        
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] leading-tight truncate">
            {foodName}
          </h4>
          <span className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] mt-1 leading-none">
            Rp{price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="w-[123px] h-[40px] flex items-center gap-[16px] flex-shrink-0 justify-end">
        <Button
          variant="outline"
          size="icon"
          type="button"
          disabled={isMutating || currentQuantity <= 1}
          onClick={() => onUpdateQuantity(menuId, currentQuantity, 'decrement')}
          className="w-[40px] h-[40px] rounded-[1000px] border border-[#D5D7DA] p-0 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white flex-shrink-0 disabled:opacity-50"
        >
          <Minus className="w-[14px] h-[14px] text-[#0A0D12]" style={{ strokeWidth: '2.5px' }} />
        </Button>
        
        <span className="w-[11px] h-[32px] flex items-center justify-center text-[18px] font-[600] text-[#0A0D12] tracking-[-2%] select-none flex-shrink-0">
          {currentQuantity}
        </span>

        <Button
          variant="outline"
          size="icon"
          type="button"
          disabled={isMutating}
          onClick={() => onUpdateQuantity(menuId, currentQuantity, 'increment')}
          className="w-[40px] h-[40px] rounded-[1000px] bg-[#C12116] hover:bg-[#a81c12] border-none p-0 flex items-center justify-center cursor-pointer text-white flex-shrink-0 disabled:opacity-50"
        >
          <Plus className="w-[14px] h-[14px] text-white" style={{ strokeWidth: '2.5px' }} />
        </Button>
      </div>

    </div>
  );
}