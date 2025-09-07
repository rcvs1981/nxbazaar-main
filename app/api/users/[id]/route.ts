import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET /api/users/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        email: true,
        name: true,
        id: true,
        role: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET User Error:", error);
    return NextResponse.json(
      { message: "Failed to Fetch User", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/users/[id]
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
