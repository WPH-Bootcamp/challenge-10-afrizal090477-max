"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";
import { UserSidebar } from "@/components/features/orders/UserSidebar";
import { OrderCard } from "@/components/features/orders/OrderCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrders } from "@/lib/query/useOrder";
import { useGetProfile } from "@/lib/query/useAuth";
import { useAuthStore } from "@/store/auth.store";
import type { ApiOrder, OrderData } from "@/types/order";

// Import Komponen Review & Hook Mutation yang sudah kita buat
import { ReviewModal } from "@/components/features/review/ReviewModal";
import { useCreateReview } from "@/lib/query/useReview";

const TAB_TRIGGER_CLASS =
  "h-[46px] rounded-full border border-[#D5D7DA] bg-white px-4 text-[15px] font-semibold text-[#0A0D12] transition-all duration-200 data-[state=active]:border-[#C12116] data-[state=active]:bg-[#FFECEC] data-[state=active]:font-bold data-[state=active]:text-[#C12116]";

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("done");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: profileResponse } = useGetProfile();
  const storeUser = useAuthStore((state) => state.user);
  const currentUserName = profileResponse?.name ?? storeUser?.name ?? "User";
  const currentUserAvatar =
    profileResponse?.avatar ?? storeUser?.avatar ?? undefined;

  // --- 1. STATE & HOOK INTEGRASI REVIEW MODAL ---
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const { mutate: submitReview, isPending: isSubmittingReview } = useCreateReview(() => {
    alert("Review berhasil dikirim!");
    setIsModalOpen(false);
    setSelectedOrder(null);
  });
  // ----------------------------------------------

  const {
    data: response,
    isLoading,
    isError,
  } = useGetOrders({
    status: activeTab,
    limit: 10,
    page: 1,
  });

  const orderList: OrderData[] = useMemo(() => {
    const rawOrders: ApiOrder[] = response?.data?.orders ?? [];

    return rawOrders.map((order) => {
      const restaurantData = order.restaurants?.[0];
      const restaurant = restaurantData?.restaurant;
      const item = restaurantData?.items?.[0];
      return {
        id: order.id, // ID internal number
        transactionId: order.transactionId, // String UUID dari backend (Misal: "TX1715...")
        restaurantId: restaurant?.id ?? 0,
        restaurantName: restaurant?.name ?? "",
        restaurantLogo: restaurant?.logo ?? "",
        foodName: item?.menuName ?? "",
        foodImage: item?.image ?? "",
        quantity: item?.quantity ?? 0,
        price: item?.price ?? 0,
        totalPrice: order.pricing?.totalPrice ?? 0,
        status: order.status ?? "",
      };
    });
  }, [response?.data?.orders]);

  const filteredOrders = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return orderList.filter((order) => {
      return (
        order.foodName?.toLowerCase().includes(keyword) ||
        order.restaurantName?.toLowerCase().includes(keyword)
      );
    });
  }, [orderList, searchQuery]);

  // --- 2. HANDLER TRIGGER SAAT TOMBOL DI CLICK ---
  const handleReviewClick = (orderId: number) => {
    const targetOrder = orderList.find((order) => order.id === orderId);
    if (targetOrder) {
      setSelectedOrder(targetOrder);
      setIsModalOpen(true);
    }
  };

  const handleReviewSubmit = (formData: { star: number; comment: string }) => {
    if (!selectedOrder) return;

    // Kirim payload tepat sesuai dokumentasi Swagger API lo, bro!
    submitReview({
      transactionId: selectedOrder.transactionId, // String UUID dari Swagger
      restaurantId: selectedOrder.restaurantId,    // Number id restaurant
      star: formData.star,                         // Rating bintang dari modal
      comment: formData.comment,                   // Komentar dari modal
    });
  };
  // -----------------------------------------------

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[120px] md:pt-[140px] pb-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-4 md:px-6 lg:flex-row lg:gap-8">
        <UserSidebar
          activeMenu="orders"
          userName={currentUserName}
          userAvatar={currentUserAvatar}
        />
        <div className="flex w-full flex-col gap-6 lg:w-[928px]">
          <div className="flex h-[42px] items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className="block cursor-pointer rounded-full p-2 transition hover:bg-slate-100 lg:hidden"
            >
              <ChevronLeft className="h-6 w-6 text-[#0A0D12]" />
            </button>
            <h1 className="text-[24px] font-extrabold text-[#0A0D12] md:text-[32px]">
              My Orders
            </h1>
          </div>
          <div
            className="rounded-[16px] bg-white p-4 md:p-6"
            style={{
              boxShadow: "0px 0px 20px 0px #CBCACA40",
            }}
          >
            <div className="mb-5 flex h-[44px] w-full max-w-[598px] items-center gap-[6px] rounded-full border border-[#D5D7DA] px-4 focus-within:border-[#C12116]">
              <Search className="h-5 w-5 text-[#535862]" />

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders..."
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#535862]"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="mb-5 flex items-center gap-3 overflow-x-auto">
                <span className="shrink-0 text-[18px] font-bold text-[#0A0D12]">
                  Status
                </span>

                <TabsList className="flex flex-nowrap gap-3 bg-transparent p-0">
                  <TabsTrigger value="preparing" className={TAB_TRIGGER_CLASS}>
                    Preparing
                  </TabsTrigger>

                  <TabsTrigger value="on-the-way" className={TAB_TRIGGER_CLASS}>
                    On The Way
                  </TabsTrigger>

                  <TabsTrigger value="delivered" className={TAB_TRIGGER_CLASS}>
                    Delivered
                  </TabsTrigger>

                  <TabsTrigger value="done" className={TAB_TRIGGER_CLASS}>
                    Done
                  </TabsTrigger>

                  <TabsTrigger value="canceled" className={TAB_TRIGGER_CLASS}>
                    Canceled
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-col gap-5">
                {isLoading && (
                  <div className="flex justify-center py-20">
                    <LoadingSpinner />
                  </div>
                )}

                {isError && (
                  <div className="rounded-[16px] border border-red-200 bg-red-50 p-6 text-center">
                    <p className="text-sm font-medium text-red-600">
                      Gagal mengambil data order dari server.
                    </p>
                  </div>
                )}

                {!isLoading && !isError && filteredOrders.length === 0 && (
                  <div className="flex h-[240px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center">
                    <div className="text-2xl">📦</div>

                    <h3 className="font-bold text-[#0A0D12]">
                      Belum ada transaksi
                    </h3>

                    <p className="text-sm text-slate-400">
                      Tidak ada transaksi pada status ini.
                    </p>
                  </div>
                )}

                {!isLoading &&
                  !isError &&
                  filteredOrders.map((orderItem) => (
                    <OrderCard
                      key={orderItem.id}
                      order={orderItem}
                      // --- 3. PASANG HANDLERNYA DI SINI BRO ---
                      onReviewClick={handleReviewClick}
                    />
                  ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* --- 4. RENDER MODAL-NYA DI PALING BAWAH --- */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onSubmit={handleReviewSubmit}
        isLoading={isSubmittingReview}
      />
    </div>
  );
}