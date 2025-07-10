import { NextRequest } from "next/server";
import { db } from "@/lib/db"; // Ensure this is correct

// GET category by ID
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params?.id) {
      return new Response("Missing ID", { status: 400 });
    }

    const category = await db.category.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return new Response("Category not found", { status: 404 });
    }

    return Response.json(category);
  } catch (error) {
    console.error("API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// ✅ PUT (Update category)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const { title, slug, description, imageUrl, isActive } = body;

    const updated = await prisma.category.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        description,
        imageUrl,
        isActive,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return new Response("Failed to update category", { status: 500 });
  }
}

// ✅ DELETE category
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });

    return new Response("Category deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response("Failed to delete category", { status: 500 });
  }
}