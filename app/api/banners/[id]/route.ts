import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

// GET: Get a single banner
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const banner = await db.banner.findUnique({
      where: { id: params.id },
    });

    if (!banner) {
      return NextResponse.json({ message: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error("[GET Banner Error]:", error);
    return NextResponse.json(
      { message: "Failed to fetch banner", error },
      { status: 500 }
    );
  }
}

// PUT: Update a banner
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, link, imageUrl, isActive } = body;

    const existingBanner = await db.banner.findUnique({
      where: { id: params.id },
    });

    if (!existingBanner) {
      return NextResponse.json({ message: "Banner not found" }, { status: 404 });
    }

    const updatedBanner = await db.banner.update({
      where: { id: params.id },
      data: { title, link, imageUrl, isActive },
    });

    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error("[PUT Banner Error]:", error);
    return NextResponse.json(
      { message: "Failed to update banner", error },
      { status: 500 }
    );
  }
}

// DELETE: Delete a banner
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingBanner = await db.banner.findUnique({
      where: { id: params.id },
    });

    if (!existingBanner) {
      return NextResponse.json({ message: "Banner not found" }, { status: 404 });
    }

    const deletedBanner = await db.banner.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedBanner);
  } catch (error) {
    console.error("[DELETE Banner Error]:", error);
    return NextResponse.json(
      { message: "Failed to delete banner", error },
      { status: 500 }
    );
  }
}
