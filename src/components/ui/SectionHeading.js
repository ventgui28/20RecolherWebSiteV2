import { cn } from "@/lib/utils";

export default function SectionHeading({ 
  title, 
  subtitle, 
  centered = false, 
  light = false,
  className 
}) {
  return (
    <div className={cn(
      "mb-16 md:mb-24",
      centered && "text-center mx-auto",
      className
    )}>
      <h2 className={cn(
        "font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter",
        light ? "text-white" : "text-dark-green"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-6 text-xl md:text-2xl max-w-3xl font-medium",
          centered && "mx-auto",
          light ? "text-green-50/70" : "text-gray-400"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
