import { cn } from "@/lib/utils";

export default function Button({ className, variant = "primary", ...props }) {
  const variants = {
    primary: "bg-primary-green text-white hover:bg-dark-green shadow-sm",
    secondary: "bg-green-50 text-primary-green hover:bg-green-100",
    outline: "border-2 border-primary-green text-primary-green hover:bg-green-50",
    dark: "bg-dark-green text-white hover:bg-emerald-green"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-green/20 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
