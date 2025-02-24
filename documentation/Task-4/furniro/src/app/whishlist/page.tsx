

"use client";
import { useState, useEffect } from "react";
import Image from "next/image"
import { Trash2, ShoppingCart } from 'lucide-react';
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IWishlistItem {
  productImage: string;
  productName: string;
  productPrice: number;
  description: string;
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<IWishlistItem[]>([]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(wishlist);
  }, []);

  const handleAddToCart = (item: IWishlistItem) => {
    const cart: Array<{ id: number; name: string; image: string; price: number; quantity: number }> =
      JSON.parse(localStorage.getItem("cart") || "[]");
  
    const existing = cart.find((i) => i.name === item.productName);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: Date.now(),
        name: item.productName || "Untitled Item",
        image: isValidUrl(item.productImage) ? item.productImage : "/placeholder.svg",
        price: item.productPrice,
        quantity: 1,
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-update"));
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 mt-[99px]">
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {wishlistItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-6 items-center">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                    <Image
                      src={item.productImage}
                      alt={item.productName || "Product image"}
                      fill
                      className="object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                      unoptimized={process.env.NODE_ENV !== "production"}
                      sizes="(max-width: 640px) 64px, 96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm sm:text-base truncate">{item.productName}</h3>
                    </div>
                    <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4">
                      <Link href={"/cart"} className="flex-1">
                        <Button
                          variant="outline"
                          onClick={() => handleAddToCart(item)}
                          className="w-full text-xs sm:text-sm h-8 sm:h-9"
                        >
                          <ShoppingCart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Add to Cart
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const updated = wishlistItems.filter((_, i) => i !== index);
                          setWishlistItems(updated);
                          localStorage.setItem("wishlist", JSON.stringify(updated));
                        }}
                        className="h-8 sm:h-9 w-8 sm:w-9 p-2"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-8">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-medium mb-4">Wishlist Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Total Items</span>
                  <span>{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between font-medium text-sm sm:text-base">
                  <span>Total Value</span>
                  <span>
                    {String( 
                      (wishlistItems.reduce((total, item) => {
                        return total + +item.productPrice
                      },0)).toFixed(2)
                    )}
                  </span>
                </div>
                <Link href="/cart">
                  <Button className="w-full text-sm sm:text-base h-9 sm:h-10 mt-10">
                    View Cart
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
