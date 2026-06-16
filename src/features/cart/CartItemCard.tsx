'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/types/cart';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (menuId: number, currentQty: number, action: 'increment' | 'decrement') => void;
  onDeleteItem: (cartItemId: number) => void; // Kita ubah namanya agar jelas menerima ID Cart
  isMutating: boolean;
}

export default function CartItemCard({ 
  item, 
  onUpdateQuantity, 
  onDeleteItem, 
  isMutating 
}: CartItemCardProps) {
  
  if (!item || !item.menu) {
    return null;
  }

  const { menu, quantity } = item;
  
  const menuId = Number(menu.id);
  // Konversi aman ID Cart ke number untuk keperluan endpoint API backend lo
  const cartItemId = Number(item.id); 

  return (
    <div className="w-full md:w-[760px] h-auto md:h-[88px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 border-b border-dashed border-slate-100 pb-4 md:pb-0 last:border-none">
      <div className="flex items-center gap-[17px] w-full md:w-[188px] h-[80px]">
        <div className="relative w-[80px] h-[80px] rounded-[12px] bg-slate-50 overflow-hidden flex-shrink-0">
          <Image
            src={menu.image || '/icons/Burger-Bang.png'}
            alt={menu.foodName || 'Menu Item'}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center w-[120px] h-[62px]">
          <span className="text-[14px] font-[500] text-[#0A0D12] tracking-[-3%] h-[30px] flex items-center leading-none">
            Food Name
          </span>
          <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center leading-none truncate w-full">
            {menu.foodName}
          </h4>
        </div>
      </div>

      <div className="w-full md:w-[320px] h-[88px] py-[24px] flex items-center justify-end gap-[16px]">
        <div className="w-[123px] h-[40px] flex items-center gap-[16px]">
          
          <Button
            variant="outline"
            size="icon"
            disabled={isMutating || quantity <= 1}
            onClick={() => onUpdateQuantity(menuId, quantity, 'decrement')}
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
            onClick={() => onUpdateQuantity(menuId, quantity, 'increment')}
            className="w-[40px] h-[40px] rounded-[1000px] bg-[#C12116] hover:bg-[#a81c12] border-none p-0 flex items-center justify-center disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            <Plus className="w-[14px] h-[14px] text-white" style={{ strokeWidth: '2.5px' }} />
          </Button>
        </div>

        <span className="w-[110px] h-[32px] flex items-center justify-end text-[18px] font-[800] text-[#0A0D12] tracking-[-2%]">
          Rp{menu.price.toLocaleString('id-ID')}
        </span>

        {/* DI SINI KUNCINYA: Lempar parameter cartItemId resmi, bukan menuId! */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isMutating}
          onClick={() => onDeleteItem(cartItemId)} 
          className="w-[36px] h-[36px] rounded-full text-slate-400 hover:text-[#C12116] hover:bg-red-50 p-0 flex items-center justify-center disabled:opacity-50 cursor-pointer flex-shrink-0 transition-colors"
          title="Hapus item"
        >
          <Trash2 className="w-[18px] h-[18px]" style={{ strokeWidth: '2px' }} />
        </Button>
      </div>
    </div>
  );
}