import {db} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const farmerData = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        id: farmerData.userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: `No User Found` },
        { status: 404 }
      );
    }

    await db.user.update({
      where: { id: farmerData.userId },
      data: { emailVerified: true },
    });

    const newFarmerProfile = await db.farmerProfile.create({
      data: {
        code: farmerData.code,
        contactPerson: farmerData.contactPerson,
        contactPersonPhone: farmerData.contactPersonPhone,
        profileImageUrl: farmerData.profileImageUrl,
        email: farmerData.email,
        name: farmerData.name,
        notes: farmerData.notes,
        phone: farmerData.phone,
        physicalAddress: farmerData.physicalAddress,
        terms: farmerData.terms,
        isActive: farmerData.isActive,
        products: farmerData.products,
        landSize: isNaN(parseFloat(farmerData.landSize))
          ? 0
          : parseFloat(farmerData.landSize),
        mainCrop: farmerData.mainCrop,
        userId: farmerData.userId,
      },
    });

    return NextResponse.json({
      data: newFarmerProfile,
      message: "Farmer Profile Created Successfully",
    });
  } catch (error) {
    console.error("[FARMER_PROFILE_POST_ERROR]", error);
    return NextResponse.json(
      {
        message: "Failed to create Farmer",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const farmers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { role: "FARMER" },
      include: { farmerProfile: true },
    });

    return NextResponse.json({ data: farmers });
  } catch (error) {
    console.error("[FARMER_PROFILE_GET_ERROR]", error);
    return NextResponse.json(
      {
        message: "Failed to Fetch FARMERs",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
