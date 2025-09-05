import {db} from "@/lib/db";
import { NextResponse } from "next/server";

// POST: Create Product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      barcode,
      categoryId,
      description,
      subCategoryId,
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

    // ✅ Check if product already exists
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

    // ✅ Create new product
    const newProduct = await db.product.create({
      data: {
        barcode,
        categoryId,
        description,
        subCategoryId,
        productImages,
        imageUrl: productImages?.[0] || null,
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

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to create Product", error: String(error) },
      { status: 500 }
    );
  }
}

// GET: Fetch Products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("catId");
    const sortBy = searchParams.get("sort");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 3;

    let where: any = {};
    if (categoryId) where.categoryId = categoryId;

    if (min && max) {
      where.salePrice = { gte: parseFloat(min), lte: parseFloat(max) };
    } else if (min) {
      where.salePrice = { gte: parseFloat(min) };
    } else if (max) {
      where.salePrice = { lte: parseFloat(max) };
    }

    // ✅ Fetch with conditions
    let products;
    if (categoryId && sortBy) {
      products = await db.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { salePrice: sortBy === "asc" ? "asc" : "desc" },
      });
    } else if (categoryId) {
      products = await db.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      });
    } else {
      products = await db.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch Products", error: String(error) },
      { status: 500 }
    );
  }
}







{/** 
import { NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: { category: true, subCategory: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = await db.product.create({
      data: {
        title: body.title,
        slug: body.slug,
        imageUrl: body.imageUrl,
        productImages: body.productImages || [],
        description: body.description,
        isActive: body.isActive ?? true,
        isWholesale: body.isWholesale ?? false,
        sku: body.sku,
        barcode: body.barcode,
        productCode: body.productCode,
        unit: body.unit,
        productPrice: body.productPrice,
        salePrice: body.salePrice,
        wholesalePrice: body.wholesalePrice,
        wholesaleQty: body.wholesaleQty,
        productStock: body.productStock,
        qty: body.qty,
        tags: body.tags || [],
        categoryId: body.categoryId,
        subCategoryId: body.subCategoryId,
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
*/}