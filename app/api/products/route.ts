import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

// Type definitions for your product data
interface ProductData {
  barcode: string;
  categoryId: string;
  description: string;
  farmerId: string;
  isActive: boolean;
  isWholesale: boolean;
  productCode: string;
  productPrice: string | number;
  salePrice: string | number;
  sku: string;
  slug: string;
  tags: string[];
  title: string;
  unit: string;
  wholesalePrice: string | number;
  wholesaleQty: string | number;
  productStock: string | number;
  qty: string | number;
  productImages: string[];
}

// Type for the where clause
type ProductWhereInput = Prisma.ProductWhereInput & {
  salePrice?: {
    gte?: number;
    lte?: number;
  };
};

// Type for the orderBy clause
type ProductOrderByInput = Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];

export async function POST(request: NextRequest) {
  try {
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
    } = (await request.json()) as ProductData;

    // Validate required fields
    if (!title || !slug || !categoryId || !farmerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if product already exists
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

    // Create new product
    const newProduct = await db.product.create({
      data: {
        barcode,
        categoryId,
        description,
        userId: farmerId,
        productImages,
        imageUrl: productImages[0] || "",
        isActive,
        isWholesale,
        productCode,
        productPrice: parseFloat(productPrice.toString()),
        salePrice: parseFloat(salePrice.toString()),
        sku,
        slug,
        tags,
        title,
        unit,
        wholesalePrice: parseFloat(wholesalePrice.toString()),
        wholesaleQty: parseInt(wholesaleQty.toString()),
        productStock: parseInt(productStock.toString()),
        qty: parseInt(qty.toString()),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create Product:", error);
    return NextResponse.json(
      {
        message: "Failed to create Product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const categoryId = searchParams.get("catId");
    const sortBy = searchParams.get("sort");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 3;

    // Build the where clause with proper typing
    const where: ProductWhereInput = {};
    
    if (categoryId) where.categoryId = categoryId;
    
    if (min || max) {
      where.salePrice = {};
      if (min) where.salePrice.gte = parseFloat(min);
      if (max) where.salePrice.lte = parseFloat(max);
    }

    // Build the orderBy clause with proper typing
    const orderBy: ProductOrderByInput = [];
    
    if (sortBy === "asc" || sortBy === "desc") {
      orderBy.push({ salePrice: sortBy });
    } else {
      orderBy.push({ createdAt: "desc" });
    }

    // Fetch products with pagination
    const products = await db.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    });

    // Get total count for pagination metadata
    const totalCount = await db.product.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Products:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch Products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}