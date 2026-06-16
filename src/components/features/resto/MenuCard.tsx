"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuCardProps } from "@/types/resto";

export default function MenuCard({
  menu,
  onAddToCart,
  isAdding,
  currentQuantity,
}: MenuCardProps) {
  const { id, foodName, image, price } = menu;

  const [localQuantity, setLocalQuantity] = useState(0);
const quantity =
  localQuantity > 0
    ? localQuantity
    : currentQuantity;
  
  const handleInitialAdd = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalQuantity(1);
    onAddToCart(String(id), 1);
  };

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const nextQty = localQuantity + 1;

    setLocalQuantity(nextQty);
    onAddToCart(String(id), nextQty);
  };

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const nextQty = Math.max(0, localQuantity - 1);

    setLocalQuantity(nextQty);
    onAddToCart(String(id), nextQty);
  };

  return (
    <div className="relative z-10 flex h-[306.5px] w-[172px] flex-shrink-0 select-none flex-col justify-between overflow-hidden rounded-[16px] border border-slate-50 bg-white shadow-[0px_0px_20px_0px_rgba(203,202,202,0.4)] md:h-[379px] md:w-[285px]">
      <div className="relative h-[172.5px] w-full flex-shrink-0 bg-slate-50 md:h-[285px]">
        <Image
          src={
            image && image !== "string"
              ? image
              : "/images/hero-fallback.jpg"
          }
          alt={foodName || "Food Name"}
          fill
          priority
          sizes="(max-width: 768px) 172px, 285px"
          className="object-cover"
        />
      </div>

      <div className="z-20 flex w-full flex-1 flex-col justify-between gap-[8px] bg-white p-[12px] md:flex-row md:items-center md:gap-0 md:p-[16px]">
        <div className="min-w-0 flex-shrink-0 md:w-[120px]">
          <h4 className="truncate text-[14px] font-medium leading-tight text-[#0A0D12] md:text-[16px]">
            {foodName}
          </h4>

          <span className="text-[16px] font-extrabold leading-none text-[#0A0D12] md:text-[18px]">
            Rp{price.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="relative z-30 flex w-full items-center justify-start md:w-auto md:justify-end">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleInitialAdd}
              disabled={isAdding}
              className="relative z-40 flex h-[36px] w-full cursor-pointer items-center justify-center rounded-full bg-[#C12116] p-0 text-[14px] font-bold text-white transition-colors hover:bg-[#A31B12] disabled:opacity-50 md:h-[40px] md:w-[79px] md:text-[16px]"
            >
              Add
            </button>
          ) : (
            <div className="relative z-40 flex h-[36px] w-full flex-shrink-0 items-center justify-between gap-[16px] select-none md:h-[40px] md:w-[123px] md:justify-end">
              <button
                type="button"
                onClick={handleDecrement}
                className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#D5D7DA] bg-white"
              >
                −
              </button>

              <span className="text-[14px] font-semibold md:text-[18px]">
                {localQuantity}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#C12116] text-white"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}