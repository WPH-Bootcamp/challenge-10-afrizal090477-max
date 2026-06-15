"use client";

import React, { useState, Suspense } from "react"; 
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCart } from "@/lib/query/useCart";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartApiResponse, CartGroup } from "@/types/cart";
import { BANKS } from "@/constants/bank"; 
import PaymentSuccessModal from "@/components/features/checkout/PaymentSuccessModal"; 


function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantIdParam = Number(searchParams.get("restaurantId") || 0);

  const { data: response, isPending, isError } = useGetCart();
  
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartResponse = response as CartApiResponse | undefined;
  const cartGroups: CartGroup[] = cartResponse?.data?.cart || [];

  const activeGroup = cartGroups.find(
    (g) => Number(g.restaurant?.id) === restaurantIdParam
  ) || cartGroups[0];

  const foodItems = activeGroup?.items || [];
  const priceItems = Number(activeGroup?.subtotal || 0);
  const totalItems = foodItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  const deliveryFee = priceItems > 0 ? 10000 : 0;
  const serviceFee = priceItems > 0 ? 1000 : 0;
  const finalTotalBill = priceItems + deliveryFee + serviceFee;

  const activeBankName = BANKS.find((b) => b.id === selectedBank)?.name || "";

  const handleBuyProcess = () => {
    if (foodItems.length === 0) return;
    
    if (!selectedBank) {
      alert("Silakan pilih metode pembayaran bank terlebih dahulu, bro!");
      return;
    }
    
    setIsModalOpen(true);
  };

  const handleCloseModalAndRedirect = () => {
    setIsModalOpen(false);
    router.push("/"); 
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 md:px-0 flex flex-col gap-[24px]">
      <h1 className="w-full text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-normal leading-none">
        Checkout
      </h1>

      {isPending && (
        <div className="w-full grid grid-cols-1 md:grid-cols-[590px_390px] gap-[20px] animate-pulse">
          <div className="h-[250px] bg-slate-50 rounded-[16px]" />
          <div className="h-[350px] bg-slate-50 rounded-[16px]" />
        </div>
      )}

      {isError && (
        <div className="w-full p-6 text-center border border-red-200 bg-red-50 rounded-[16px]">
          <p className="text-sm font-medium text-red-600">Gagal memuat detail data checkout pesanan.</p>
        </div>
      )}

      {!isPending && !isError && foodItems.length > 0 && (
        <div className="w-full flex flex-col lg:flex-row items-start gap-[20px]">
          
          <div className="w-full lg:w-[590px] flex flex-col gap-[20px]">
            <div 
              className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[16px]"
              style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-[8px] h-[32px]">
                  <MapPin className="w-[24px] h-[24px] text-[#0A0D12]" />
                  <span className="text-[18px] font-[800] text-[#0A0D12] tracking-[-2%]">
                    Delivery Address
                  </span>
                </div>
                <p className="text-[15px] font-[500] text-[#0A0D12] tracking-[-3%] leading-relaxed mt-1">
                  Jl. Sudirman No. 25, Jakarta Pusat, 10220
                </p>
                <p className="text-[15px] font-[500] text-[#0A0D12] tracking-[-3%] leading-none mt-1">
                  0812-3456-7890
                </p>
              </div>

              <Button
                variant="outline"
                className="w-[120px] h-[40px] rounded-[100px] border border-[#D5D7DA] text-[15px] font-[700] text-[#0A0D12] tracking-[-2%] bg-white hover:bg-slate-50 cursor-pointer"
              >
                Change
              </Button>
            </div>

            <div 
              className="w-full bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px]"
              style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
            >
              <div className="w-full flex items-center justify-between h-[40px]">
                <div className="flex items-center gap-[8px] h-[32px]">
                  <div className="relative w-[32px] h-[32px] rounded-[4px] overflow-hidden bg-transparent">
                    <Image 
                      src={activeGroup?.restaurant?.logo || "/icons/Burger-Bang.png"} 
                      alt="Resto Logo" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <span className="text-[18px] font-[700] text-[#0A0D12] tracking-[-3%]">
                    {activeGroup?.restaurant?.name}
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={() => router.push(`/resto/${restaurantIdParam}`)}
                  className="w-[120px] h-[40px] rounded-[100px] border border-[#D5D7DA] text-[15px] font-[700] text-[#0A0D12] tracking-[-2%] bg-white hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-1"
                >
                  Add item
                </Button>
              </div>

              <div className="flex flex-col w-full divide-y divide-dashed divide-slate-100 max-h-[300px] overflow-y-auto">
                {foodItems.map((item) => {
                  const price = Number(item.menu?.price || 0);
                  return (
                    <div key={item.id} className="w-full py-4 first:pt-0 last:pb-0 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-[17px] min-w-0">
                        <div className="relative w-[64px] h-[64px] rounded-[12px] overflow-hidden bg-slate-50 flex-shrink-0">
                          <Image 
                            src={item.menu?.image || "/icons/Burger-Bang.png"} 
                            alt="food" 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-[500] text-[#7E8494] leading-none mb-1">
                            Food Name
                          </span>
                          <h4 className="text-[16px] font-[800] text-[#0A0D12] tracking-tight truncate max-w-[180px]">
                            {item.menu?.foodName}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-[16px] font-[600] text-[#7E8494]">
                          x{item.quantity}
                        </span>
                        <span className="text-[16px] font-[800] text-[#0A0D12] min-w-[80px] text-right">
                          Rp{price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          <div 
            className="w-full lg:w-[390px] bg-white rounded-[16px] py-[20px] flex flex-col gap-[24px]"
            style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
          >
            <div className="w-full flex flex-col gap-[16px] px-[20px]">
              <h3 className="text-[18px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center">
                Payment Method
              </h3>

              <div className="flex flex-col w-full gap-[12px]">
                {BANKS.map((bank) => {
                  const isCurrentSelected = selectedBank === bank.id;

                  return (
                    <div 
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className="flex items-center justify-between w-full h-[40px] cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="relative w-[40px] h-[40px] rounded-[8px] border border-[#D5D7DA] bg-white flex-shrink-0 overflow-hidden">
                          <Image
                            src={`/images/${bank.id.toLowerCase()}.svg`}
                            alt={`${bank.name} Logo`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="text-[15px] font-[500] text-[#0A0D12] tracking-[-2%]">
                          {bank.name}
                        </span>
                      </div>

                      <div className="relative flex items-center justify-center flex-shrink-0">
                        <input 
                          type="radio"
                          name="payment_bank"
                          value={bank.id}
                          checked={isCurrentSelected}
                          onChange={() => setSelectedBank(bank.id)}
                          className="sr-only" 
                        />
                        
                        <div 
                          className={`w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all duration-200 ${
                            isCurrentSelected 
                              ? "bg-[#C12116]" 
                              : "border-[1.6px] border-[#A4A7AE] bg-transparent" 
                          }`}
                        >
                          {isCurrentSelected && (
                            <div className="w-[9.6px] h-[9.6px] rounded-full bg-white animate-in fade-in zoom-in-50 duration-150" />
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#E9EAEB]" />

            <div className="w-full flex flex-col gap-[16px] px-[20px]">
              <h3 className="text-[18px] font-[800] text-[#0A0D12] tracking-[-2%] h-[32px] flex items-center">
                Payment Summary
              </h3>

              <div className="w-full flex flex-col gap-[12px] text-[15px]">
                <div className="flex items-center justify-between h-[30px]">
                  <span className="font-[500] text-[#7E8494] tracking-[-3%]">Price ({totalItems} items)</span>
                  <span className="font-[700] text-[#0A0D12] tracking-[-2%]">Rp{priceItems.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex items-center justify-between h-[30px]">
                  <span className="font-[500] text-[#7E8494] tracking-[-3%]">Delivery Fee</span>
                  <span className="font-[700] text-[#0A0D12] tracking-[-2%]">Rp{deliveryFee.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex items-center justify-between h-[30px]">
                  <span className="font-[500] text-[#7E8494] tracking-[-3%]">Service Fee</span>
                  <span className="font-[700] text-[#0A0D12] tracking-[-2%]">Rp{serviceFee.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex items-center justify-between h-[32px] pt-2 border-t border-slate-100 mt-1">
                  <span className="font-[400] text-[#0A0D12] text-[16px] tracking-[-2%]">Total</span>
                  <span className="font-[800] text-[#0A0D12] text-[18px] tracking-[0%]">Rp{finalTotalBill.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <Button
                onClick={handleBuyProcess}
                className="w-full h-[48px] bg-[#C12116] hover:bg-[#a81c12] text-white font-[700] text-[15px] rounded-[100px] border-none mt-2 cursor-pointer flex items-center justify-center shadow-sm"
              >
                Buy
              </Button>
            </div>

          </div>

        </div>
      )}

      <PaymentSuccessModal 
        isOpen={isModalOpen}
        onClose={handleCloseModalAndRedirect}
        dateStr="25 August 2025, 15:51"
        bankName={activeBankName}
        priceItems={priceItems}
        totalItems={totalItems}
        deliveryFee={deliveryFee}
        serviceFee={serviceFee}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="w-full block bg-transparent pt-[120px] md:pt-[140px] pb-20 min-h-screen">
      <Suspense 
        fallback={
          <div className="w-full h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#C12116] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </div>
  );
}