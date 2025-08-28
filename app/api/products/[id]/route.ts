import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// ------------------- GET PRODUCT -------------------
export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch product", error },
      { status: 500 }
    );
  }
}

// ------------------- DELETE PRODUCT -------------------
export async function DELETE(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: "Product not found" },
        { status: 404 }
      );
    }

    const deletedProduct = await db.product.delete({ where: { id } });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete product", error },
      { status: 500 }
    );
  }
}

// ------------------- UPDATE PRODUCT -------------------
export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const {
      barcode,
      categoryId,
      subcategoryId, // ✅ New
      description,
      farmerId,
      imageUrl,
      isActive,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      sku,
      slug,
      tags,
      title,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
    } = await request.json();

    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        barcode,
        categoryId,
        subcategoryId, 
        description,
        userId: farmerId,
        imageUrl,
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

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update product", error },
      { status: 500 }
    );
  }
}
