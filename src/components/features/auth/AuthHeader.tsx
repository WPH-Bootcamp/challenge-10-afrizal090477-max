interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#0A0D12] tracking-tight leading-tight">
        {title}
      </h1>

      <p className="text-[14px] font-medium text-[#535862]">
        {subtitle}
      </p>
    </div>
  );
}