"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense } from "react"; 
import dynamic from "next/dynamic";
import HeroSection from "@/components/features/resto/HeroSection";
import RestaurantList from "@/components/features/resto/RestaurantList";
import ShowMoreButton from "@/components/features/resto/ShowMoreButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { useGetRestaurants, useSearchRestaurants } from "@/lib/query/resto";
import { RestoCategories } from "@/constants";
import type { RestaurantUI, Restaurant, FilterBarProps } from "@/types/resto";

const FilterBarDynamic = dynamic<FilterBarProps>(
  () => import("@/components/features/resto/FilterBar"),
  { ssr: false },
);

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const limitParam = parseInt(searchParams.get("limit") || "12", 10);
  const isUserSearching = searchParam.trim().length > 0;

  const {
    data: defaultRestaurants = [],
    isLoading: isLoadingDefault,
    isError: isErrorDefault,
  } = useGetRestaurants({ limit: limitParam });

  const {
    data: searchRestaurantsData = [],
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchRestaurants(searchParam);

  const rawRestaurants: Restaurant[] = isUserSearching
    ? searchRestaurantsData
    : defaultRestaurants;

  const isLoading = isUserSearching ? isLoadingSearch : isLoadingDefault;
  const isError = isUserSearching ? isErrorSearch : isErrorDefault;

  const filteredRestaurants = rawRestaurants.filter((restaurant) => {
    if (!categoryParam) return true;
    switch (categoryParam) {
      case "All Restaurant":
      case "All+Restaurant":
        return true;
      case "Nearby":
        return (restaurant.distance || 2.4) <= 5;
      case "Best Seller":
        return restaurant.star >= 4.5;
      case "Discount":
      case "Delivery":
      case "Lunch":
        return true;
      default:
        return true;
    }
  });

  const displayedRestaurants: RestaurantUI[] = filteredRestaurants.map(
    (item) => {
      const finalImage =
        item.images && item.images.length > 0 ? item.images[0] : item.logo;
      
      let displayDistance = item.distance;
      if (!displayDistance || displayDistance === 0) {
        displayDistance = item.id === 6 ? 2.4 : Number(`2.${(Number(item.id) % 7) + 1}`);
      }

      return {
        id: String(item.id),
        name: item.name || "Unnamed Restaurant",
        rating: item.star ? item.star.toFixed(1) : "0.0",
        location: item.place || "Lokasi tidak diketahui",
        distance: `${displayDistance.toFixed(1)} km`,
        imageSrc:
          finalImage && finalImage !== "string" ? finalImage : undefined,
        fallbackText: item.name
          ? item.name.substring(0, 2).toUpperCase()
          : "RE",
      };
    },
  );

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
      params.delete("category");
    } else {
      params.delete("search");
    }
    params.set("limit", "12");
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
      params.delete("search");
    } else {
      params.delete("category");
    }
    params.set("limit", "12");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleShowMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(limitParam + 12));
    router.push(`?${params.toString()}`);
  };

  const isAllRestoActive =
    categoryParam === "All Restaurant" || categoryParam === "All+Restaurant";

  return (
    <div className="w-full flex flex-col pb-20 bg-white">
      <HeroSection searchQuery={searchParam} onSearchChange={handleSearch} />
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0 relative">
        <FilterBarDynamic
          categories={RestoCategories}
          activeCategory={categoryParam}
          onCategoryChange={handleCategoryChange}
        />

        <div
          className={`w-full flex flex-col ${
            isAllRestoActive ? "md:flex-row md:gap-[40px]" : ""
          } items-start mt-[32px]`}
        >
          {isAllRestoActive && (
            <div className="hidden md:block w-[266px] h-[792px] flex-shrink-0" />
          )}

          <div className="flex-1 w-full flex flex-col gap-[20px]">
            {isLoading ? (
              <div className="w-full flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : isError ? (
              <div className="w-full text-center text-red-500 font-bold py-20">
                Gagal memuat data restoran. Silakan coba beberapa saat lagi.
              </div>
            ) : displayedRestaurants.length === 0 ? (
              <div className="w-full flex justify-center items-center py-10">
                <EmptyState message="Ups! Tidak ada restoran yang cocok dengan kriteria pencarianmu." />
              </div>
            ) : (
              <RestaurantList restaurants={displayedRestaurants} />
            )}

            {!isUserSearching &&
              !isLoading &&
              !isError &&
              defaultRestaurants.length === limitParam && (
                <div className="w-full flex justify-center mt-4">
                  <ShowMoreButton onClick={handleShowMore} />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense 
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-4 border-[#C12116] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}