// src/components/TechIcon.tsx
import { cn } from "@/utils/helpers";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiGithub,
  SiTailwindcss,
} from "react-icons/si";
import { Code2 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  react: SiReact,
  github: SiGithub,
  tailwind:SiTailwindcss
};

interface TechIconProps {
  techName: string;
  className?: string;
}

export default function TechIcon({ techName, className }: TechIconProps) {
  const normalizedName = techName.toLowerCase().trim();

  const IconComponent = iconMap[normalizedName] || Code2;

  return <IconComponent className={cn("shrink-0", className)} />;
}
