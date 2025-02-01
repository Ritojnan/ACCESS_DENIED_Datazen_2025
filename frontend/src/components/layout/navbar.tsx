import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BottomNav } from "./bottom-nav";
import { ModeToggle } from "@/components/theme/theme-toggle";

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
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
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
          <Link to="/" className="text-xl font-bold">
            Dhan AI
          </Link>
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
