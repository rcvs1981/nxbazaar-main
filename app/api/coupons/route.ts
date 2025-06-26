import { NextResponse } from "next/server";
import {db} from "@/lib/db";


export async function POST(request: Request) {
  try {
    const {   
      title,
        couponCode,
        expiryDate,
        isActive,
        vendorId, } = await request.json();

    const newCoupon = await db.coupon.create({
      data: {   
        title,
        couponCode,
        expiryDate,
        isActive,
        vendorId, },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/coupon error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to create coupon", error: errorMessage },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const coupon = await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
      
    });

    return NextResponse.json(coupon);
  } catch (error: unknown) {
    console.error("GET /api/coupon error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to fetch coupon", error: errorMessage },
      { status: 500 }
    );
  }
}
