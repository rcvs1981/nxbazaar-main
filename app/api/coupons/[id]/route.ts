import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const coupon = await db.coupon.findUnique({
      where: {
        id: new ObjectId(id).toString(),
      },
    });

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch coupon", error }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: { id: new ObjectId(id).toString() },
    });

    if (!existingCoupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    const deletedCoupon = await db.coupon.delete({
      where: { id: new ObjectId(id).toString() },
    });

    return NextResponse.json(deletedCoupon);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete coupon", error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const { title, couponCode, expiryDate, isActive } = await request.json();

    const existingCoupon = await db.coupon.findUnique({
      where: { id: new ObjectId(id).toString() },
    });

    if (!existingCoupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    const updatedCoupon = await db.coupon.update({
      where: { id: new ObjectId(id).toString() },
      data: { title, couponCode, expiryDate, isActive },
    });

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update coupon", error }, { status: 500 });
  }
}
