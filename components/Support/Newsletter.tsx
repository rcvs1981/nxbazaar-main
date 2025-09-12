"use client";

import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="flex bg-white dark:bg-primaryColor items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16">
      <div className="max-w-3xl mx-auto text-center lg:p-10">
        {/* Heading */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
            Subscribe and get
            <span className="block">benefits from our newsletter</span>
          </h2>
          <p className="mt-4 text-lg tracking-tight text-gray-600 dark:text-gray-300">
            If you could kick the person in the pants responsible for most of
            your trouble, you wouldn't sit for a month. Imagine that, fam.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center max-w-sm pt-8 pb-12 mx-auto md:pt-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="flex flex-col w-full gap-2 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email..."
                required
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 dark:bg-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-black border-2 border-black rounded-full hover:bg-transparent hover:text-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Subscribe
                <MoveRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>

        {/* Terms & Privacy */}
        <div className="mx-auto sm:max-w-lg text-center">
          <p className="text-xs text-gray-500">
            By subscribing, you agree to Unwrapped’s{" "}
            <Link
              href="#"
              className="text-blue-600 hover:text-black underline"
              target="_blank"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-blue-600 hover:text-black underline"
              target="_blank"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
