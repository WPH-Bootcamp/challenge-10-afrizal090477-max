'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/types/resto';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (menuId: number, currentQty: number, action: 'increment' | 'decrement') => void;
  isMutating: boolean;
}

export default function CartItemCard({ item, onUpdateQuantity, isMutating }: CartItemCardProps) {
  const { menu, quantity } = item;

  return (
    <div className="w-full md:w-[760px] h-auto md:h-[88px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 border-b border-dashed border-slate-100 pb-4 md:pb-0 last:border-none">
      <div className="flex items-center gap-[17px] w-full md:w-[188px] h-[80px]">
        <div className="relative w-[80px] h-[80px] rounded-[12px] bg-slate-50 overflow-hidden flex-shrink-0">
          <Image
            src={menu.image || '/icons/Burger-Bang.png'}
            alt={menu.foodName}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center w-[91px] h-[62px]">
          <span className="text-[14px] font-[500] text-[#0A0D12] tracking-[-3%] h-[30px] flex items-center leading-none">
            Food Name
          </span>
          <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center leading-none truncate">
            {menu.foodName}
          </h4>
        </div>
      </div>

      <div className="w-full md:w-[273.5px] h-[88px] py-[24px] flex items-center justify-end gap-[16px]">
        <div className="w-[123px] h-[40px] flex items-center gap-[16px]">
          
          <Button
            variant="outline"
            size="icon"
            disabled={isMutating || quantity <= 1}
            onClick={() => onUpdateQuantity(menu.id, quantity, 'decrement')}
            className="w-[40px] h-[40px] rounded-[1000px] border border-[#D5D7DA] p-0 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            <Minus className="w-[14px] h-[14px] text-[#0A0D12]" style={{ strokeWidth: '2.5px' }} />
          </Button>
          
          <span className="w-[11px] h-[32px] flex items-center justify-center text-[18px] font-[600] text-[#0A0D12] tracking-[-2%] select-none">
            {quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            disabled={isMutating}
            onClick={() => onUpdateQuantity(menu.id, quantity, 'increment')}
            className="w-[40px] h-[40px] rounded-[1000px] bg-[#C12116] hover:bg-[#a81c12] border-none p-0 flex items-center justify-center disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            <Plus className="w-[14px] h-[14px] text-white" style={{ strokeWidth: '2.5px' }} />
          </Button>
        </div>
        <span className="w-[110px] h-[32px] flex items-center justify-end text-[18px] font-[800] text-[#0A0D12] tracking-[-2%]">
          Rp{menu.price.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  );
}