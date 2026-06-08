import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#29547B] text-white shadow-sm hover:bg-[#02060A] hover:shadow-md",
        outline:
          "border-[#29547B] bg-white text-[#29547B] hover:bg-[#F1F6FA] hover:shadow-sm",
        secondary:
          "bg-[#EEF4FA] text-[#29547B] hover:bg-[#E1EDF6] hover:shadow-sm",
        ghost:
          "text-[#29547B] hover:bg-[#EEF4FA]",
        dark:
          "bg-[#02060A] text-white shadow-sm hover:bg-[#111827] hover:shadow-md",
        booking:
          "bg-[#29547B] text-white shadow-md hover:bg-[#02060A] hover:shadow-xl",
        link:
          "text-[#29547B] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-2 px-4",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-11 gap-2 px-8",
        xl: "h-14 gap-3 px-10 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
