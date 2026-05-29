"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Feed" },
    { href: "/communities", label: "Communities" },
    { href: "/verify", label: "Verify" },
    { href: "/profile", label: "Profile" },
    { href: "/login", label: "Sign In" },
    { href: "/signup", label: "Sign Up" },
  ];

  return (
    <nav className="border-b border-cyan-500/20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-cyan-400">
          ProofOrigin Social
        </a>

        <div className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-cyan-400">
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cyan-400 text-3xl font-bold"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cyan-500/20 px-4 py-4 space-y-4 bg-black">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-lg hover:text-cyan-400"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
