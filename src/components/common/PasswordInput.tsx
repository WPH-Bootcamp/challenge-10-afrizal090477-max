'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ error, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`
            w-full
            h-[48px]
            md:h-[56px]
            rounded-[12px]
            border
            pl-3
            pr-10
            text-[14px]
            md:text-[16px]
            text-[#0A0D12]
            placeholder-[#717680]
            transition-all
            focus:outline-none
            focus:border-[#C12116]
            disabled:opacity-50
            ${
              error
                ? 'border-red-500'
                : 'border-[#D5D7DA]'
            }
            ${className ?? ''}
          `}
          {...props}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#0A0D12] opacity-60 hover:opacity-100 transition-opacity"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <span className="text-xs text-red-500 font-medium pl-1">
          {error}
        </span>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;