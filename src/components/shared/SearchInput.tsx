"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);


  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);


  return (
    <div className="relative w-full max-w-[490px] h-[48px] md:h-[56px] flex items-center bg-white rounded-full px-4 border border-slate-200 shadow-sm focus-within:border-orange-500 transition-colors">
      <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full bg-transparent outline-none text-[14px] md:text-[16px] text-[#0A0D12] placeholder-slate-400 font-[500]"
      />
    </div>
  );
}