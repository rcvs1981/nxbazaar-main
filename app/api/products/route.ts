import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

interface ProductPostData {
  barcode?: string;
  categoryId: string;
  description?: string;
  farmerId: string;
  isActive?: boolean;
  isWholesale?: boolean;
  productCode?: string;
  productPrice: string | number;
  salePrice: string | number;
  sku?: string;
  slug: string;
  tags?: string[];
  title: string;
  unit?: string;
  wholesalePrice: string | number;
  wholesaleQty: string | number;
  productStock: string | number;
  qty: string | number;
  productImages: string[];
}

export async function POST(request: Request) {
  try {
    const data: ProductPostData = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug || !data.categoryId || !data.farmerId) {
      return NextResponse.json(
        { data: null, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { slug: data.slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: `Product (${data.title}) already exists in the Database`,
        },
        { status: 409 }
      );
    }

    // Create new product
    const newProduct = await db.product.create({
      data: {
        barcode: data.barcode,
        categoryId: data.categoryId,
        description: data.description,
        userId: data.farmerId,
        productImages: data.productImages,
        imageUrl: data.productImages[0],
        isActive: data.isActive ?? true,
        isWholesale: data.isWholesale ?? false,
        productCode: data.productCode,
        productPrice: parseFloat(data.productPrice.toString()),
        salePrice: parseFloat(data.salePrice.toString()),
        sku: data.sku,
        slug: data.slug,
        tags: data.tags ?? [],
        title: data.title,
        unit: data.unit,
        wholesalePrice: parseFloat(data.wholesalePrice.toString()),
        wholesaleQty: parseInt(data.wholesaleQty.toString()),
        productStock: parseInt(data.productStock.toString()),
        qty: parseInt(data.qty.toString()),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create Product:", error);
    return NextResponse.json(
      {
        message: "Failed to create Product",
        error: process.env.NODE_ENV === "development" ? error : null,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("catId");
    const sortBy = searchParams.get("sort");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 3;

    // Build where clause
    const where: Prisma.ProductWhereInput = { isActive: true };
    
    if (categoryId) where.categoryId = categoryId;
    
    if (min || max) {
      where.salePrice = {};
      if (min) where.salePrice.gte = parseFloat(min);
      if (max) where.salePrice.lte = parseFloat(max);
    }

    // Build orderBy
    const orderBy: Prisma.ProductOrderByWithRelationInput[] = 
      sortBy === "asc" || sortBy === "desc" 
        ? [{ salePrice: sortBy }] 
        : [{ createdAt: "desc" }];

    // Fetch products
    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy,
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      data: products,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        hasNextPage: page * pageSize < totalCount,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Products:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch Products",
        error: process.env.NODE_ENV === "development" ? error : null,
      },
      { status: 500 }
    );
  }
}