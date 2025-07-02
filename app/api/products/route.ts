// app/api/products/route.ts (for Next.js 15.3.2 with TypeScript)
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("catId");
    const sortBy = searchParams.get("sort");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 3;

    const where: Prisma.ProductWhereInput = {}; // ✅ type-safe

    if (categoryId) {
      where.categoryId = categoryId;
    }

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

    const orderBy: Prisma.ProductOrderByWithRelationInput = sortBy
      ? { salePrice: sortBy === "asc" ? "asc" : "desc" }
      : { createdAt: "desc" };

    const products = await db.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
