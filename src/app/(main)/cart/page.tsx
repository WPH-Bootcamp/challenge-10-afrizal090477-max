"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetCart } from "@/lib/query/useCart";
import { ChevronRight } from "lucide-react";
import { CartItemCard, CartSummary } from "@/components/features/cart/CartComponents";
import { CartGroup } from "@/types/cart";

export default function CartPage() {
  const router = useRouter();
  const { data: response, isPending, isError } = useGetCart();
  const [isMutating, setIsMutating] = useState(false);

  // 💡 STATE MINIMALIS: Cukup simpan object perubahan kuantitas item (id_menu -> kuantitas_baru)
  const [qtyOverrides, setQtyOverrides] = useState<Record<number, number>>({});

  // Parsing data mentah dari API TanStack Query secara aman tanpa any
  const rawResponse = response as Record<string, unknown> | undefined;
  const innerData = rawResponse?.data as Record<string, unknown> | undefined;
  const apiCartGroups = innerData?.cart as CartGroup[] || [];

  // 💡 DERIVE STATE (Hitung Langsung saat Render): Gabungkan data API dengan override lokal lo bro
  const cartGroups = apiCartGroups.map((group) => {
    const updatedItems = group.items.map((item) => {
      const rawMenu = item.menu as unknown as Record<string, unknown>;
      const menuId = Number(item.menu?.id || rawMenu?.id || 0);

      // Jika menuId ini pernah diklik plus/minus, pakai kuantitas baru dari state lokal
      if (Object.prototype.hasOwnProperty.call(qtyOverrides, menuId)) {
        const targetQty = qtyOverrides[menuId];
        const price = Number(item.menu?.price || (typeof rawMenu?.price === 'number' ? rawMenu.price : 0) || 0);
        return {
          ...item,
          quantity: targetQty,
          itemTotal: price * targetQty,
        };
      }
      return item;
    });

    // Hitung ulang subtotal restoran secara real-time otomatis
    const currentSubtotal = updatedItems.reduce((sum, item) => {
      const price = Number(item.menu?.price || 0);
      return sum + price * item.quantity;
    }, 0);

    return {
      ...group,
      items: updatedItems,
      subtotal: currentSubtotal,
    };
  });

  // Handler interaksi tombol counter plus/minus
  const handleUpdateQuantity = (menuId: number, currentQty: number, action: 'increment' | 'decrement') => {
    setIsMutating(true);
    const targetQty = action === 'increment' ? currentQty + 1 : currentQty - 1;

    // Simpan perubahan ke state override murni lokal
    setQtyOverrides((prev) => ({
      ...prev,
      [menuId]: targetQty,
    }));
    
    setIsMutating(false);
  };

  return (
    <div className="w-full block bg-transparent pt-[120px] md:pt-[140px] pb-20 min-h-screen">
      <div className="w-full max-w-[800px] mx-auto px-4 md:px-0 flex flex-col gap-[32px]">
        
        <h1 className="w-full text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-normal flex items-center leading-none">
          My Cart
        </h1>

        {isPending && cartGroups.length === 0 && (
          <div className="w-full flex flex-col gap-[20px] animate-pulse">
            <div className="h-[388px] bg-slate-50 rounded-[16px] w-full" />
          </div>
        )}

        {isError && (
          <div className="w-full p-6 text-center border border-red-200 bg-red-50 rounded-[16px]">
            <p className="text-sm font-medium text-red-600">Gagal memuat data keranjang belanja.</p>
          </div>
        )}

        {!isPending && !isError && cartGroups.length === 0 && (
          <div className="w-full py-16 flex flex-col items-center justify-center gap-4 text-center">
            <div className="relative w-[120px] h-[120px] mb-2">
              <Image src="/icons/Icon-Group.png" alt="Empty" fill className="object-contain" priority />
            </div>
            <h3 className="text-lg font-[800] text-[#0A0D12]">Keranjangmu masih kosong</h3>
          </div>
        )}

        {/* CONTAINER GRUP LIST BOX */}
        {!isPending && !isError && cartGroups.length > 0 && (
          <div className="w-full flex flex-col gap-[20px]">
            {cartGroups.map((group) => {
              const restaurantId = Number(group.restaurant?.id || 0);
              const restaurantName = group.restaurant?.name || "Restaurant";
              const restaurantLogo = group.restaurant?.logo || "/icons/Burger-Bang.png";

              return (
                <div
                  key={restaurantId}
                  className="w-full h-auto min-h-[388px] bg-white rounded-[16px] p-4 md:p-[20px] flex flex-col gap-[20px]"
                  style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
                >
                  {/* HEADER RESTORAN */}
                  <div 
                    onClick={() => router.push(`/resto/${restaurantId}`)} 
                    className="w-fit h-[32px] flex items-center gap-[8px] cursor-pointer group select-none"
                  >
                    <div className="relative w-[32px] h-[32px] rounded-[4px] overflow-hidden bg-transparent flex-shrink-0">
                      <Image 
                        src={restaurantLogo} 
                        alt="Icon Resto" 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    <h3 className="text-[18px] font-[700] text-[#0A0D12] tracking-[-3%] leading-none truncate max-w-[150px]">
                      {restaurantName}
                    </h3>
                    <ChevronRight className="w-[24px] h-[24px] text-[#0A0D12]" style={{ strokeWidth: "2px" }} />
                  </div>

                  {/* AREA LIST MAKANAN */}
                  <div className="flex flex-col w-full">
                    {group.items.map((item) => (
                      <CartItemCard 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={handleUpdateQuantity}
                        isMutating={isMutating}
                      />
                    ))}
                  </div>

                  {/* AREA RINGKASAN TOTAL */}
                  <CartSummary 
                    items={group.items} 
                    onCheckout={() => router.push(`/checkout?restaurantId=${restaurantId}`)} 
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}