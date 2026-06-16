"use client";

import React, { useState } from "react";
import Image from "next/image"; 
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import { ProfileSidebar } from "@/components/features/profile/ProfileComponents";
import { ProfileApiResponse } from "@/types/profile"; 
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store"; 
export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient(); 
  const [activeTab, setActiveTab] = useState("address");
  const [localAvatarPreview, setLocalAvatarPreview] = useState<string | null>(null);

  const currentAuthUser = useAuthStore((state) => state.user);
  const updateGlobalNavbarAvatar = (newAvatarUrl: string) => {
    if (currentAuthUser) {
      useAuthStore.setState({
        user: {
          ...currentAuthUser,
          avatar: newAvatarUrl 
        }
      });
    }
  };

  const [formDataState, setFormDataState] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const { data: response, isPending, isError } = useQuery<ProfileApiResponse>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await api.get("/api/auth/profile");
      return data;
    },
  });

  const user = response?.data;
  const isFormEmpty = !formDataState.name && !formDataState.email && !formDataState.phone;
  if (user && isFormEmpty) {
    setFormDataState({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "" 
    });
  }

  const updateProfileTextMutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; phone: string }) => {
      const { data } = await api.put("/api/auth/profile", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); 
      alert("Profile updated successfully"); 
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to update profile data");
    }
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.put("/api/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data as ProfileApiResponse;
    },
    onSuccess: (serverData: ProfileApiResponse) => {
      const newAvatarUrl = serverData?.data?.avatar || localAvatarPreview;
      if (newAvatarUrl) {
        updateGlobalNavbarAvatar(newAvatarUrl);
      }
      queryClient.setQueryData<ProfileApiResponse>(["user-profile"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: { ...oldData.data, avatar: newAvatarUrl }
        };
      });
      queryClient.invalidateQueries(); 
      alert("Profile updated successfully"); 
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to upload avatar image");
      setLocalAvatarPreview(null);
    }
  });

  const currentDisplayedAvatar = localAvatarPreview || user?.avatar || "/images/photo.jpeg";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setLocalAvatarPreview(objectUrl);

    const formData = new FormData();
    formData.append("avatar", file); 

    uploadAvatarMutation.mutate(formData);
  };

  const handleSaveProfileData = () => {
    if (!formDataState.name || !formDataState.email) {
      alert("Name and Email fields are required");
      return;
    }
    updateProfileTextMutation.mutate(formDataState);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "orders") router.push("/orders");
    if (tab === "address") router.push("/cart");
  };

  return (
    <div className="w-full block bg-transparent pt-[120px] md:pt-[140px] pb-20 min-h-screen">
      <div className="w-full max-w-[796px] mx-auto px-4 md:px-0 flex flex-col md:flex-row items-start gap-[32px]">
        
        <ProfileSidebar 
          userName={formDataState.name || "Afrizal"}
          avatarUrl={currentDisplayedAvatar}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onLogout={() => { router.push("/login"); }}
        />

        <div className="w-full md:w-[524px] flex flex-col gap-[24px]">
          <h1 className="w-full text-[24px] md:text-[32px] font-[800] text-[#0A0D12] tracking-normal leading-none">
            Profile
          </h1>

          {isPending && (
            <div className="w-full h-[298px] bg-slate-50 rounded-[16px] animate-pulse" />
          )}

          {isError && (
            <div className="w-full p-6 text-center border border-red-200 bg-red-50 rounded-[16px]">
              <p className="text-sm font-medium text-red-600">Failed to load profile data from API server.</p>
            </div>
          )}

          {!isPending && !isError && user && (
            <div 
              className="w-full h-auto min-h-[272px] md:h-[298px] bg-white rounded-[16px] p-4 md:p-[20px] flex flex-col gap-[24px]"
              style={{ boxShadow: "0px 0px 20px 0px #CBCACA40" }}
            >
              <div className="w-full h-[64px] flex items-center">
                <label className="relative w-[64px] h-[64px] rounded-full overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group block">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={uploadAvatarMutation.isPending}
                  />
                  <Image 
                    src={currentDisplayedAvatar} 
                    alt="user-avatar" 
                    fill
                    sizes="64px"
                    className={`object-cover transition-opacity ${
                      uploadAvatarMutation.isPending ? "opacity-40" : "group-hover:opacity-80"
                    }`}
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full" />
                </label>
                {uploadAvatarMutation.isPending && (
                  <span className="text-xs text-slate-400 ml-4 animate-pulse">Uploading image...</span>
                )}
              </div>

              <div className="w-full flex flex-col gap-[8px] md:gap-[12px]">
                <div className="w-full flex items-center justify-between h-[28px] md:h-[30px]">
                  <span className="text-[14px] font-[500] text-[#0A0D12] tracking-[-3%] md:text-[16px]">Name</span>
                  <input 
                    type="text"
                    name="name"
                    value={formDataState.name}
                    onChange={handleInputChange}
                    className="text-right font-[700] text-[#0A0D12] text-[14px] md:text-[16px] bg-transparent outline-none border-b border-transparent focus:border-slate-300 w-[200px]"
                  />
                </div>

                <div className="w-full flex items-center justify-between h-[28px] md:h-[30px]">
                  <span className="text-[14px] font-[500] text-[#0A0D12] tracking-[-3%] md:text-[16px]">Email</span>
                  <input 
                    type="email"
                    name="email"
                    value={formDataState.email}
                    onChange={handleInputChange}
                    className="text-right font-[700] text-[#0A0D12] text-[14px] md:text-[16px] bg-transparent outline-none border-b border-transparent focus:border-slate-300 w-[240px]"
                  />
                </div>

                <div className="w-full flex items-center justify-between h-[28px] md:h-[30px]">
                  <span className="text-[14px] font-[500] text-[#0A0D12] tracking-[-3%] md:text-[16px]">Nomor Handphone</span>
                  <input 
                    type="text"
                    name="phone"
                    value={formDataState.phone}
                    onChange={handleInputChange}
                    className="text-right font-[700] text-[#0A0D12] text-[14px] md:text-[16px] bg-transparent outline-none border-b border-transparent focus:border-slate-300 w-[180px]"
                  />
                </div>
              </div>

              <Button
                disabled={updateProfileTextMutation.isPending || uploadAvatarMutation.isPending}
                onClick={handleSaveProfileData}
                className="w-full h-[44px] bg-[#C12116] hover:bg-[#a81c12] text-white font-[700] text-[15px] md:text-[16px] rounded-[100px] border-none mt-auto cursor-pointer flex items-center justify-center shadow-sm"
              >
                {updateProfileTextMutation.isPending ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}