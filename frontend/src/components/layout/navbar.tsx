import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BottomNav } from "./bottom-nav";
import { ModeToggle } from "@/components/theme/theme-toggle";
import img1 from "../../assets/logo.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/narrativesummary", label: "Narrative Summary" },
    { href: "/NewsSummary", label: "News" },
    { href: "/stockreport", label: "Stock Report" },
    { href: "/fraud", label: "Fraud Detection" },
    { href: "/chatbot", label: "Chatbot" },
    { href: "/sustainable", label: "Sustainable Investing" },
    { href: "/schemefinder", label: "Scheme Finder" },
    { href: "/dashboard", label: "Dashboard" },
    
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={img1}
              alt="Dhan AI Logo"
              className="h-14 w-14" // Adjust size as needed
            />
            <span className="text-xl font-bold">Dhan AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "relative transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            <ModeToggle />
          </div>
        </div>
      </motion.nav>
      <BottomNav />
    </>
  );
}