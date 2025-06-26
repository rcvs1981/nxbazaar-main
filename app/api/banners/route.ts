import { NextResponse } from "next/server";
import {db} from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();

    

    const newBanner = await db.banner.create({
      data: { title, link, imageUrl, isActive },
    });

    return NextResponse.json(newBanner, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/banner error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to create banner", error: errorMessage },
      { status: 500 }
    );
  }
}

// GET: Fetch all categories
export async function GET() {
  try {
    const banners = await db.banner.findMany({
      orderBy: { createdAt: "desc" },
      
    });

    return NextResponse.json(banners);
  } catch (error: unknown) {
    console.error("GET /api/banner error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to fetch banner", error: errorMessage },
      { status: 500 }
    );
  }
}
