import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

//
// ✅ GET /api/subcategories/[id]
//
export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid SubCategory ID" }, { status: 400 });
  }

  try {
    const subcategory = await db.subCategory.findUnique({
      where: { id },
      include: { category: true, },
    });

    if (!subcategory) {
      return NextResponse.json({ message: "SubCategory not found" }, { status: 404 });
    }

    return NextResponse.json(subcategory);
  } catch (error: unknown) {
    console.error("[GET_SUBCATEGORY_ERROR]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to fetch subcategory", error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid SubCategory ID" }, { status: 400 });
  }

  try {
    const deletedSubCategory = await db.subCategory.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "SubCategory deleted successfully", data: deletedSubCategory },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[DELETE_SUBCATEGORY_ERROR]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error deleting subcategory", error: message },
      { status: 500 }
    );
  }
}

//
// ✅ PUT /api/subcategories/[id]
//
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid SubCategory ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, slug, imageUrl, description, isActive, categoryId } = body;

    const existingSubCategory = await db.subCategory.findUnique({ where: { id } });

    if (!existingSubCategory) {
      return NextResponse.json({ message: "SubCategory not found" }, { status: 404 });
    }

    const updatedSubCategory = await db.subCategory.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(imageUrl && { imageUrl }),
        ...(description && { description }),
        ...(typeof isActive === "boolean" && { isActive }),
        ...(categoryId && { categoryId }),
      },
    });

    return NextResponse.json(updatedSubCategory);
  } catch (error: unknown) {
    console.error("[UPDATE_SUBCATEGORY_ERROR]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to update subcategory", error: message },
      { status: 500 }
    );
  }
}
