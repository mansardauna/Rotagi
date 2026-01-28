"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navItems = ["About", "Programs", "Contact"];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-300 py-3">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="font-cal-sans text-2xl font-bold uppercase tracking-tight text-secondary">
          ROTAGI
        </div>

        {/* Desktop Nav + CTA */}
        
          <nav className="md:flex hidden gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-dm-sans text-base font-medium text-gray-700 transition hover:text-secondary"
              >
                {item}
              </a>
            ))}
          </nav>

<div className="hidden md:block">
          <Button
            variant="primary"
            size="md"
            className="font-dm-sans  font-semibold"
          >
            Donate Now
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu – Full-screen slide-up (cleaner than side-slide for most mobile users) */}
      <div
        className={`
    fixed top-0 left-0 right-0 z-50 mx-auto max-w-md 
    h-fit bg-white transition-transform duration-300 ease-out md:hidden
    ${isOpen ? "translate-y-0" : "translate-y-[-100%]"}
  `}
      >
        {/* Header inside menu */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
          <div className="font-cal-sans text-2xl font-bold uppercase tracking-tight text-secondary">
            ROTAGI
          </div>
          <button
            onClick={closeMenu}
            className="rounded-full p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="w-full max-w-sm text-left text-2xl font-medium text-gray-800 transition hover:text-secondary active:scale-98"
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div className="border-t border-gray-100 px-6 py-8">
          <Button
            variant="primary"
            size="lg"
            className="w-full font-dm-sans text-lg font-semibold"
            onClick={closeMenu}
          >
            Donate Now
          </Button>
        </div>
      </div>

      {/* Optional semi-transparent backdrop (only when menu open) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}