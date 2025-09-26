import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET by ID
export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const category = await db.category.findUnique({
      where: { id },
      include: { products: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Fetch Category", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE by ID
export async function DELETE(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const existingCategory = await db.category.findUnique({ where: { id } });
    if (!existingCategory) {
      return NextResponse.json(
        { data: null, message: "Category Not Found" },
        { status: 404 }
      );
    }

    const deletedCategory = await db.category.delete({ where: { id } });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Delete Category", error },
      { status: 500 }
    );
  }
}

// ✅ PUT (Update Category)
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const { title, slug, imageUrl, description, isActive } =
      await request.json();

    const existingCategory = await db.category.findUnique({ where: { id } });
    if (!existingCategory) {
      return NextResponse.json(
        { data: null, message: "Not Found" },
        { status: 404 }
      );
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: { title, slug, imageUrl, description, isActive },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Update Category", error },
      { status: 500 }
    );
  }
}
