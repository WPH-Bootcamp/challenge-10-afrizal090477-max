'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full h-auto bg-[#0A0D12] border-t border-[#252B37] px-[16px] py-[40px] md:px-[120px] md:py-[80px] md:h-[490px] flex flex-col md:flex-row md:justify-between gap-[24px] md:gap-0 select-none">
      <div className="w-full max-w-[361px] md:max-w-[380px] flex flex-col gap-[16px] md:gap-[40px]"> 
        <div className="flex items-center gap-[15px] w-[149px] h-[42px]">
          <div className="w-[42px] h-[42px] relative flex-shrink-0">
            <Image
              src="/logos/Logo.png"
              alt="Foody Logo"
              fill
              sizes="42px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[24px] md:text-[30px] font-[800] text-white tracking-tight leading-none">
            Foody
          </span>
        </div>

        <p className="text-[14px] md:text-[16px] font-[400] text-[#FDFDFD] opacity-90 leading-relaxed md:leading-normal tracking-[-2%]">
          Enjoy homemade flavors & chef’s signature dishes, freshly prepared every day. Order online or visit our nearest branch.
        </p>

        <div className="flex flex-col gap-[8px] md:gap-[20px] w-[196px]">
          <span className="text-[14px] md:text-[16px] font-[700] md:font-[800] text-[#FDFDFD] tracking-tight">
            Follow on Social Media
          </span>
          <div className="flex items-center gap-[12px] h-[40px]">
            {[
              {
                name: 'Facebook',
                href: 'https://facebook.com',
                svg: (
                  <svg className="w-[11px] h-[20px] fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.5-1 1-1H17V2h-3c-2.8 0-5 2.2-5 5v1z" />
                  </svg>
                ),
              },
              {
                name: 'Instagram',
                href: 'https://instagram.com',
                svg: (
                  <svg className="w-[18px] h-[18px] stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                name: 'LinkedIn',
                href: 'https://linkedin.com',
                svg: (
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                name: 'TikTok',
                href: 'https://tiktok.com',
                svg: (
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.61 4.17.95 1.09 2.29 1.8 3.74 1.98v3.91c-1.25-.13-2.45-.65-3.42-1.47-.76-.64-1.34-1.47-1.69-2.4v7.7c.07 1.4-.24 2.84-.96 4.04-.76 1.25-1.99 2.19-3.41 2.58-1.51.41-3.15.23-4.54-.51-1.33-.72-2.36-1.97-2.82-3.44-.53-1.63-.3-3.44.62-4.9 1.01-1.57 2.76-2.6 4.62-2.68.34-.01.68.02 1.02.07v3.96c-.71-.24-1.52-.14-2.15.28-.68.44-1.07 1.25-1.03 2.06.02.82.49 1.58 1.22 1.93.74.34 1.63.24 2.27-.27.52-.42.8-1.09.78-1.76v-13.3c-.01 0-.01-.01-.01-.01z" />
                  </svg>
                ),
              },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="w-[40px] h-[40px] rounded-full border border-[#252B37] flex items-center justify-center text-white hover:bg-[#C12116] hover:border-[#C12116] transition-all duration-300"
              >
                {soc.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-auto flex flex-row gap-[16px] md:gap-[120px]">
        {/* KOLOM EXPLORE */}
        <div className="w-[172.5px] md:w-[200px] flex flex-col gap-[16px] md:gap-[20px]">
          <h3 className="text-[14px] md:text-[16px] font-[800] text-[#FDFDFD] tracking-wider uppercase opacity-50">
            Explore
          </h3>
          <ul className="flex flex-col gap-[12px] md:gap-[16px]">
            {['All Food', 'Nearby', 'Discount', 'Best Seller', 'Delivery', 'Lunch'].map((name) => {
              const paramValue = name === "All Food" ? "All Restaurant" : name;
              
              return (
                <li key={name}>
                  <Link 
                    href={`/?category=${encodeURIComponent(paramValue)}`}
                    scroll={true} 
                    className="text-[14px] md:text-[16px] font-[500] text-[#FDFDFD] opacity-80 hover:opacity-100 hover:text-[#C12116] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-[172.5px] md:w-[200px] flex flex-col gap-[16px] md:gap-[20px]">
          <h3 className="text-[14px] md:text-[16px] font-[800] text-[#FDFDFD] tracking-wider uppercase opacity-50">
            Help
          </h3>
          <ul className="flex flex-col gap-[12px] md:gap-[16px]">
            {['How to Order', 'Payment Methods', 'Track My Order', 'FAQ', 'Contact Us'].map((name) => {
              const currentSlug = name === 'Contact Us' 
                ? '/contact-us' 
                : `/help/${name.toLowerCase().replace(/\s+/g, '-')}`;
                
              return (
                <li key={name}>
                  <Link 
                    href={currentSlug} 
                    className="text-[14px] md:text-[16px] font-[500] text-[#FDFDFD] opacity-80 hover:opacity-100 hover:text-[#C12116] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}