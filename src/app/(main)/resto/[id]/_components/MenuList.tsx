"use client";

import MenuCard from "@/components/features/resto/MenuCard";
import type { MenuListProps, CartItem } from "@/types/resto";

export default function MenuList({
  menus,
  onAddMenu,
  isMutating,
  cartItems = [],
}: MenuListProps) {

  const safeCartItems: CartItem[] = Array.isArray(cartItems)
    ? cartItems
    : [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
      {menus.map((menu) => {
        const currentCartItem = safeCartItems.find((cartItem: CartItem) => {
          return cartItem.menu?.id === menu.id;
        });

        const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

        return (
          <MenuCard
            key={menu.id}
            menu={menu}
            currentQuantity={currentQuantity}
            isAdding={isMutating}
            onAddToCart={onAddMenu}
          />
        );
      })}
    </div>
  );
}