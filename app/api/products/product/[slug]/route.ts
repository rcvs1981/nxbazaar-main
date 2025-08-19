// app/api/products/slug/[slug]/route.ts
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  slug: string;
}

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  try {
    const product = await db.product.findUnique({
      where: { slug: params.slug },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch product", error }, { status: 500 });
  }
}
