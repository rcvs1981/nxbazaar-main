"use client";

import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [open, setOpen] = useState(false);

  const helpOptions = [
    { href: "tel:07880994646", icon: Headphones, label: "Call: 07880994646" },
    { href: "/track", icon: Truck, label: "Track your Order" },
    { href: "/returns", icon: CornerDownLeft, label: "Returns and Refunds" },
    { href: "/chat", icon: MessageSquare, label: "Chat with Us" },
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        aria-label="Open Help Modal"
        onClick={() => setOpen(true)}
        className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
      >
        <HelpCircle />
        <span>Help</span>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          {/* Modal Box */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()} // click inside won’t close
          >
            {/* Header */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Need Help with Shopping? Talk to our Help Desk
            </h2>

            {/* Options */}
            <div className="grid grid-cols-2 gap-6">
              {helpOptions.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center space-x-2 text-green-950 dark:text-slate-100"
                >
                  <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                    <Icon className="w-6 h-6 text-lime-800" />
                  </div>
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
