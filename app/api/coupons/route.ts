import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // Recommended for API routes that need fresh data

export async function POST(request: NextRequest) {
  try {
    const { title, couponCode, expiryDate, isActive, vendorId } =
      await request.json();

    // Input validation
    if (!title || !couponCode || !expiryDate || vendorId === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate: new Date(expiryDate), // Ensure proper date format
        isActive: isActive ?? true, // Default to true if not provided
        vendorId,
      },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error("Coupon creation error:", error);
    return NextResponse.json(
      {
        message: "Failed to create Coupon",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get("vendorId");
    
    const coupons = await db.coupon.findMany({
      where: vendorId ? { vendorId } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      // Add pagination if needed
      // take: 10,
      // skip: 0,
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Coupon fetch error:", error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Coupons",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}