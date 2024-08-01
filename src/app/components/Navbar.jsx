'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-myrtle-green p-4 mb-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={toggleNavbar} className="text-papaya-whip focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:items-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-papaya-whip hover:text-earth-yellow">Home</Link>
            </li>
            <li>
              <Link href="/upload" className="text-papaya-whip hover:text-earth-yellow">Upload</Link>
            </li>
            <li>
              <Link href="/gallery" className="text-papaya-whip hover:text-earth-yellow">Gallery</Link>
            </li>
          </ul>
        </div>

        {/* Logo - center on desktop, left on mobile */}
        <div className="text-papaya-whip font-lora font-bold text-xl lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          Windrose Uploader
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden w-full mt-4`}>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/" className="text-papaya-whip hover:text-earth-yellow block">Home</Link>
            </li>
            <li>
              <Link href="/upload" className="text-papaya-whip hover:text-earth-yellow block">Upload</Link>
            </li>
            <li>
              <Link href="/gallery" className="text-papaya-whip hover:text-earth-yellow block">Gallery</Link>
            </li>
          </ul>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="bg-palatinate hover:bg-earth-yellow text-papaya-whip font-montserrat font-bold py-2 px-4 rounded transition duration-300">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-palatinate hover:bg-earth-yellow text-papaya-whip font-montserrat font-bold py-2 px-4 rounded transition duration-300">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutAll="/" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;