"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ProfileDropdown from "@/components/shared/navbar/ProfileDropDown"; 
import { useGetCart } from "@/lib/query/useCart"; 

interface NavDesktopProps {
  isScrolled: boolean;
  isLoggedIn: boolean;
  user: { name?: string; email?: string; avatar?: string | null } | null;
  logout: () => void;
  router: AppRouterInstance;
}

interface NavbarCartItem {
  id: number;
  quantity: number;
}

interface NavbarCartGroup {
  id: number;
  items: NavbarCartItem[];
}

export default function NavDesktop({ isScrolled, isLoggedIn, user, logout, router }: NavDesktopProps) {
  const pathname = usePathname();
  const isDetailPage = pathname?.includes("/resto");
  const { data: cartResponse } = useGetCart(); 
  const rawCartData = cartResponse?.data as Record<string, unknown> | undefined;
  const apiCartGroups = rawCartData?.cart as NavbarCartGroup[] || [];

  const totalCartBadge = apiCartGroups.reduce((totalGroupSum, group) => {
    const groupItemsCount = Array.isArray(group.items)
      ? group.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0)
      : 0;
    return totalGroupSum + groupItemsCount;
  }, 0);

  return (
    <div className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] hidden md:flex items-center justify-between flex-shrink-0 ${
      isDetailPage || isScrolled 
        ? "bg-white shadow-[0px_0px_20px_0px_rgba(203,202,202,0.4)]" 
        : "bg-transparent"
    }`}>
      <div className="w-full max-w-[1440px] mx-auto h-full pl-[120px] pr-[120px] flex items-center justify-between flex-shrink-0">
        
        <Link href="/" className="w-[149px] h-[42px] flex items-center gap-[15px] flex-shrink-0 select-none">
          <div className="relative w-[42px] h-[42px] flex-shrink-0">
            <Image
              src={isDetailPage || isScrolled ? "/logos/Logo.png" : "/logos/Logo-Dekstop.png"}
              alt="Foody Desktop Ikon"
              fill
              sizes="42px"
              className="object-contain"
              priority
            />
          </div>
          <span className={`w-[92px] h-[42px] flex items-center text-[24px] md:text-[30px] font-[800] leading-none tracking-[0%] font-sans transition-colors duration-300 ${
            isDetailPage || isScrolled ? "text-[#0A0D12]" : "text-white"
          }`}>
            Foody
          </span>
        </Link>

        <div className="flex items-center flex-shrink-0">
          {isLoggedIn ? (
            <div className="w-[193px] h-[48px] flex items-center gap-[24px] flex-shrink-0 justify-end">
              
              <Link 
                href="/cart" 
                className="relative w-[34px] h-[34px] rounded-full bg-[#C12116] flex items-center justify-center text-white p-[6.67px] flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                <div className="relative w-[20px] h-[20px] flex-shrink-0">
                  <Image 
                    src="/icons/Icon-Group.png" 
                    alt="Foody Custom Cart Ikon Figma"
                    fill
                    sizes="20px"
                    className="object-contain"
                    priority
                  />
                </div>

                {totalCartBadge > 0 && (
                  <Badge className="absolute -top-[5px] -right-[5px] bg-[#0A0D12] hover:bg-[#0A0D12] text-white text-[11px] w-[20px] h-[20px] rounded-full flex items-center justify-center font-[700] p-0 border border-white leading-none tracking-[-2%] animate-in zoom-in-50 duration-200">
                    {totalCartBadge}
                  </Badge>
                )}
              </Link>
              
              <div className="w-[137px] h-[48px] flex-shrink-0">
                <ProfileDropdown isScrolled={isDetailPage ? true : isScrolled} user={user} logout={logout} router={router} />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-[16px] h-[48px]">
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
                className={isDetailPage || isScrolled ? "bg-[#0A0D12] text-white hover:bg-black" : "bg-white text-[#0A0A0F] hover:bg-white/90"}
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}