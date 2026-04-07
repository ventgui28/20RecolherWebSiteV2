"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Button({ className, variant = "primary", fullWidth = false, ...props }) {
  const variants = {
    primary: "bg-primary-green text-white hover:bg-dark-green shadow-xl shadow-primary-green/20",
    secondary: "bg-green-50 text-primary-green hover:bg-green-100",
    outline: "border-2 border-primary-green text-primary-green hover:bg-green-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all focus:outline-none focus:ring-4 focus:ring-primary-green/10 disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
