"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Share2, ChevronLeft, ChevronRight } from "lucide-react"; 
import type { RestaurantDetail } from "@/types/resto";

interface RestoHeroProps {
  resto: RestaurantDetail;
}

export default function RestoHero({ resto }: RestoHeroProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const imagesList = resto.images && resto.images.length > 0 ? resto.images : [resto.logo];
  const activeImages = imagesList.slice(0, 3); 
  
  const mainPhoto = imagesList[0] || "/images/hero-fallback.jpg";
  const sidePhotoTop = imagesList[1] || mainPhoto;
  const sidePhotoBottomLeft = imagesList[2] || mainPhoto;
  const sidePhotoBottomRight = imagesList[3] || sidePhotoTop;

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const newIndex = Math.round(scrollLeft / clientWidth);
    setCurrentSlide(newIndex);
  };

  const handleSlideNavigation = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleShareAction = async () => {
    const shareData = {
      title: resto.name || "Foody Restaurant",
      text: `Yuk cek restoran ${resto.name || "ini"} di Foody App!`,
      url: window.location.href, 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link restoran berhasil disalin ke clipboard!");
      }
    } catch (error) {
      console.error("Gagal membagikan link:", error);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[16px] md:gap-[32px] px-[16px] md:px-0 pt-[16px] pb-[40px] flex-shrink-0">
      <div className="w-full flex items-center select-none">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-50 shadow-sm transition-all focus:outline-none"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="w-full md:hidden flex flex-col gap-[12px] items-center flex-shrink-0 select-none relative group">
        <div className="w-full max-w-[361px] h-[260.62px] relative rounded-[16px] overflow-hidden shadow-sm bg-slate-50">
          {currentSlide > 0 && (
            <button
              onClick={() => handleSlideNavigation("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 active:bg-white flex items-center justify-center text-[#0A0D12] shadow-md border border-slate-100"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>
          )}

          {currentSlide < activeImages.length - 1 && (
            <button
              onClick={() => handleSlideNavigation("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 active:bg-white flex items-center justify-center text-[#0A0D12] shadow-md border border-slate-100"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-[16px] scrollbar-none"
          >
            {activeImages.map((imgUrl, index) => (
              <div key={index} className="w-full h-full relative snap-center flex-shrink-0 min-w-full">
                <Image
                  src={imgUrl && imgUrl !== "string" ? imgUrl : "/images/hero-fallback.jpg"}
                  alt={`Mobile Foody Banner Resto Slide ${index + 1}`}
                  fill
                  sizes="361px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-[32px] h-[8px] flex items-center justify-center gap-[4px] flex-shrink-0">
          <span className={`w-[8px] h-[8px] rounded-full transition-colors duration-200 ${currentSlide === 0 ? "bg-[#C12116]" : "bg-[#D9D9D9]"}`} />
          <span className={`w-[8px] h-[8px] rounded-full transition-colors duration-200 ${currentSlide === 1 ? "bg-[#C12116]" : "bg-[#D9D9D9]"}`} />
          <span className={`w-[8px] h-[8px] rounded-full transition-colors duration-200 ${currentSlide === 2 ? "bg-[#C12116]" : "bg-[#D9D9D9]"}`} />
        </div>
      </div>

      <div className="hidden md:flex w-full max-w-[1200px] h-[470px] flex-row gap-[20px] select-none flex-shrink-0">
        <div className="w-[651px] h-full relative rounded-[16px] overflow-hidden bg-slate-50 shadow-sm flex-shrink-0">
          <Image
            src={mainPhoto && mainPhoto !== "string" ? mainPhoto : "/images/hero-fallback.jpg"}
            alt="Main Visual Resto Desktop"
            fill
            sizes="651px"
            className="object-cover"
            priority
          />
        </div>

        <div className="w-[529px] h-full flex flex-col gap-[20px] flex-shrink-0">
          <div className="w-full h-[302px] relative rounded-[16px] overflow-hidden bg-slate-50 shadow-sm flex-shrink-0">
            <Image
              src={sidePhotoTop && sidePhotoTop !== "string" ? sidePhotoTop : "/images/hero-fallback.jpg"}
              alt="Sub Visual Top Desktop"
              fill
              sizes="529px"
              className="object-cover"
            />
          </div>

          <div className="w-full h-[148px] flex gap-[20px] flex-shrink-0">
            <div className="w-[254.5px] h-full relative rounded-[16px] overflow-hidden bg-slate-50 shadow-sm flex-shrink-0">
              <Image
                src={sidePhotoBottomLeft && sidePhotoBottomLeft !== "string" ? sidePhotoBottomLeft : "/images/hero-fallback.jpg"}
                alt="Sub Visual Bottom 1 Desktop"
                fill
                sizes="254px"
                className="object-cover"
              />
            </div>
            <div className="w-[254.5px] h-full relative rounded-[16px] overflow-hidden bg-slate-50 shadow-sm flex-shrink-0">
              <Image
                src={sidePhotoBottomRight && sidePhotoBottomRight !== "string" ? sidePhotoBottomRight : "/images/hero-fallback.jpg"}
                alt="Sub Visual Bottom 2 Desktop"
                fill
                sizes="254px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] flex flex-row items-center justify-between gap-[16px] md:h-[120px] pb-2 flex-shrink-0">
        <div className="flex items-center gap-[8px] md:gap-[24px] flex-1 min-w-0 h-full">
          <div className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full border border-slate-100 shadow-sm overflow-hidden bg-white flex-shrink-0 relative">
            <Image
              src={resto.logo && resto.logo !== "string" ? resto.logo : "/logos/Logo.png"}
              alt="Brand Restaurant Logo Core"
              fill
              sizes="(max-w-768px) 90px, 120px"
              className="object-cover p-1"
              priority
            />
          </div>

          <div className="flex flex-col gap-[2px] md:gap-[4px] min-w-0">
            <h1 className="text-[18px] md:text-[32px] font-[800] text-[#0A0D12] tracking-[0%] leading-tight truncate">
              {resto.name || "Burger King"}
            </h1>
            
            <div className="flex items-center gap-[4px] h-[28px]">
              <div className="relative w-[24px] h-[24px] flex items-center justify-center">
                <Star className="text-[#FFAB0D] fill-[#FFAB0D] w-[17.12px] h-[16.35px]" />
              </div>
              <span className="text-[14px] md:text-[18px] font-[500] text-[#0A0D12] tracking-[0%]">
                {resto.star ? resto.star.toFixed(1) : "4.9"}
              </span>
            </div>

            <div className="flex items-center gap-[6px] text-[#0A0D12] text-[14px] md:text-[18px] h-[28px] font-[400] leading-tight truncate">
              <span className="truncate max-w-[92px] md:max-w-[400px] tracking-[-2%]">
                {resto.place || "Jakarta Selatan"}
              </span>
              <span className="inline-block w-[4px] h-[4px] bg-[#0A0D12] rounded-full opacity-30 flex-shrink-0" />
              <span className="tracking-[-2%] flex-shrink-0">
                {resto.distance ? `${resto.distance.toFixed(1)} km` : "2.4 km"}
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleShareAction}
          className="flex md:hidden w-[44px] h-[44px] items-center justify-center rounded-full border border-[#D5D7DA] bg-white text-[#0A0D12] hover:bg-slate-50 transition-colors focus:outline-none flex-shrink-0 select-none"
        >
          <Share2 size={20} className="text-[#0A0D12] stroke-[2]" />
        </button>

        <button 
          onClick={handleShareAction}
          className="hidden md:flex w-[140px] h-[44px] items-center justify-center pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[12px] rounded-[100px] border border-[#D5D7DA] bg-white text-[#0A0D12] hover:bg-slate-50 transition-colors focus:outline-none flex-shrink-0 select-none"
        >
          <Share2 size={18} className="text-[#0A0D12] stroke-[2.5]" />
          <span className="text-[14px] font-[700] tracking-[-2%]">Share</span>
        </button>

      </div>
    </div>
  );
}