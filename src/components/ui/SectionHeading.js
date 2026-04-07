import { cn } from "@/lib/utils";

export default function SectionHeading({ 
  title, 
  subtitle, 
  badge,
  centered = false, 
  light = false,
  className 
}) {
  return (
    <div className={cn(
      "mb-12 md:mb-20",
      centered && "text-center mx-auto",
      className
    )}>
      {badge && (
        <span className={cn(
          "inline-block mb-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full",
          light ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        "font-heading text-4xl md:text-5xl lg:text-6xl leading-tight",
        light ? "text-white" : "text-dark-green"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-6 text-lg md:text-xl max-w-3xl font-medium",
          centered && "mx-auto",
          light ? "text-green-50/70" : "text-gray-500"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
