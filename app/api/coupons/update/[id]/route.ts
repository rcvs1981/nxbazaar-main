import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const { title, couponCode, expiryDate, isActive } = body;

  try {
    const updated = await db.coupon.update({
      where: { id },
      data: {
        title,
        couponCode,
        expiryDate: new Date(expiryDate),
        isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update coupon error:", error);
    return new NextResponse("Failed to update coupon", { status: 500 });
  }
}
