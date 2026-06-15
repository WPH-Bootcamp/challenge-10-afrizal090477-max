"use client";

import React from "react";

export default function OrdersPage() {
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] pt-[120px] md:pt-[140px] pb-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col gap-6">
        {/* Header Halaman */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-normal leading-none">
            My Orders
          </h1>
          <p className="text-sm text-slate-500">
            Track and manage your recent restaurant orders
          </p>
        </div>

        <div 
          className="w-full h-[300px] bg-white rounded-[16px] p-6 flex flex-col items-center justify-center text-center gap-2"
          style={{ boxShadow: "0px 0px 20px 0px rgba(203, 202, 202, 0.25)" }}
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-lg">
            📦
          </div>
          <h3 className="text-base font-bold text-[#0A0D12] mt-2">No orders found</h3>
          <p className="text-sm text-slate-400 max-w-[320px]">
            You haven&apos;t placed any food orders yet. Explore your nearby restaurants to get started!
          </p>
        </div>
      </div>
    </div>
  );
}