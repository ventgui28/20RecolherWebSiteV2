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
      "mb-12 md:mb-16",
      centered && "text-center mx-auto",
      className
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight",
        light ? "text-white" : "text-gray-900"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-xl max-w-2xl",
          centered && "mx-auto",
          light ? "text-green-50" : "text-gray-500"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
