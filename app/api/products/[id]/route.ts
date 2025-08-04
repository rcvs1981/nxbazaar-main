import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// ✅ Params Interface
interface Params {
  params: {
    id: string;
  };
}

// ✅ PUT Request Body Interface
interface ProductUpdateRequest {
  barcode?: string;
  categoryId: string;
  description?: string;
  farmerId: string;
  imageUrl?: string;
  isActive: boolean;
  isWholesale: boolean;
  productCode?: string;
  productPrice: number | string;
  salePrice: number | string;
  sku?: string;
  slug: string;
  tags?: string[];
  title: string;
  unit?: string;
  wholesalePrice: number | string;
  wholesaleQty: number | string;
  productStock: number | string;
  qty: number | string;
}
export async function GET(
  
  { params: { id } }: Params
) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Fetch Product", error },
      { status: 500 }
    );
  }
}
export async function DELETE(
  
  { params: { id } }: Params
) {
  try {
    const existingProduct = await db.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: "Product Not Found" },
        { status: 404 }
      );
    }

    const deletedProduct = await db.product.delete({ where: { id } });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Delete Product", error },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params: { id } }: Params
) {
  try {
    const body = (await request.json()) as ProductUpdateRequest;

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

    const existingProduct = await db.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: "Not Found" },
        { status: 404 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        barcode,
        categoryId,
        description,
        userId: farmerId,
        imageUrl,
        isActive,
        isWholesale,
        productCode,
        productPrice: parseFloat(productPrice as string),
        salePrice: parseFloat(salePrice as string),
        sku,
        slug,
        tags,
        title,
        unit,
        wholesalePrice: parseFloat(wholesalePrice as string),
        wholesaleQty: parseInt(wholesaleQty as string),
        productStock: parseInt(productStock as string),
        qty: parseInt(qty as string),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Update Product", error },
      { status: 500 }
    );
  }
}
