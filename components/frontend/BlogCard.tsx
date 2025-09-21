import { convertIsoDateToNormal } from "@/lib/convertIsoDatetoNormal";
import { getData } from "@/lib/getData";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type BlogCardProps = {
  training: {
    id: string | number;
    title: string;
    slug: string;
    imageUrl?: string;
    categoryId: string | number;
    createdAt: string;
  };
};

export default async function BlogCard({ training }: BlogCardProps) {
  const category = await getData(`categories/${training.categoryId}`);
  const categoryTitle = category?.title || "Uncategorized";
  const normalDate = convertIsoDateToNormal(training.createdAt);

  // ✅ fallback image
  const imageSrc =
    training.imageUrl && training.imageUrl.trim() !== ""
      ? training.imageUrl
      : "/placeholder.png";

  return (
    <div className="group">
      <div className="relative">
        <div className="overflow-hidden rounded-xl aspect-[16/9]">
          <Image
            src={imageSrc}
            alt={training.title || "Blog image"}
            fill
            className="object-cover transition-all duration-200 transform group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded left-3 top-3">
          {categoryTitle}
        </span>
      </div>

      <p className="mt-6 text-sm font-medium text-gray-500 dark:text-slate-200">
        {normalDate}
      </p>

      <h2 className="mt-4 text-xl font-bold leading-tight text-gray-900 xl:pr-8">
        <Link
          href={`/blogs/${training.slug}`}
          className="line-clamp-2 dark:text-slate-200"
        >
          {training.title}
        </Link>
      </h2>

      <div className="mt-6">
        <Link
          href={`/blogs/${training.slug}`}
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-900 dark:border-lime-200 group dark:text-lime-200"
        >
          Continue Reading
          <MoveRight className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
