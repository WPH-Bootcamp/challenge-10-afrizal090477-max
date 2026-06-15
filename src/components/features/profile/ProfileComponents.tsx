'use client';

import Image from 'next/image'; 
import { MapPin, ShoppingBag, LogOut } from 'lucide-react';


interface ProfileSidebarProps {
  userName: string;
  avatarUrl?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function ProfileSidebar({ userName, avatarUrl, activeTab, onTabChange, onLogout }: ProfileSidebarProps) {
  return (
    <div 
      className="hidden md:flex w-[240px] h-[274px] flex-col gap-[24px] bg-white rounded-[16px] p-[20px]"
      style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
    >

      <div className="flex items-center gap-[8px] h-[48px] w-[200px]">
        <div className="relative w-[48px] h-[48px] rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
          <Image 
            src={avatarUrl || "https://res.cloudinary.com/dvz5kmwqx/image/upload/v1765177617/burger-kink-logo_lf1hlt.png"} 
            alt="avatar" 
            fill
            sizes="48px"
            className="object-cover" 
            priority
          />
        </div>
        <span className="text-[18px] font-[700] text-[#0A0D12] tracking-[-3%] truncate">
          {userName}
        </span>
      </div>

      <div className="w-full h-[1px] bg-[#E9EAEB]" />
      <div className="flex flex-col gap-[16px]">
        <button
          onClick={() => onTabChange('address')}
          className={`flex items-center gap-[8px] h-[30px] text-left w-full cursor-pointer transition-colors ${
            activeTab === 'address' ? 'text-[#C12116] font-[700]' : 'text-[#0A0D12] font-[500]'
          }`}
        >
          <MapPin className="w-[24px] h-[24px]" />
          <span className="text-[16px] tracking-[-3%]">Delivery Address</span>
        </button>

        <button
          onClick={() => onTabChange('orders')}
          className={`flex items-center gap-[8px] h-[30px] text-left w-full cursor-pointer transition-colors ${
            activeTab === 'orders' ? 'text-[#C12116] font-[700]' : 'text-[#0A0D12] font-[500]'
          }`}
        >
          <ShoppingBag className="w-[24px] h-[24px]" />
          <span className="text-[16px] tracking-[-3%]">My Orders</span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-[8px] h-[30px] text-left w-full text-[#0A0D12] font-[500] hover:text-red-600 cursor-pointer transition-colors"
        >
          <LogOut className="w-[24px] h-[24px]" />
          <span className="text-[16px] tracking-[-3%]">Logout</span>
        </button>
      </div>
    </div>
  );
}