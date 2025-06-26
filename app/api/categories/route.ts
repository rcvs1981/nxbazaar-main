import { NextResponse } from "next/server";
import {db} from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { title, slug, imageUrl, description, isActive } = await request.json();

    const existingCategory = await db.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: `Category (${title}) already exists in the Database`,
        },
        { status: 409 }
      );
    }

    const newCategory = await db.category.create({
      data: { title, slug, imageUrl, description, isActive },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/categories error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to create category", error: errorMessage },
      { status: 500 }
    );
  }
}

// GET: Fetch all categories
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: { products: true },
    });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error("GET /api/categories error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to fetch categories", error: errorMessage },
      { status: 500 }
    );
  }
}
