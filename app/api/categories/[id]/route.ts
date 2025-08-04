// app/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

//
// ✅ GET /api/categories/[id]
// ------------------------------------------------------
export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Category ID" }, { status: 400 });
  }

  try {
    const category = await db.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET_CATEGORY_ERROR]", message);

    return NextResponse.json(
      { message: "Failed to fetch category", error: message },
      { status: 500 }
    );
  }
}

//
// ✅ DELETE /api/categories/[id]
// ------------------------------------------------------
export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Category ID" }, { status: 400 });
  }

  try {
    const deletedCategory = await db.category.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully",
         data: deletedCategory },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[DELETE_CATEGORY_ERROR]", message);

    return NextResponse.json(
      { message: "Error deleting category", error: message },
      { status: 500 }
    );
  }
}

//
// ✅ PUT /api/categories/[id]
// ------------------------------------------------------
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Category ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, slug, imageUrl, description, isActive } = body as {
      title?: string;
      slug?: string;
      imageUrl?: string;
      description?: string;
      isActive?: boolean;
    };

    const existingCategory = await db.category.findUnique({ where: { id } });

    if (!existingCategory) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(imageUrl && { imageUrl }),
        ...(description && { description }),
        ...(typeof isActive === "boolean" && { isActive }),
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[UPDATE_CATEGORY_ERROR]", message);

    return NextResponse.json(
      { message: "Failed to update category", error: message },
      { status: 500 }
    );
  }
}
