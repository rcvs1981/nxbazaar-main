import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { title, couponCode, expiryDate, isActive, vendorId } = body;

  try {
    const coupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate: new Date(expiryDate),
        isActive,
        vendorId,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error("Create coupon error:", error);
    return new NextResponse("Failed to create coupon", { status: 500 });
  }
}
