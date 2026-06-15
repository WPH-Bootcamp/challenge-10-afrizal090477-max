'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react'; 

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateStr: string;
  bankName: string;
  priceItems: number;
  totalItems: number;
  deliveryFee: number;
  serviceFee: number;
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  dateStr,
  bankName,
  priceItems,
  totalItems,
  deliveryFee,
  serviceFee,
}: PaymentSuccessModalProps) {
  if (!isOpen) return null;

  const totalBill = priceItems + deliveryFee + serviceFee;

  return (
    <div className="fixed inset-0 w-full h-full min-h-screen bg-[#FAFAFA] z-[9999] flex flex-col items-center justify-start pt-[120px] md:pt-[132px] px-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-[361px] flex flex-col items-center gap-[28px]">
        <div className="w-[149px] h-[42px] flex items-center gap-[15px] flex-shrink-0 select-none">
          <div className="relative w-[42px] h-[42px] flex-shrink-0">
            <Image
              src="/logos/Logo.png"
              alt="Foody Logo"
              fill
              sizes="42px"
              className="object-contain"
              priority
            />
          </div>
          <span className="w-[92px] h-[42px] flex items-center text-[#0A0D12] text-[24px] font-[800] tracking-[0%] font-sans leading-none">
            Foody
          </span>
        </div>

        <div 
          className="w-full h-[518px] bg-white rounded-[16px] p-[16px] flex flex-col gap-[16px] box-border justify-between"
          style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
        >
          
          <div className="w-full h-[128px] flex flex-col items-center justify-center gap-[2px] text-center flex-shrink-0">
            <div className="w-[64px] h-[64px] text-[#28A745] flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-full h-full fill-[#28A745] text-white" />
            </div>
            <h3 className="text-[#0A0D12] font-[800] text-[18px] tracking-normal leading-none mt-2 mb-0">
              Payment Success
            </h3>
            <p className="text-[#7E8494] font-[400] text-[14px] tracking-[-2%] leading-normal m-0 mt-1">
              Your payment has been successfully processed.
            </p>
          </div>

          <div className="w-full h-[0px] border-t border-dashed border-[#D5D7DA] flex-shrink-0" />
          <div className="w-full flex flex-col gap-[12px] flex-grow justify-start pt-1">
            <div className="w-full flex items-center justify-between text-[14px]">
              <span className="font-[500] text-[#7E8494]">Date</span>
              <span className="font-[600] text-[#0A0D12] tracking-[-2%]">{dateStr}</span>
            </div>
            
            <div className="w-full flex items-center justify-between text-[14px]">
              <span className="font-[500] text-[#7E8494]">Payment Method</span>
              <span className="font-[600] text-[#0A0D12] tracking-[-2%]">{bankName || "Bank Rakyat Indonesia"}</span>
            </div>

            <div className="w-full flex items-center justify-between text-[14px]">
              <span className="font-[500] text-[#7E8494]">Price ({totalItems} items)</span>
              <span className="font-[600] text-[#0A0D12] tracking-[-2%]">Rp{priceItems.toLocaleString('id-ID')}</span>
            </div>

            <div className="w-full flex items-center justify-between text-[14px]">
              <span className="font-[500] text-[#7E8494]">Delivery Fee</span>
              <span className="font-[600] text-[#0A0D12] tracking-[-2%]">Rp{deliveryFee.toLocaleString('id-ID')}</span>
            </div>

            <div className="w-full flex items-center justify-between text-[14px]">
              <span className="font-[500] text-[#7E8494]">Service Fee</span>
              <span className="font-[600] text-[#0A0D12] tracking-[-2%]">Rp{serviceFee.toLocaleString('id-ID')}</span>
            </div>

            <div className="w-full flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
              <span className="font-[400] text-[#0A0D12] text-[15px] tracking-[-2%]">Total</span>
              <span className="font-[800] text-[#0A0D12] text-[15px] tracking-[0%]">Rp{totalBill.toLocaleString('id-ID')}</span>
            </div>

          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full h-[44px] bg-[#C12116] hover:bg-[#a81c12] text-[#FDFDFD] font-[700] text-[15px] tracking-[-2%] rounded-[100px] border-none flex items-center justify-center cursor-pointer shadow-sm transition-colors flex-shrink-0 select-none"
          >
            See My Orders
          </button>

        </div>

      </div>
    </div>
  );
}