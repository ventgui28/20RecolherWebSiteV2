import { cn } from "@/lib/utils";

const sizes = {
  xs: "max-w-md",
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-[100rem]"
};

export default function Container({ className, size = "xl", children, ...props }) {
  return (
    <div 
      className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", sizes[size], className)} 
      {...props}
    >
      {children}
    </div>
  );
}
