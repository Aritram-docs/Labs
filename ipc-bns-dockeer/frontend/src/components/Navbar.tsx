"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Scale, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Legal Library", path: "/library" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-color bg-background/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
            <Scale className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              IPC-BNS <span className="text-primary">Legal Mapper</span>
            </span>
            <span className="hidden sm:block text-[10px] text-muted-foreground font-medium uppercase tracking-wider -mt-1">
              Government-Grade Reference
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-foreground/70"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Theme toggle + Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-card text-foreground hover:bg-muted/50 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="h-4.5 w-4.5 text-accent-purple" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-accent-orange" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-card text-foreground hover:bg-muted/50 transition-all md:hidden cursor-pointer shadow-sm"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border-color bg-card md:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 py-3 sm:px-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/75 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
