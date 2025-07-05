{/** 
import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    const { title, couponCode, expiryDate, isActive, vendorId } =
      await request.json();
    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate,
        isActive,
        vendorId,
      },
    });
    console.log(newCoupon);
    return NextResponse.json(newCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create Coupon",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(coupons);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Coupon",
        error,
      },
      { status: 500 }
    );
  }
}

   
 
import { NextResponse } from "next/server";
import {db} from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { title, couponCode, expiryDate, isActive } =
      await request.json();

    const newCoupon = await db.coupon.create({
      data: { title, couponCode, expiryDate, isActive },
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
   
      const coupons = await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
    
    });

    return NextResponse.json(coupons);
  } catch (error: unknown) {
    console.error("GET /api/coupons error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to fetch coupons", error: errorMessage },
      { status: 500 }
    );
  }
}
  */}
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // adjust path as needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, couponCode, expiryDate, isActive } = body;

    if (!title || !couponCode || !expiryDate || typeof isActive !== "boolean") {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate: new Date(expiryDate),
        isActive,
      },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error("[CREATE_COUPON_ERROR]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
