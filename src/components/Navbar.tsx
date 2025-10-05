"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" aria-label="Nike Home" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Nike"
            width={28}
            height={28}
            priority
            className="invert"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <button className="text-body text-dark-600 transition-colors hover:text-dark-700">
            Search
          </button>
          <button className="text-body text-dark-600 transition-colors hover:text-dark-700">
            My Cart (2)
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="mb-1 block h-0.5 w-6 bg-dark-900"></span>
          <span className="mb-1 block h-0.5 w-6 bg-dark-900"></span>
          <span className="block h-0.5 w-6 bg-dark-900"></span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-light-300 md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="space-y-2 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-body text-dark-900 hover:text-dark-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="flex items-center justify-between pt-2">
            <button className="text-body">Search</button>
            <button className="text-body">My Cart(2)</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
