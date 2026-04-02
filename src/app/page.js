"use client";

import { motion } from "framer-motion";
import HomeHero from "@/components/sections/HomeHero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import HomeStats from "@/components/sections/HomeStats";
import HomeAboutBrief from "@/components/sections/HomeAboutBrief";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <div className="bg-green-mist bg-grain">
      <HomeHero />
      <ProcessTimeline />
      <HomeStats />
      <HomeAboutBrief />
    </div>
  );
}
