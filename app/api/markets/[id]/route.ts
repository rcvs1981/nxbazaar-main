import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

// ✅ Get Market by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const market = await db.market.findUnique({
      where: { id: params.id },
      include: { categories: true },
    });

    if (!market) {
      return NextResponse.json({ message: "Market not found" }, { status: 404 });
    }

    return NextResponse.json(market);
  } catch (error) {
    console.error("GET /markets/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch market", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ Update Market
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, slug, logoUrl, description, isActive, categoryIds } =
      await request.json();

    const connectCategories = categoryIds.map((id: string) => ({ id }));

    const updated = await db.market.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        logoUrl,
        description,
        isActive,
        categories: {
          set: connectCategories, // replace all relations
        },
      },
      include: { categories: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /markets/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update market", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ Delete Market
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await db.market.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Market deleted", data: deleted });
  } catch (error) {
    console.error("DELETE /markets/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete market", error: (error as Error).message },
      { status: 500 }
    );
  }
}
