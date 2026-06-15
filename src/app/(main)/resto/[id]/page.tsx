"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useGetRestaurantDetail } from "@/lib/query/resto";
import { useAddToCart, useGetCart } from "@/lib/query/useCart"; 
import type { CartItem } from "@/types/resto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import RestoHero from "@/components/features/resto/RestoHero";
import MenuList from "./_components/MenuList";
import ReviewCard from "@/components/features/resto/ReviewCard";
import { Menu } from '../../../../types/resto';

export default function RestoDetailPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "";
  
  const { data: resto, isLoading, isError } = useGetRestaurantDetail(id);
  
  const addToCartMutation = useAddToCart();
  
  const { data: cartResponse } = useGetCart();
  const rawCartData = cartResponse?.data as Record<string, unknown> | undefined;

  const activeCartItems: CartItem[] = Array.isArray(cartResponse?.data)
    ? cartResponse.data
    : Array.isArray(rawCartData?.cart)
    ? (rawCartData.cart as CartItem[])
    : Array.isArray(rawCartData?.items)
    ? (rawCartData.items as CartItem[])
    : [];

  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (addToCartMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  }, [addToCartMutation.isSuccess, queryClient]);

  const handleAddToCartAction = (menuId: string, quantity: number) => {
    if (!resto?.id) return;

    addToCartMutation.mutate({
      restaurantId: Number(resto.id),
      menuId: Number(menuId),
      quantity: quantity,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full py-40 flex justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !resto) {
    return (
      <div className="w-full py-20 flex justify-center bg-white">
        <EmptyState message="Detail restoran tidak ditemukan." />
      </div>
    );
  }

  const displayMenus =
    resto.menus?.filter((menu: Menu) => {
      if (activeTab === "all") return true;
      return menu.type.toLowerCase() === activeTab.toLowerCase();
    }) ?? [];

  return (
    <div className="w-full max-w-[393px] md:max-w-[1440px] mx-auto bg-white px-[16px] md:px-[120px] flex flex-col gap-[16px] md:gap-[32px] pt-[80px] md:pt-[112px] pb-[40px] tracking-normal transition-all duration-200">
      <RestoHero resto={resto} />
      
      <div className="w-full max-w-[361px] md:max-w-[1200px] flex flex-col gap-[16px] md:gap-[32px] flex-shrink-0">
        <h2 className="text-[24px] md:text-[36px] font-[800] text-[#0A0D12] tracking-tight leading-none m-0 p-0">
          Menu
        </h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col gap-[16px] md:gap-[24px]">
          <TabsList className="w-full justify-start gap-[8px] md:gap-[12px] bg-transparent h-[40px] md:h-[46px] p-0 border-none flex-shrink-0 flex items-center overflow-x-auto scrollbar-none">
            <TabsTrigger 
              value="all" 
              className={`h-[40px] md:h-[46px] px-[16px] py-[8px] rounded-full border transition-all duration-200 shadow-none outline-none focus-visible:ring-0 data-[state=active]:shadow-none data-[state=active]:bg-[#FFECEC] ${
                activeTab === 'all' ? 'bg-[#FFECEC] border-[#C12116] text-[#C12116] font-[700]' : 'bg-transparent border-[#D5D7DA] text-[#0A0D12] font-[600]'
              } text-[14px] md:text-[16px] tracking-[-2%] leading-none cursor-pointer`}
            >
              All Menu
            </TabsTrigger>

            <TabsTrigger 
              value="food" 
              className={`h-[40px] md:h-[46px] px-[16px] py-[8px] rounded-full border transition-all duration-200 shadow-none outline-none focus-visible:ring-0 data-[state=active]:shadow-none data-[state=active]:bg-[#FFECEC] ${
                activeTab === 'food' ? 'bg-[#FFECEC] border-[#C12116] text-[#C12116] font-[700]' : 'bg-transparent border-[#D5D7DA] text-[#0A0D12] font-[600]'
              } text-[14px] md:text-[16px] tracking-[-2%] leading-none cursor-pointer`}
            >
              Food
            </TabsTrigger>

            <TabsTrigger 
              value="drink" 
              className={`h-[40px] md:h-[46px] px-[16px] py-[8px] rounded-full border transition-all duration-200 shadow-none outline-none focus-visible:ring-0 data-[state=active]:shadow-none data-[state=active]:bg-[#FFECEC] ${
                activeTab === 'drink' ? 'bg-[#FFECEC] border-[#C12116] text-[#C12116] font-[700]' : 'bg-transparent border-[#D5D7DA] text-[#0A0D12] font-[600]'
              } text-[14px] md:text-[16px] tracking-[-2%] leading-none cursor-pointer`}
            >
              Drink
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="m-0 outline-none w-full p-0 border-none">
            <MenuList 
              menus={displayMenus}
              onAddMenu={handleAddToCartAction}
              isMutating={addToCartMutation.isPending}
              cartItems={activeCartItems} 
            />
          </TabsContent>
        </Tabs>
        
        {resto.menus && resto.menus.length > 8 && (
          <div className="w-full flex justify-center mt-2 flex-shrink-0">
            <Button 
              variant="outline" 
              className="w-[160px] h-[40px] md:h-[48px] rounded-full border-[#D5D7DA] text-[#0A0D12] font-[700] text-[14px] md:text-[16px] tracking-[-2%] bg-transparent hover:bg-slate-50 transition-colors flex items-center justify-center p-0 cursor-pointer"
            >
              Show More
            </Button>
          </div>
        )}
      </div>

      <hr className="w-full max-w-[361px] md:max-w-[1200px] border-t border-[#D5D7DA] my-2 p-0 mx-auto" />
      
      <div className="w-full max-w-[361px] md:max-w-[1200px] flex flex-col gap-[24px] flex-shrink-0">
        <div className="w-full flex flex-col gap-[8px] md:gap-[12px]">
          <h2 className="text-[24px] md:text-[36px] font-[800] text-[#0A0D12] tracking-tight m-0 p-0">
            Review
          </h2>
          <div className="text-[16px] md:text-[20px] font-[800] text-[#0A0D12] flex items-center gap-[4px] h-[30px] md:h-[34px] leading-none">
            <span className="text-[#FFAB0D] text-[20px] md:text-[24px] select-none">⭐</span>
            <span className="align-middle">{resto.star ? resto.star.toFixed(1) : "4.9"}</span>
            <span className="text-slate-400 font-[400] text-[14px] md:text-[16px] ml-[2px] align-middle">
              ({resto.reviews?.length || 24} Ulasan)
            </span>
          </div>
        </div>

        {!resto.reviews || resto.reviews.length === 0 ? (
          <p className="text-slate-400 font-medium text-sm m-0">Belum ada ulasan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] w-full">
            {resto.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}