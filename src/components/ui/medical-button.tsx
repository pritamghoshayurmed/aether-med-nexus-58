import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const medicalButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        medical: "btn-medical text-primary-foreground font-semibold hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        glass: "glass-card text-foreground hover:bg-white/10",
        glow: "medical-glow bg-primary text-primary-foreground",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "min-h-[44px] px-4 py-2",
        sm: "min-h-[40px] rounded-md px-3 text-sm",
        lg: "min-h-[48px] rounded-md px-8 text-base",
        xl: "min-h-[56px] rounded-lg px-12 text-lg",
        icon: "min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MedicalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof medicalButtonVariants> {
  asChild?: boolean;
}

const MedicalButton = React.forwardRef<HTMLButtonElement, MedicalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(medicalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
MedicalButton.displayName = "MedicalButton";

export { MedicalButton, medicalButtonVariants };