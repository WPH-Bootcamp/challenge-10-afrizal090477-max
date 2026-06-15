"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserSidebar } from "@/components/features/orders/UserSidebar";
import { OrderCard } from "@/components/features/orders/OrderCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Search, ChevronLeft } from "lucide-react";
import { useGetOrders } from "@/lib/query/useOrder";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProfile } from "@/lib/query/useAuth";
import { useAuthStore } from "@/store/auth.store";

// 🟢 KUNCI TYPE SAFETY: Definisikan interface murni sesuai schema response Swagger
interface OrderDetailItem {
  foodName: string;
  foodImage: string;
  quantity: number;
  price: number;
}

interface OrderSwaggerData {
  id: number;
  restaurantName?: string;
  restaurantLogo?: string;
  foodName?: string;
  foodImage?: string;
  quantity?: number;
  price?: number;
  totalPrice?: number;
  status?: string;
  items?: OrderDetailItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("done");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: profileResponse } = useGetProfile();
  const storeUser = useAuthStore((state) => state.user);
  
  const currentUserName = profileResponse?.data?.name || storeUser?.name || "User";
  const currentUserAvatar = profileResponse?.data?.avatar || storeUser?.avatar || undefined;
  const { data: response, isLoading, isError } = useGetOrders({
    status: activeTab,
    limit: 10,
    page: 1,
  });

  const orderList: OrderSwaggerData[] = response?.data?.orders || response?.orders || [];

  const filteredOrders = orderList.filter((order: OrderSwaggerData) => {
    const item = order.items?.[0];
    const foodName = item?.foodName || order.foodName || "";
    const restaurantName = order.restaurantName || "";
    return (
      foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-[120px] md:pt-[140px] pb-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-start gap-6 lg:gap-[32px]">
        <UserSidebar activeMenu="orders" userName={currentUserName} userAvatar={currentUserAvatar} />
        <div className="w-full lg:w-[928px] flex flex-col gap-4 md:gap-[24px]">
          <div className="w-full flex items-center gap-2 h-[42px]">
            <button 
              onClick={() => router.push("/")}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer block lg:hidden"
            >
              <ChevronLeft className="w-6 h-6 text-[#0A0D12]" />
            </button>
            <h1 className="text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-tight leading-none">
              My Orders
            </h1>
          </div>

          <div 
            className="w-full bg-white rounded-[16px] p-4 md:p-[24px] flex flex-col gap-5 md:gap-[20px]"
            style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
          >
            
            <div className="w-full max-w-[598px] h-[44px] flex items-center gap-[6px] px-[16px] rounded-full border border-[#D5D7DA] bg-white focus-within:border-[#C12116] transition-all">
              <Search className="w-[20px] h-[20px] text-[#535862]" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent border-none text-[14px] text-[#0A0D12] font-[400] placeholder-[#535862] focus:outline-none"
              />
            </div>

            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value)} 
              className="w-full max-w-[598px] flex flex-col gap-4"
            >
              <div className="w-full flex items-center min-h-[46px] gap-[12px] overflow-x-auto pb-2 scrollbar-none">
                <span className="text-[16px] md:text-[18px] font-[700] text-[#0A0D12] tracking-[-3%] flex items-center h-full flex-shrink-0">
                  Status
                </span>
                
                <TabsList className="bg-transparent p-0 gap-[8px] md:gap-[12px] h-[46px] border-none shadow-none flex items-center flex-row flex-nowrap">
                  <TabsTrigger
                    value="preparing"
                    className="px-[14px] md:px-[16px] h-[40px] md:h-[46px] rounded-[100px] text-[13px] md:text-[15px] font-[600] border border-[#D5D7DA] bg-white text-[#0A0D12] data-[state=active]:bg-[#FFECEC] data-[state=active]:border-[#C12116] data-[state=active]:text-[#C12116] data-[state=active]:font-[700] transition-all shadow-none flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    Preparing
                  </TabsTrigger>

                  <TabsTrigger
                    value="on-the-way"
                    className="px-[14px] md:px-[16px] h-[40px] md:h-[46px] rounded-[100px] text-[13px] md:text-[15px] font-[600] border border-[#D5D7DA] bg-white text-[#0A0D12] data-[state=active]:bg-[#FFECEC] data-[state=active]:border-[#C12116] data-[state=active]:text-[#C12116] data-[state=active]:font-[700] transition-all shadow-none flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    On the Way
                  </TabsTrigger>

                  <TabsTrigger
                    value="delivered"
                    className="px-[14px] md:px-[16px] h-[40px] md:h-[46px] rounded-[100px] text-[13px] md:text-[15px] font-[600] border border-[#D5D7DA] bg-white text-[#0A0D12] data-[state=active]:bg-[#FFECEC] data-[state=active]:border-[#C12116] data-[state=active]:text-[#C12116] data-[state=active]:font-[700] transition-all shadow-none flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    Delivered
                  </TabsTrigger>

                  <TabsTrigger
                    value="done"
                    className="px-[14px] md:px-[16px] h-[40px] md:h-[46px] rounded-[100px] text-[13px] md:text-[15px] font-[600] border border-[#D5D7DA] bg-white text-[#0A0D12] data-[state=active]:bg-[#FFECEC] data-[state=active]:border-[#C12116] data-[state=active]:text-[#C12116] data-[state=active]:font-[700] transition-all shadow-none flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    Done
                  </TabsTrigger>

                  <TabsTrigger
                    value="canceled"
                    className="px-[14px] md:px-[16px] h-[40px] md:h-[46px] rounded-[100px] text-[13px] md:text-[15px] font-[600] border border-[#D5D7DA] bg-white text-[#0A0D12] data-[state=active]:bg-[#FFECEC] data-[state=active]:border-[#C12116] data-[state=active]:text-[#C12116] data-[state=active]:font-[700] transition-all shadow-none flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    Canceled
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="w-full flex flex-col gap-4 md:gap-[20px] mt-2">
                {isLoading && (
                  <div className="w-full flex justify-center items-center py-20">
                    <LoadingSpinner />
                  </div>
                )}

                {isError && (
                  <div className="w-full p-6 text-center border border-red-200 bg-red-50 rounded-[16px]">
                    <p className="text-sm font-medium text-red-600">
                      Gagal menarik data pesanan asli dari server backend API, bro.
                    </p>
                  </div>
                )}

                {!isLoading && !isError && filteredOrders.length === 0 && (
                  <div className="w-full h-[240px] flex flex-col items-center justify-center text-center gap-2 border border-dashed border-slate-200 rounded-[12px] bg-slate-50/50">
                    <div className="text-2xl">📦</div>
                    <h3 className="text-base font-bold text-[#0A0D12] mt-1">Belum ada transaksi</h3>
                    <p className="text-sm text-slate-400 max-w-[280px]">
                      Tidak ada riwayat transaksi aktif terdeteksi pada kategori status ini.
                    </p>
                  </div>
                )}

                {!isLoading && !isError && filteredOrders.length > 0 && (
                  filteredOrders.map((orderItem) => (
                    <OrderCard
                      key={orderItem.id}
                      order={orderItem}
                      onReviewClick={(id: number) => {
                        alert(`Buka popup modal review ulasan makanan untuk Order ID: ${id}`);
                      }}
                    />
                  ))
                )}
              </div>
            </Tabs>

          </div>
        </div>

      </div>
    </div>
  );
}