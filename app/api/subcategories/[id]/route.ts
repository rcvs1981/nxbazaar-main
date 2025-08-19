// app/api/subcategories/[id]/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/subcategories/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subcategory = await db.subCategory.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!subcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: subcategory });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch subcategory" },
      { status: 500 }
    );
  }
}

// PUT /api/subcategories/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedSubCategory = await db.subCategory.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        imageUrl: body.imageUrl ?? null,
        description: body.description ?? null,
        isActive: body.isActive,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json({ success: true, data: updatedSubCategory });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return NextResponse.json(
      { success: false, message: "Subcategory update failed" },
      { status: 500 }
    );
  }
}

// DELETE /api/subcategories/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.subCategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "Subcategory deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return NextResponse.json(
      { success: false, message: "Subcategory delete failed" },
      { status: 500 }
    );
  }
}
