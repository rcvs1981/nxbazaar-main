import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

// ✅ Create Market
export async function POST(request: NextRequest) {
  try {
    const { title, slug, logoUrl, description, isActive, categoryIds } =
      await request.json();

    const existing = await db.market.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { message: `Market (${title}) already exists.` },
        { status: 409 }
      );
    }

    const connectCategories = categoryIds.map((id: string) => ({ id }));

    const market = await db.market.create({
      data: {
        title,
        slug,
        logoUrl,
        description,
        isActive,
        categories: {
          connect: connectCategories,
        },
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(market);
  } catch (error) {
    console.error("POST /markets error:", error);
    return NextResponse.json(
      { message: "Failed to create market", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ Get all markets
export async function GET() {
  try {
    const markets = await db.market.findMany({
      include: {
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(markets);
  } catch (error) {
    console.error("GET /markets error:", error);
    return NextResponse.json(
      { message: "Failed to fetch markets", error: (error as Error).message },
      { status: 500 }
    );
  }
}
