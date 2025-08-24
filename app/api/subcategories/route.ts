import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, categoryId, imageUrl, description, isActive } = body;

    // ✅ Check if slug already exists
    const existingSubCategory = await db.subCategory.findUnique({
      where: { slug },
    });

    if (existingSubCategory) {
      return NextResponse.json(
        {
          data: null,
          message: `SubCategory (${title}) already exists`,
        },
        { status: 409 }
      );
    }

    // ✅ Check if parent category exists
    const parentCategory = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!parentCategory) {
      return NextResponse.json(
        { message: "Parent category not found" },
        { status: 404 }
      );
    }

    // ✅ Create SubCategory
    const newSubCategory = await db.subCategory.create({
      data: {
        title,
        slug,
        imageUrl,
        description,
        isActive,
        categoryId,
      },
    });

    return NextResponse.json(newSubCategory, { status: 201 });
  } catch (error) {
    console.error("[POST_SUBCATEGORY_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to create subcategory", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subcategories = await db.subCategory.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true }, // Include parent category
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error("[GET_SUBCATEGORIES_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch subcategories", error: (error as Error).message },
      { status: 500 }
    );
  }
}
