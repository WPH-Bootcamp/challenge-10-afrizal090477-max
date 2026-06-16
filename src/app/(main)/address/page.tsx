"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserSidebar } from "@/components/features/orders/UserSidebar";
import { MapPin, Phone, ChevronLeft, Save } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";

interface UpdateProfilePayload {
  name: string;
  avatar?: string;
  address: string;
  phoneNumber: string;
}

export default function AddressPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const storeUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const currentUserName = storeUser?.name || "";
  const currentUserAvatar = storeUser?.avatar || "";

  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const updateAddressMutation = useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const { data } = await api.put("/api/auth/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("Alamat pengiriman berhasil diperbarui di dalam sistem.");
      router.push("/checkout");
    },
    onError: (error) => {
      console.error("Gagal menyimpan alamat:", error);
      alert("Gagal memperbarui alamat pengiriman. Silakan periksa kembali koneksi jaringan atau server Anda.");
    }
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      alert("Alamat pengiriman tidak boleh kosong.");
      return;
    }


    updateAddressMutation.mutate({
      name: currentUserName,
      avatar: currentUserAvatar,
      address: address,
      phoneNumber: phoneNumber,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pt-[120px] md:pt-[140px] pb-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-start gap-6 lg:gap-[32px]">
        
        <UserSidebar activeMenu="address" userName={currentUserName} userAvatar={currentUserAvatar} />

        <div className="w-full lg:w-[928px] flex flex-col gap-[24px]">
          
          <div className="w-full flex items-center gap-2 h-[42px]">
            <button 
              type="button"
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer block lg:hidden"
            >
              <ChevronLeft className="w-6 h-6 text-[#0A0D12]" />
            </button>
            <h1 className="text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-tight leading-none">
              Delivery Address
            </h1>
          </div>

          <div 
            className="w-full bg-white rounded-[16px] p-5 md:p-[32px]"
            style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
          >
            <form onSubmit={handleSaveAddress} className="w-full max-w-[600px] flex flex-col gap-[24px]">
              
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-[700] text-[#0A0D12] tracking-[-2%]">
                  Phone Number
                </label>
                <div className="w-full h-[48px] flex items-center gap-[10px] px-[16px] rounded-[100px] border border-[#D5D7DA] bg-white focus-within:border-[#C12116] transition-all">
                  <Phone className="w-[20px] h-[20px] text-[#535862]" />
                  <input
                    type="text"
                    placeholder="Masukkan nomor telepon aktif Anda"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-[15px] text-[#0A0D12] placeholder-[#535862] focus:outline-none font-[500]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-[700] text-[#0A0D12] tracking-[-2%]">
                  Full Address
                </label>
                <div className="w-full h-[120px] flex items-start gap-[10px] p-[16px] rounded-[16px] border border-[#D5D7DA] bg-white focus-within:border-[#C12116] transition-all">
                  <MapPin className="w-[20px] h-[20px] text-[#535862] mt-0.5" />
                  <textarea
                    placeholder="Tuliskan alamat lengkap pengiriman makanan (Nama Jalan, Blok, No. Rumah, Kota)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-[15px] text-[#0A0D12] placeholder-[#535862] focus:outline-none font-[500] resize-none leading-relaxed"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updateAddressMutation.isPending}
                className="w-full max-w-[200px] h-[48px] bg-[#C12116] hover:bg-[#a81c12] disabled:opacity-50 text-white font-[700] text-[15px] rounded-[100px] border-none flex items-center justify-center gap-2 cursor-pointer shadow-sm self-start transition-colors mt-2"
              >
                <Save className="w-5 h-5" />
                {updateAddressMutation.isPending ? "Menyimpan..." : "Save Address"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}