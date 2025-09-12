"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export type Training = {
  title: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
};

interface TrainingCardProps {
  training: Training;
}

export default function TrainingCard({ training }: TrainingCardProps) {
  return (
    <div className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-start flex-col lg:items-center">
          <div className="relative w-full h-16 shrink-0">
            <Image
              src={training.imageUrl}
              alt={training.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="ml-0 lg:ml-5 mt-2">
            <p className="text-sm leading-7 font-bold text-gray-900 mt-2.5">
              <Link
                href={`/blogs/${training.slug}`}
                className="line-clamp-2 relative"
              >
                {training.title}
                <span className="absolute inset-0" aria-hidden="true"></span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
