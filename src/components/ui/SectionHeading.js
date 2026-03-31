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
      "mb-12 md:mb-20",
      centered && "text-center mx-auto",
      className
    )}>
      <h2 className={cn(
        "font-heading text-4xl md:text-5xl lg:text-6xl text-dark-green leading-tight",
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
