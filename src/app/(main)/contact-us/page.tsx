'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactUsPage() {
  const whatsappNumber = "628123456789"; 
  const whatsappText = encodeURIComponent("Halo Admin Foody Support, saya butuh bantuan mengenai pesanan saya.");
  const supportEmail = "support@foodyapp.com";

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 md:py-20 select-none">
      <div className="w-full max-w-[900px] mx-auto px-4">
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#C12116] hover:opacity-80 transition-opacity mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discover Food
        </Link>

        <div 
          className="w-full bg-white rounded-[20px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          style={{ boxShadow: "0px 0px 30px 0px rgba(203, 202, 202, 0.2)" }}
        >
          
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-tight leading-tight">
                Contact Us
              </h1>
              <p className="text-sm md:text-base text-slate-500 font-[400] mt-3 leading-relaxed">
                Punya kendala dengan pesananmu atau ingin bermitra dengan Foody? Tim customer support kami siap melayani dan menjawab pertanyaanmu setiap hari.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-8 md:mt-0 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-slate-600 text-sm font-[500]">
                <Clock className="w-5 h-5 text-[#C12116] flex-shrink-0" />
                <span>Operational: 09:00 - 21:00 WIB</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-[500]">
                <MapPin className="w-5 h-5 text-[#C12116] flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 rounded-[16px] transition-all duration-300 group"
            >
              <div className="p-3 bg-emerald-500 text-white rounded-xl group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-[800] text-emerald-900">
                  Chat via WhatsApp
                </h3>
                <p className="text-xs text-emerald-600 font-[500] mt-0.5">
                  Respon instan dan cepat, terhubung langsung ke gawai admin.
                </p>
              </div>
            </a>

            <a
              href={`mailto:${supportEmail}?subject=Foody%20Support%20Inquiry`}
              className="flex items-center gap-4 p-5 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-[16px] transition-all duration-300 group"
            >
              <div className="p-3 bg-[#C12116] text-white rounded-xl group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-[800] text-red-950">
                  Send via Email
                </h3>
                <p className="text-xs text-red-600 font-[500] mt-0.5">
                  Gunakan jalur email resmi untuk keluhan formal atau kemitraan bisnis.
                </p>
              </div>
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}