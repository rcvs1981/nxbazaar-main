

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, imageUrl, description, isActive } = body;

    // ✅ Check if slug already exists
    const existingCategory = await db.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: `Category (${title}) already exists in the database`,
        },
        { status: 409 }
      );
    }

    // ✅ Create new category
    const newCategory = await db.category.create({
      data: {
        title,
        slug,
        imageUrl,
        description,
        isActive,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      {
        message: "Failed to create category",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: { products: true },
    });

    // ✅ Always return an array
    return NextResponse.json(categories ?? []);
  } catch (error) {
    console.error("Error fetching categories:", error);

    // ✅ Return empty array on error to prevent `.filter` crash
    return NextResponse.json([], { status: 200 });
  }
}