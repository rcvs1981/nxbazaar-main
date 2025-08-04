import {db} from "@/lib/db";
import { NextResponse, NextRequest  } from "next/server";
import { Prisma } from "@prisma/client";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      barcode,
      categoryId,
      description,
      farmerId,
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
      productImages,
    } = body;

    if (!Array.isArray(productImages) || productImages.length === 0) {
      return NextResponse.json(
        { message: "At least one product image is required." },
        { status: 400 }
      );
    }

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: `Product (${title}) already exists in the Database`,
        },
        { status: 409 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        barcode,
        categoryId,
        description,
        userId: farmerId,
        productImages,
        imageUrl: productImages[0], // ✅ safe now
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

    console.log("✅ New product created:", newProduct);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("❌ Product creation failed:", error);
    return NextResponse.json(
      {
        message: "Failed to create Product",
        error,
      },
      { status: 500 }
    );
  }
}




export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("catId");
  const sortBy = request.nextUrl.searchParams.get("sort");
  const min = request.nextUrl.searchParams.get("min");
  const max = request.nextUrl.searchParams.get("max");
  const page = request.nextUrl.searchParams.get("page") || "1";
  const pageSize = 3;

  const where: Prisma.ProductWhereInput = {};

  if (categoryId) where.categoryId = categoryId;


  if (min && max) {
    where.salePrice = {
      gte: parseFloat(min),
      lte: parseFloat(max),
    };
  } else if (min) {
    where.salePrice = {
      gte: parseFloat(min),
    };
  } else if (max) {
    where.salePrice = {
      lte: parseFloat(max),
    };
  }

  try {
    const products = await db.product.findMany({
      where,
      skip: (parseInt(page) - 1) * pageSize,
      take: pageSize,
      orderBy: sortBy
        ? { salePrice: sortBy === "asc" ? "asc" : "desc" }
        : { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Products",
        error,
      },
      { status: 500 }
    );
  }
}
