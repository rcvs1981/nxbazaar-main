"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; // 👈 adjust to where your Redux store types live

// Define type for a step
interface Step {
  number: number;
  title: string;
}

interface StepsProps {
  steps: Step[];
}

export default function Steps({ steps }: StepsProps) {
  // Typed selector for Redux state
  const currentStep = useSelector((store: RootState) => store.onboarding.currentStep);

  return (
    <nav className="flex text-sm md:text-xl mb-8">
      <ol
        role="list"
        className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
      >
        {/* First static step */}
        <li>
          <div className="-m-1">
            <h2 className="inline-flex items-center p-1 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700 dark:hover:text-lime-500 md:text-base">
              Account
            </h2>
          </div>
        </li>

        {/* Dynamic steps */}
        {steps.map((step) => (
          <li key={step.number}>
            <div className="flex items-center">
              <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
              <div className="-m-1">
                <p
                  className={`p-1 ml-1.5 text-sm md:text-base font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 ${
                    step.number === currentStep ? "text-lime-400" : ""
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
