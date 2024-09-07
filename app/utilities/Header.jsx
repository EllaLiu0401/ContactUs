"use client";
import React, { useState } from "react";
import { PhoneIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function HeaderContent({ children }) {
  return (
    <a
      href="#"
      className="transition duration-200 ease-in-out flex items-center hover:bg-green-700 font-bold px-6 h-full text-white"
    >
      {children}
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white h-16">
      <div className="mx-auto flex items-center justify-between h-full md:px-16 lg:px-16 xl:px-30">
        {/* Button for small screen */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2"
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* nav  */}
        <nav className={`hidden md:flex items-stretch h-full`}>
          <HeaderContent>Find agents</HeaderContent>
          <HeaderContent>Property reports</HeaderContent>
          <HeaderContent>Commission calculator</HeaderContent>
          <HeaderContent>Real estate news</HeaderContent>
        </nav>

        {/* nav for small screen */}
        {menuOpen && (
          <nav className="md:hidden absolute top-16 left-0 w-full bg-green-600">
            <HeaderContent>Find agents</HeaderContent>
            <HeaderContent>Property reports</HeaderContent>
            <HeaderContent>Commission calculator</HeaderContent>
            <HeaderContent>Real estate news</HeaderContent>
          </nav>
        )}

        {/* phone */}
        <div className="flex items-center md:px-16 lg:px-16 xl:px-30">
          <a href="tel:132434" className="flex items-center space-x-2">
            <PhoneIcon className="w-5 h-5" />
            <span>Get free agent advice on 13 24 34</span>
          </a>
        </div>
      </div>
    </header>
  );
}
