

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, UserCircle, X, Menu } from 'lucide-react'
import { useAtom } from 'jotai'
import { cartNumber } from '@/globalState/globalState'
import { UserButton } from '@clerk/nextjs'


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartNum] = useAtom(cartNumber)

  return (
    <>
      <nav className="relative w-full bg-white z-50">
        {/* Main container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black/5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Main menu"
              >
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center  mr-20 ">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  height={32}
                  width={50}
                  className="h-8 w-auto sm:h-10 mr-3"
                />
                <span className="font-bold font-montserrat text-xl sm:text-2xl  md:text-[25px]  ">
                  Furniro
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:ml-[200px] lg:justify-start">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/blog"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
              
            {/* Icons Section */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="p-2 hover:bg-black/5 rounded-full ml-2">
                <UserCircle className="w-6 h-6" />
              </Link>
              <Link href="/shop" className="p-2 hover:bg-black/5 rounded-full">
                <Search className="w-6 h-6" />
              </Link>
              <Link href="/whishlist" className="p-2 hover:bg-black/5 rounded-full">
                <Heart className="w-6 h-6" />
              </Link>
              <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full">
                <ShoppingCart className="w-6 h-6" />
                {cartNum > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartNum}
                  </span>
                )}
              </Link>
              {/* Hide UserButton on small screens */}
              <div className="hidden sm:block">
                <UserButton />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden shadow-lg z-50`}>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-black hover:bg-black/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col items-center space-y-6 mt-8 text-lg font-medium">
            {['Home', 'Shop', 'Blog', 'Contact'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-black hover:text-gray-600" onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            ))}

            {/* Show UserButton only in mobile menu */}
            <UserButton />

            {/* Mobile Icons Section */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="p-2 hover:bg-black/5 rounded-full">
                <UserCircle className="w-6 h-6" />
              </Link>
              <Link href="/shop" className="p-2 hover:bg-black/5 rounded-full">
                <Search className="w-6 h-6" />
              </Link>
              <Link href="/whishlist" className="p-2 hover:bg-black/5 rounded-full">
                <Heart className="w-6 h-6" />
              </Link>
              <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full">
                <ShoppingCart className="w-6 h-6" />
                {cartNum > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartNum}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
















































































