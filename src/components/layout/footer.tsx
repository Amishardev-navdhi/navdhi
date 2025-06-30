import { NavdhiLogo } from "@/components/icons";
import { Linkedin, Instagram } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          <div className="space-y-4 lg:col-span-1">
            <Link href="#home" className="flex items-center space-x-2">
              <NavdhiLogo className="h-8 w-32" />
            </Link>
            <p className="text-muted-foreground">
              The Essence of Innovation.
            </p>
            <div className="flex space-x-4 items-center">
              <a href="https://dietaryguide.in/" target="_blank" rel="noopener noreferrer" aria-label="Dietary Guide">
                <Image
                  src="https://github.com/amishardev/navdhiweb/blob/main/DGlogo-Photoroom-modified.png?raw=true"
                  alt="Dietary Guide Logo"
                  width={28}
                  height={28}
                  className="filter grayscale hover:grayscale-0 transition-all"
                />
              </a>
              <a href="https://www.linkedin.com/company/dietary-guide/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://www.instagram.com/dietaryguide.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold font-headline">Explore</h4>
            <ul className="space-y-1">
              <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="#innovation" className="text-muted-foreground hover:text-primary transition-colors">Innovation</Link></li>
              <li><Link href="#latest" className="text-muted-foreground hover:text-primary transition-colors">Latest News</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold font-headline">Support</h4>
            <ul className="space-y-1">
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold font-headline">Contact</h4>
            <p className="text-muted-foreground">contact@navdhi.com</p>
            <p className="text-muted-foreground">IIT Kanpur, Kalyanpur, Kanpur, Uttar Pradesh 208016</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Navdhi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
