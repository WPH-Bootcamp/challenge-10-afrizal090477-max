"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ShoppingBag, LogOut } from "lucide-react";

interface UserSidebarProps {
  activeMenu: "address" | "orders";
  userName?: string;
  userAvatar?: string;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  activeMenu,
  userName = "John Doe",
  userAvatar,
}) => {
  const avatarFallback = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "JD";

  return (
    <div
      className="hidden lg:flex w-[240px] h-[274px] bg-white rounded-[16px] p-[20px] flex-col gap-[24px] flex-shrink-0"
      style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
    >
      <div className="flex items-center gap-[8px] h-[48px] w-[200px]">
        <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden bg-[#F2F4F7] flex items-center justify-center font-[700] text-[16px] text-[#0A0D12] flex-shrink-0">
          {userAvatar && userAvatar !== "string" ? (
            <Image
              src={userAvatar}
              alt={userName}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span>{avatarFallback}</span>
          )}
        </div>
        <span className="text-[18px] font-[700] text-[#0A0D12] tracking-[-3%] truncate">
          {userName}
        </span>
      </div>

      <div className="w-[201px] h-[0px] border-t border-[#E9EAEB]" />

      <div className="flex flex-col gap-[16px] w-full">
        <button className="flex items-center gap-[8px] h-[30px] w-[150px] text-left cursor-pointer group">
          <MapPin
            className={`w-[24px] h-[24px] ${activeMenu === "address" ? "text-[#C12116]" : "text-[#0A0D12]"}`}
          />
          <span
            className={`text-[16px] font-[500] tracking-[-3%] ${activeMenu === "address" ? "text-[#C12116]" : "text-[#0A0D12]"}`}
          >
            Delivery Address
          </span>
        </button>

        <button className="flex items-center gap-[8px] h-[30px] w-[104px] text-left cursor-pointer group">
          <ShoppingBag
            className={`w-[24px] h-[24px] ${activeMenu === "orders" ? "text-[#C12116]" : "text-[#0A0D12]"}`}
          />
          <span
            className={`text-[16px] font-[500] tracking-[-3%] ${activeMenu === "orders" ? "text-[#C12116]" : "text-[#0A0D12]"}`}
          >
            My Orders
          </span>
        </button>

        <button className="flex items-center gap-[8px] h-[30px] w-[81px] text-left text-[#0A0D12] hover:text-[#C12116] transition-colors cursor-pointer group">
          <LogOut className="w-[24px] h-[24px]" />
          <span className="text-[16px] font-[500] tracking-[-3%]">Logout</span>
        </button>
      </div>
    </div>
  );
};
