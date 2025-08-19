// app/api/products/[id]/route.ts
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch product", error }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  try {
    const product = await db.product.findUnique({ where: { id: params.id } });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const deleted = await db.product.delete({ where: { id: params.id } });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete product", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const body = await request.json();

    const {
      barcode,
      categoryId,
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
    } = body;

    const updated = await db.product.update({
      where: { id: params.id },
      data: {
        barcode,
        categoryId,
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update product", error }, { status: 500 });
  }
}
