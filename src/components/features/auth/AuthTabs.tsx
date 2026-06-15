import Link from 'next/link';

interface AuthTabsProps {
  activeTab: 'login' | 'register';
}

export default function AuthTabs({
  activeTab,
}: AuthTabsProps) {
  return (
    <div className="w-full h-[48px] md:h-[56px] bg-[#F5F5F5] rounded-[16px] p-[8px] flex items-center gap-[8px]">
      <Link
        href="/login"
        className={`w-1/2 h-full flex items-center justify-center rounded-[8px] md:rounded-[12px] text-[14px] md:text-[16px] transition-all ${
          activeTab === 'login'
            ? 'bg-white text-[#0A0D12] font-bold shadow-sm'
            : 'text-[#535862] font-medium hover:text-[#0A0D12]'
        }`}
      >
        Sign In
      </Link>

      <Link
        href="/register"
        className={`w-1/2 h-full flex items-center justify-center rounded-[8px] md:rounded-[12px] text-[14px] md:text-[16px] transition-all ${
          activeTab === 'register'
            ? 'bg-white text-[#0A0D12] font-bold shadow-sm'
            : 'text-[#535862] font-medium hover:text-[#0A0D12]'
        }`}
      >
        Sign Up
      </Link>
    </div>
  );
}