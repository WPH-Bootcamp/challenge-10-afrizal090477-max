import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      suppressHydrationWarning // <--- KUNCI UTAMA JINAKKAN INPUT DI SINI, BRO!
      className={cn(
        "min-w-0 border border-input px-2.5 py-1 transition-colors outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }