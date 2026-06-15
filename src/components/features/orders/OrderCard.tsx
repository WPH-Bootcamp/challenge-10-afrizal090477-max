"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface OrderItem {
  id: number;
  restaurantName?: string;
  restaurantLogo?: string;
  foodName?: string;
  foodImage?: string;
  quantity?: number;
  price?: number;
  totalPrice?: number;
  status?: string;
}

interface OrderCardProps {
  order: OrderItem;
  onReviewClick?: (id: number) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onReviewClick }) => {
  const displayRestaurantName = order.restaurantName || "Restaurant Name";
  const displayRestaurantLogo = order.restaurantLogo || "/icons/Burger-Bang.png";
  const displayFoodName = order.foodName || "Food Name";
  const displayFoodImage = order.foodImage || "/icons/Burger-Bang.png";
  const displayQuantity = order.quantity || 1;
  const displayPrice = order.price || 0;
  const displayTotal = order.totalPrice || (displayPrice * displayQuantity);

  return (
    <div
      className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[16px] border border-slate-100"
      style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
    >
      <div className="flex items-center gap-[8px] h-[32px]">
        <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden bg-slate-50 border border-slate-100">
          <Image 
            src={displayRestaurantLogo.startsWith("http") ? displayRestaurantLogo : "/icons/Burger-Bang.png"} 
            alt="logo" 
            fill 
            className="object-contain p-0.5" 
          />
        </div>
        <span className="text-[18px] font-[700] text-[#0A0D12] tracking-[-3%]">
          {displayRestaurantName}
        </span>
      </div>

      <div className="w-full flex items-center justify-between h-[80px]">
        <div className="flex items-center gap-[17px] h-[80px]">
          <div className="relative w-[80px] h-[80px] rounded-[12px] overflow-hidden bg-slate-100 border border-slate-200">
            <Image 
              src={displayFoodImage.startsWith("http") ? displayFoodImage : "/icons/Burger-Bang.png"} 
              alt="food" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[16px] font-[500] text-[#0A0D12] tracking-[-3%]">
              {displayFoodName}
            </span>
            <span className="text-[16px] font-[800] text-[#0A0D12] tracking-[0%] mt-1">
              {displayQuantity} x Rp {displayPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[0px] border-t border-dashed border-[#D5D7DA]" />

      <div className="w-full flex items-center justify-between h-[48px]">
        <div className="flex flex-col justify-center">
          <span className="text-[14px] font-[500] text-[#535862]">Total</span>
          <span className="text-[20px] font-[800] text-[#0A0D12] tracking-[0%] mt-0.5">
            Rp {displayTotal.toLocaleString("id-ID")}
          </span>
        </div>

        <Button
          onClick={() => onReviewClick?.(order.id)}
          className="w-[240px] h-[48px] rounded-[200px] bg-[#C12116] hover:bg-[#a81c12] text-white text-[15px] font-[700] border-none shadow-none cursor-pointer flex items-center justify-center transition-all duration-200"
        >
          Give Review
        </Button>
      </div>
    </div>
  );
};