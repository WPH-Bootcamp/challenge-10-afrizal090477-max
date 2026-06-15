'use client';

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-[428px] bg-white rounded-[16px] p-6 flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-200"
        style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
      >
        <div className="flex items-center gap-[15px] h-[42px]">
          <div className="relative w-[42px] h-[42px] bg-[#C12116] rounded-full flex items-center justify-center text-white font-[800]">
            F
          </div>
          <span className="text-[24px] font-[800] text-[#0A0D12]">Foody</span>
        </div>

        <div className="flex flex-col items-center text-center gap-2 w-full">
          <CheckCircle2 className="w-[64px] h-[64px] text-[#C12116]" style={{ strokeWidth: '2.5px' }} />
          <h3 className="text-[20px] font-[800] text-[#0A0D12] tracking-normal leading-tight mt-1">
            Payment Success
          </h3>
          <p className="text-[14px] font-[400] text-[#7E8494] tracking-[-2%] px-2">
            Your payment has been successfully processed.
          </p>
        </div>

        <div className="w-full border-t border-dashed border-[#D5D7DA] my-1" />
        <div className="w-full flex flex-col gap-[12px]">
          <div className="flex items-center justify-between text-[14px]">
            <span className="font-[500] text-[#7E8494]">Date</span>
            <span className="font-[700] text-[#0A0D12]">{dateStr}</span>
          </div>
          
          <div className="flex items-center justify-between text-[14px]">
            <span className="font-[500] text-[#7E8494]">Payment Method</span>
            <span className="font-[700] text-[#0A0D12]">{bankName}</span>
          </div>

          <div className="flex items-center justify-between text-[14px]">
            <span className="font-[500] text-[#7E8494]">Price ({totalItems} items)</span>
            <span className="font-[700] text-[#0A0D12]">Rp{priceItems.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex items-center justify-between text-[14px]">
            <span className="font-[500] text-[#7E8494]">Delivery Fee</span>
            <span className="font-[700] text-[#0A0D12]">Rp{deliveryFee.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex items-center justify-between text-[14px]">
            <span className="font-[500] text-[#7E8494]">Service Fee</span>
            <span className="font-[700] text-[#0A0D12]">Rp{serviceFee.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex items-center justify-between text-[16px] pt-2 border-t border-slate-100">
            <span className="font-[400] text-[#0A0D12]">Total</span>
            <span className="font-[800] text-[#0A0D12]">Rp{totalBill.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full h-[48px] bg-[#C12116] hover:bg-[#a81c12] text-white font-[700] text-[15px] rounded-[100px] mt-2 cursor-pointer shadow-sm"
        >
          See My Orders
        </Button>
      </div>
    </div>
  );
}