'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row items-stretch overflow-hidden">
      <div className="hidden md:block md:w-1/2 relative bg-[#FDFDFD] overflow-hidden">
        <Image
          src="/images/Hero-Burger.svg"
          alt="Foody Hero Banner"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-0 bg-white">
        <div className="w-full max-w-[345px] md:max-w-[374px] flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-[11px] md:gap-[15px] w-fit">
            <div className="relative w-[32px] h-[32px] md:w-[42px] md:h-[42px] flex-shrink-0">
              <Image
                src="/logos/Logo.png"
                alt="Foody Logo"
                fill
                priority
                sizes="42px"
                className="object-contain"
              />
            </div>

            <span className="text-[24.38px] md:text-[30px] font-extrabold text-[#0A0D12] leading-none tracking-tight">
              Foody
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}