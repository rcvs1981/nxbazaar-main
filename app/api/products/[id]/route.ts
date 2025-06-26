import db from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

// टाइप डेफिनिशन
interface CategoryData {
  title: string;
  slug: string;
  imageUrl: string;
  description?: string;
  isActive: boolean;
}

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    const category = await db.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { message: "Failed to fetch category", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const existingCategory = await db.category.findUnique({ where: { id } });
    
    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // डिलीट से पहले संबंधित प्रोडक्ट्स को हैंडल करें (यदि जरूरी हो)
    await db.product.deleteMany({ where: { categoryId: id } });

    const deletedCategory = await db.category.delete({ where: { id } });
    
    return NextResponse.json(
      { message: "Category deleted successfully", data: deletedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "Failed to delete category", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { title, slug, imageUrl, description, isActive }: CategoryData = await request.json();

    const existingCategory = await db.category.findUnique({ where: { id } });
    
    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // वैलिडेशन जोड़ें
    if (!title || !slug || !imageUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: { title, slug, imageUrl, description, isActive },
    });
    
    return NextResponse.json(
      { message: "Category updated successfully", data: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Failed to update category", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}