"use client";

import { LogOut, MapPin, ClipboardList } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import { ProfileApiResponse } from "@/types/profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileDropdownProps {
  isScrolled: boolean;
  user: { name?: string; email?: string; avatar?: string | null } | null;
  logout: () => void;
  router: AppRouterInstance;
}

export default function ProfileDropdown({ isScrolled, logout, router }: ProfileDropdownProps) {
  
  const { data: response, isLoading } = useQuery<ProfileApiResponse>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await api.get("/api/auth/profile");
      return data;
    },
  });

  const serverUser = response?.data;
  if (isLoading && !serverUser) {
    return (
      <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-slate-100 animate-pulse border border-slate-200" />
    );
  }

  const finalAvatar = serverUser?.avatar || "/images/photo.jpeg";
  const initials = (serverUser?.name || "U").substring(0, 2).toUpperCase();

  const handleLogoutAction = () => {
    logout();
    router.push("/login");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center md:gap-[16px] h-full md:h-[48px] cursor-pointer select-none focus:outline-none">
          <Avatar className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] border-2 border-white/40 shadow-sm flex-shrink-0">
            <AvatarImage src={finalAvatar} alt={serverUser?.name || "User"} className="object-cover w-full h-full" />
            <AvatarFallback className="bg-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center w-full h-full">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex w-[73px] h-[32px] items-center flex-shrink-0">
            <p className={`text-[18px] font-[600] tracking-[-2%] leading-tight truncate ${isScrolled ? "text-[#0A0D12]" : "text-white"}`}>
              {serverUser?.name || "John Doe"}
            </p>
          </div>

        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-[197px] h-[200px] p-[16px] rounded-[16px] bg-white flex flex-col gap-[12px] border-none outline-none z-[100]"
        style={{ boxShadow: '0px 0px 20px 0px rgba(203, 202, 202, 0.4)' }}
      >

        <div 
          onClick={() => router.push("/profile")} 
          className="w-[165px] h-[36px] flex items-center gap-[8px] border-b border-slate-50 pb-2 flex-shrink-0 cursor-pointer group select-none transition-opacity hover:opacity-80"
        >
          
          <Avatar className="w-[36px] h-[36px] border border-slate-200 flex-shrink-0">
            <AvatarImage src={finalAvatar} alt={serverUser?.name || "User"} className="object-cover w-full h-full" />
            <AvatarFallback className="bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center w-full h-full">
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="text-[14px] font-[700] text-[#0A0D12] tracking-[-2%] truncate leading-none group-hover:text-[#C12116] transition-colors">
            {serverUser?.name}
          </span>
        </div>

        <DropdownMenuItem 
          onClick={() => router.push("/address")}
          className="w-full h-[28px] flex items-center gap-[8px] p-0 text-[#0A0D12] hover:text-black cursor-pointer focus:bg-transparent font-[500] text-sm"
        >
          <MapPin className="w-[24px] h-[24px] text-[#0A0D12] stroke-[1.67px]" />
          <span className="truncate">Delivery Address</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => router.push("/orders")}
          className="w-full h-[28px] flex items-center gap-[8px] p-0 text-[#181D27] hover:text-black cursor-pointer focus:bg-transparent font-[500] text-sm"
        >
          <ClipboardList className="w-[24px] h-[24px] text-[#181D27] stroke-[1.67px]" />
          <span>My Orders</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleLogoutAction}
          className="w-full h-[28px] flex items-center gap-[8px] p-0 text-[#0A0D12] hover:text-red-600 focus:text-red-600 cursor-pointer focus:bg-transparent font-[500] text-sm mt-auto"
        >
          <LogOut className="w-[24px] h-[24px] stroke-[1.67px]" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}