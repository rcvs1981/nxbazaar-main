import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// ------------------- POST -------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Destructure safely with defaults
    const {
      barcode = "",
      categoryId,
      subcategoryId,
      description = "",
      farmerId,
      isActive = true,
      isWholesale = false,
      productCode = "",
      productPrice = "0",
      salePrice = "0",
      sku = "",
      slug = "",
      tags = [],
      title = "",
      unit = "",
      wholesalePrice = "0",
      wholesaleQty = "0",
      productStock = "0",
      qty = "0",
      productImages = [],
    } = body;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // Check for existing product by slug
    const existingProduct = await db.product.findUnique({ where: { slug } });
    if (existingProduct) {
      return NextResponse.json(
        { data: null, message: `Product (${title}) already exists` },
        { status: 409 }
      );
    }

    // Ensure numbers are parsed safely
    const newProduct = await db.product.create({
  data: {
    barcode,
    categoryId: categoryId || undefined,
    subcategoryId: subcategoryId || undefined,
    description,
    userId: farmerId,
    productImages,
    imageUrl: productImages[0] || "",
    isActive,
    isWholesale,
    productCode,
    productPrice: parseFloat(productPrice),
    salePrice: parseFloat(salePrice),
    sku,
    slug,
    tags,
    title,
    unit,
    wholesalePrice: parseFloat(wholesalePrice),
    wholesaleQty: parseInt(wholesaleQty),
    productStock: parseInt(productStock),
    qty: parseInt(qty),
  },
});

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("🔥 Failed to create product:", error);
    return NextResponse.json(
      { message: "Failed to create product", error: (error as Error).message },
      { status: 500 }
    );
  }
}
