"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ProfileDropdown from "@/components/shared/navbar/ProfileDropDown"; 
import { useGetCart, CartItem } from "@/lib/query/useCart"; 

interface NavMobileProps {
  isScrolled: boolean;
  isLoggedIn: boolean;
  user: { name?: string; email?: string; avatar?: string | null } | null; 
  logout: () => void;
  router: AppRouterInstance;
}

export default function NavMobile({ isScrolled, isLoggedIn, user, logout, router }: NavMobileProps) {
  const pathname = usePathname();
  const isDetailPage = pathname?.includes("/resto");
  const { data: cartResponse } = useGetCart();
  const rawCartData = cartResponse?.data as Record<string, unknown> | undefined;

  const cartItems: CartItem[] = Array.isArray(cartResponse?.data)
    ? cartResponse.data
    : Array.isArray(rawCartData?.cart)
    ? (rawCartData.cart as CartItem[])
    : Array.isArray(rawCartData?.items)
    ? (rawCartData.items as CartItem[])
    : [];

  const totalCartBadge = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[64px] flex md:hidden items-center justify-between flex-shrink-0 ${
      isDetailPage || isScrolled
        ? "bg-white shadow-[0px_0px_20px_0px_rgba(203,202,202,0.4)] border-b border-slate-100"
        : "bg-transparent"
    }`}>
      <div className="w-full max-w-[393px] mx-auto h-full px-[16px] flex items-center justify-between flex-shrink-0">
        <Link 
          href="/" 
          className="w-[40px] h-[40px] relative flex-shrink-0 select-none block"
        >
          <Image
            src={isDetailPage || isScrolled ? "/logos/Logo.png" : "/logos/Logo-Dekstop.png"}
            alt="Foody Mobile Logo Brand"
            fill
            sizes="40px"
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex items-center flex-shrink-0">
          {isLoggedIn ? (
            <div className="w-[84px] h-[40px] flex items-center gap-[16px] flex-shrink-0 justify-end">
              <Link
                href="/cart"
                className="relative w-[34px] h-[34px] rounded-full bg-[#C12116] flex items-center justify-center text-white p-[6.67px] flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                <div className="relative w-[20px] h-[20px] flex-shrink-0">
                  <Image 
                    src="/icons/Icon-Group.png" 
                    alt="Foody Custom Cart Ikon Figma Mobile"
                    fill
                    sizes="20px"
                    className="object-contain"
                    priority
                  />
                </div>
                
                {totalCartBadge > 0 && (
                  <Badge className="absolute -top-[5px] -right-[5px] bg-white text-[#C12116] hover:bg-white text-[12px] w-[20px] h-[20px] rounded-full flex items-center justify-center font-[700] p-0 border border-[#C12116] leading-[23.33px] tracking-[-2%] shadow-sm">
                    {totalCartBadge}
                  </Badge>
                )}
              </Link>


              <div className="w-[40px] h-[40px] flex-shrink-0">
                <ProfileDropdown isScrolled={isDetailPage ? true : isScrolled} user={user} logout={logout} router={router} />
              </div>

            </div>
          ) : (
            <div className="flex items-center gap-2 h-auto">
              <Button
                asChild
                variant="navbarSignIn"
                size="navbar"
                className={isDetailPage || isScrolled ? "border-[#D5D7DA] text-slate-700 hover:bg-slate-50" : "border-white/50 text-white hover:bg-white/10"}
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="navbarSignUp"
                size="navbar"
                className={isDetailPage || isScrolled ? "bg-[#0A0D12] text-white hover:bg-black" : "bg-white text-[#0A0D12] hover:bg-white/90"}
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}