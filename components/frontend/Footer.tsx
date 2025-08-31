"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, ShoppingBag, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 dark:bg-gray-950 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <ShoppingBag className="h-6 w-6 text-purple-400" />
            MultiVendor
          </div>
          <p className="mt-3 text-sm text-gray-400">
            A modern marketplace where buyers and vendors connect seamlessly.
          </p>
        </div>

        {/* Customer Links */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Customers
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shops" className="hover:text-white">Browse Shops</Link></li>
            <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link href="/cart" className="hover:text-white">My Cart</Link></li>
            <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
          </ul>
        </div>

        {/* Vendor Links */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Vendors
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/vendor/register" className="hover:text-white">Become a Vendor</Link></li>
            <li><Link href="/vendor/dashboard" className="hover:text-white">Vendor Dashboard</Link></li>
            <li><Link href="/vendor/support" className="hover:text-white">Vendor Support</Link></li>
          </ul>
        </div>

        {/* Social + Theme Toggle */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Connect
          </h3>
          <div className="flex space-x-4 mt-3">
            <Link href="https://facebook.com" target="_blank"><Facebook className="h-5 w-5 hover:text-white" /></Link>
            <Link href="https://twitter.com" target="_blank"><Twitter className="h-5 w-5 hover:text-white" /></Link>
            <Link href="https://instagram.com" target="_blank"><Instagram className="h-5 w-5 hover:text-white" /></Link>
            
            {/* Dark/Light Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md border border-gray-700 hover:border-purple-500"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-200" />
                )}
              </button>
            )}
          </div>
          <p className="mt-3 text-sm text-gray-400">
            support@multivendor.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500 dark:border-gray-700">
        © {new Date().getFullYear()} MultiVendor Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
