import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const medicalCardVariants = cva(
  "rounded-lg text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border",
        glass: "glass-card",
        gradient: "bg-gradient-primary text-primary-foreground",
        glow: "medical-glow bg-card border",
        floating: "glass-card animate-float",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MedicalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof medicalCardVariants> {}

const MedicalCard = React.forwardRef<HTMLDivElement, MedicalCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(medicalCardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
MedicalCard.displayName = "MedicalCard";

const MedicalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-6", className)}
    {...props}
  />
));
MedicalCardHeader.displayName = "MedicalCardHeader";

const MedicalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
MedicalCardTitle.displayName = "MedicalCardTitle";

const MedicalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MedicalCardDescription.displayName = "MedicalCardDescription";

const MedicalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pb-6", className)} {...props} />
));
MedicalCardContent.displayName = "MedicalCardContent";

const MedicalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
));
MedicalCardFooter.displayName = "MedicalCardFooter";

export {
  MedicalCard,
  MedicalCardHeader,
  MedicalCardFooter,
  MedicalCardTitle,
  MedicalCardDescription,
  MedicalCardContent,
};