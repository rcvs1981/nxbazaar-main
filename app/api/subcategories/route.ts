import { NextResponse } from "next/server";
import { db } from "@/lib/db";
type SubCategoryInput = {
  title: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  isActive?: boolean;
  categoryId: string;
};

export async function GET() {
  try {
    const subcategories = await db.subCategory.findMany({
      include: {
        category: true, // 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: SubCategoryInput = await req.json();

    if (!body.title || !body.slug || !body.categoryId) {
      return NextResponse.json(
        { success: false, message: "title, slug, and categoryId are required" },
        { status: 400 }
      );
    }

    const newSubCategory = await db.subCategory.create({
      data: {
        title: body.title,
        slug: body.slug,
        imageUrl: body.imageUrl ?? null,
        description: body.description ?? null,
        isActive: body.isActive ?? true,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Subcategory created successfully", data: newSubCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating subcategory:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Subcategory create failed" },
      { status: 500 }
    );
  }
}
