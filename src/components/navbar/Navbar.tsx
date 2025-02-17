

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Heart, ShoppingCart, UserCircle, X, Menu } from 'lucide-react';
import { useAtom } from 'jotai';
import { cartNumber, searchQueryAtom } from '@/globalState/globalState';
import { UserButton } from '@clerk/nextjs';


export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartNum] = useAtom(cartNumber);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams, setSearchQuery]);

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className="relative w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Hamburger Menu Button (Mobile) */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-black hover:bg-black/5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" height={32} width={50} className="h-8 w-auto sm:h-10 mr-3" />
                <span className="font-bold font-montserrat text-xl sm:text-2xl md:text-[25px]">Furniro</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:ml-[200px]">
              <div className="flex space-x-8">
                {['Home', 'Shop', 'Blog', 'Contact'].map((item) => (
                  <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="p-2 hover:bg-black/5 rounded-full">
                <UserCircle className="w-6 h-6" />
              </Link>
              {isDesktopSearchOpen ? (
                <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border rounded px-2 py-1 w-40 transition-all"
                    placeholder="Search..."
                    autoFocus
                  />
                  <button type="submit" className="p-2 hover:bg-black/5 rounded-full">
                    <Search className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setIsDesktopSearchOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsDesktopSearchOpen(true)}
                  className="p-2 hover:bg-black/5 rounded-full"
                >
                  <Search className="w-6 h-6" />
                </button>
              )}
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
              <div className="hidden sm:block">
                <UserButton />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40">
            <div className="flex flex-col items-center space-y-4 py-4">
              {['Home', 'Shop', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-lg font-medium font-poppins text-black hover:text-black/70 transition-colors"
                  onClick={() => setMenuOpen(false)} // Close menu on selection
                >
                  {item}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <Link href="/login" className="p-2 hover:bg-black/5 rounded-full">
                  <UserCircle className="w-6 h-6" />
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
                {isDesktopSearchOpen ? (
                  <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="border rounded px-2 py-1 w-40 transition-all"
                      placeholder="Search..."
                      autoFocus
                    />
                    <button type="submit" className="p-2 hover:bg-black/5 rounded-full">
                      <Search className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setIsDesktopSearchOpen(false)}
                      className="p-2 hover:bg-black/5 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsDesktopSearchOpen(true)}
                    className="p-2 hover:bg-black/5 rounded-full"
                  >
                    <Search className="w-6 h-6" />
                  </button>
                )}
              </div>
              <UserButton />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}




































// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Search, Heart, ShoppingCart, UserCircle, X, Menu } from 'lucide-react';
// import { useAtom } from 'jotai';
// import { cartNumber, searchQueryAtom } from '@/globalState/globalState';
// import { UserButton } from '@clerk/nextjs';

// export default function Navbar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartNum] = useAtom(cartNumber);
//   const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
//   const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   useEffect(() => {
//     const query = searchParams.get('search');
//     if (query) {
//       setSearchQuery(query);
//     }
//   }, [searchParams, setSearchQuery]);

//   const handleSearch = (e: { target: { value: string } }) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//   };

//   const handleSearchSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <nav className="relative w-full bg-white z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           <div className="flex items-center md:hidden">
//             <button
//               type="button"
//               className="p-2 rounded-md text-black hover:bg-black/5"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle menu"
//             >
//               <Menu className="h-6 w-6" aria-hidden="true" />
//             </button>
//           </div>
//           <div className="flex-shrink-0 flex items-center mr-20">
//             <Link href="/" className="flex items-center gap-2">
//               <Image src="/logo.png" alt="Logo" height={32} width={50} className="h-8 w-auto sm:h-10 mr-3" />
//               <span className="font-bold font-montserrat text-xl sm:text-2xl md:text-[25px]">Furniro</span>
//             </Link>
//           </div>
//           <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:ml-[200px]">
//             <div className="flex space-x-8">
//               {['Home', 'Shop', 'Blog', 'Contact'].map((item) => (
//                 <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors">
//                   {item}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="hidden md:flex items-center gap-4">
//             <Link href="/login" className="p-2 hover:bg-black/5 rounded-full">
//               <UserCircle className="w-6 h-6" />
//             </Link>
//             {isDesktopSearchOpen ? (
//               <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   className="border rounded px-2 py-1 w-40 transition-all"
//                   placeholder="Search..."
//                   autoFocus
//                 />
//                 <button type="submit" className="p-2 hover:bg-black/5 rounded-full">
//                   <Search className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={() => setIsDesktopSearchOpen(false)}
//                   className="p-2 hover:bg-black/5 rounded-full"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </form>
//             ) : (
//               <button
//                 onClick={() => setIsDesktopSearchOpen(true)}
//                 className="p-2 hover:bg-black/5 rounded-full"
//               >
//                 <Search className="w-6 h-6" />
//               </button>
//             )}
//             <Link href="/wishlist" className="p-2 hover:bg-black/5 rounded-full">
//               <Heart className="w-6 h-6" />
//             </Link>
//             <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full">
//               <ShoppingCart className="w-6 h-6" />
//               {cartNum > 0 && (
//                 <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
//                   {cartNum}
//                 </span>
//               )}
//             </Link>
//             <div className="hidden sm:block">
//               <UserButton />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

























// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Search, Heart, ShoppingCart, UserCircle, X, Menu } from 'lucide-react'
// import { useAtom } from 'jotai'
// import { cartNumber } from '@/globalState/globalState'
// import { UserButton } from '@clerk/nextjs'


// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [cartNum] = useAtom(cartNumber)

//   return (
//     <>
//       <nav className="relative w-full bg-white z-50">
//         {/* Main container */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20">
//             {/* Mobile menu button */}
//             <div className="flex items-center md:hidden">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black/5"
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 aria-label="Main menu"
//               >
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>

//             {/* Logo Section */}
//             <div className="flex-shrink-0 flex items-center  mr-20 ">
//               <Link href="/" className="flex items-center gap-2">
//                 <Image
//                   src="/logo.png"
//                   alt="Logo"
//                   height={32}
//                   width={50}
//                   className="h-8 w-auto sm:h-10 mr-3"
//                 />
//                 <span className="font-bold font-montserrat text-xl sm:text-2xl  md:text-[25px]  ">
//                   Furniro
//                 </span>
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:ml-[200px] lg:justify-start">
//               <div className="flex space-x-8">
//                 <Link
//                   href="/"
//                   className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   href="/shop"
//                   className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
//                 >
//                   Shop
//                 </Link>
//                 <Link
//                   href="/blog"
//                   className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
//                 >
//                   Blog
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
              
//             {/* Icons Section */}
//             <div className="hidden md:flex items-center gap-4">
//               <Link href="/login" className="p-2 hover:bg-black/5 rounded-full ml-2">
//                 <UserCircle className="w-6 h-6" />
//               </Link>
//               <Link href="/shop" className="p-2 hover:bg-black/5 rounded-full">
//                 <Search className="w-6 h-6" />
//               </Link>
//               <Link href="/whishlist" className="p-2 hover:bg-black/5 rounded-full">
//                 <Heart className="w-6 h-6" />
//               </Link>
//               <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full">
//                 <ShoppingCart className="w-6 h-6" />
//                 {cartNum > 0 && (
//                   <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
//                     {cartNum}
//                   </span>
//                 )}
//               </Link>
//               {/* Hide UserButton on small screens */}
//               <div className="hidden sm:block">
//                 <UserButton />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`fixed inset-0 bg-white transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden shadow-lg z-50`}>
//           {/* Close Button */}
//           <div className="flex justify-end p-4">
//             <button
//               onClick={() => setMenuOpen(false)}
//               className="p-2 text-black hover:bg-black/10 rounded-full"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Mobile Menu Items */}
//           <div className="flex flex-col items-center space-y-6 mt-8 text-lg font-medium">
//             {['Home', 'Shop', 'Blog', 'Contact'].map((item) => (
//               <Link key={item} href={`/${item.toLowerCase()}`} className="text-black hover:text-gray-600" onClick={() => setMenuOpen(false)}>
//                 {item}
//               </Link>
//             ))}

//             {/* Show UserButton only in mobile menu */}
//             <UserButton />

//             {/* Mobile Icons Section */}
//             <div className="flex items-center gap-4">
//               <Link href="/login" className="p-2 hover:bg-black/5 rounded-full">
//                 <UserCircle className="w-6 h-6" />
//               </Link>
//               <Link href="/shop" className="p-2 hover:bg-black/5 rounded-full">
//                 <Search className="w-6 h-6" />
//               </Link>
//               <Link href="/whishlist" className="p-2 hover:bg-black/5 rounded-full">
//                 <Heart className="w-6 h-6" />
//               </Link>
//               <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full">
//                 <ShoppingCart className="w-6 h-6" />
//                 {cartNum > 0 && (
//                   <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
//                     {cartNum}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }


