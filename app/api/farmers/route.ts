// app/api/categories/route.ts

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
   
   const { title, link, imageUrl, isActive } = await request.json();

   
     const newBanner = await db.banner.create({
      data: {
        title,
        link,
        imageUrl,
        isActive,
      },
    });

    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    console.error("POST /api/banner error:", error);
    return NextResponse.json(
      {
        message: "Failed to create Banner",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
   
     const banners = await db.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json( banners );
  } catch (error) {
    console.error("GET /api/ banners  error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch  banners ",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
