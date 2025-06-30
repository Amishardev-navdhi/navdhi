import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

interface NavdhiLogoProps {
  className?: string;
  /**
   * When true, forces the light version of the logo (for dark backgrounds),
   * overriding the theme.
   */
  forceLight?: boolean;
}

const NavdhiLogo = React.forwardRef<HTMLDivElement, NavdhiLogoProps>(({ className, forceLight = false }, ref) => {
  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Dark logo (for light backgrounds) */}
      <Image
        src="https://raw.githubusercontent.com/amishardev/navdhiweb/91b19d3a4cd9995d99c41bc791bbe443477cc5b1/download.png"
        alt="Navdhi Logo"
        fill
        className={cn("object-contain", forceLight ? "hidden" : "block", "dark:hidden")}
        priority
        unoptimized
      />
      {/* Light logo (for dark backgrounds) */}
      <Image
        src="https://raw.githubusercontent.com/amishardev/navdhiweb/91b19d3a4cd9995d99c41bc791bbe443477cc5b1/download%20(1).png"
        alt="Navdhi Logo"
        fill
        className={cn("object-contain", forceLight ? "block" : "hidden", "dark:block")}
        priority
        unoptimized
      />
    </div>
  );
});
NavdhiLogo.displayName = "NavdhiLogo";
export { NavdhiLogo };
