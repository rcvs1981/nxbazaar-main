import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET /api/farmers/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const farmer = await db.user.findUnique({
      where: { id: params.id },
      include: { farmerProfile: true },
    });

    if (!farmer) {
      return NextResponse.json(
        { message: "Farmer Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(farmer);
  } catch (error) {
    console.error("GET Farmer Error:", error);
    return NextResponse.json(
      { message: "Failed to Fetch Farmer", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/farmers/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "User Not Found" },
        { status: 404 }
      );
    }

    const deletedUser = await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("DELETE User Error:", error);
    return NextResponse.json(
      { message: "Failed to Delete User", error },
      { status: 500 }
    );
  }
}

// ✅ PUT /api/farmers/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, emailVerified } = body;

    const existingUser = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "User Not Found" },
        { status: 404 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: { status, emailVerified },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PUT User Error:", error);
    return NextResponse.json(
      { message: "Failed to Update User", error },
      { status: 500 }
    );
  }
}
