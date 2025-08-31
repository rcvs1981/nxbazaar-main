import {db} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST /api/farmers
export async function POST(request: NextRequest) {
  try {
    const farmerData = await request.json();

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: farmerData.userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "No User Found" },
        { status: 404 }
      );
    }

    // Update user emailVerified
    const updatedUser = await db.user.update({
      where: { id: farmerData.userId },
      data: { emailVerified: true },
    });

    // Create farmer profile
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
        landSize: parseFloat(farmerData.landSize),
        mainCrop: farmerData.mainCrop,
        userId: farmerData.userId,
      },
    });

    // ✅ Return both objects
    return NextResponse.json(
      {
        message: "Farmer profile created and user updated",
        updatedUser,
        newFarmerProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/farmers error:", error);
    return NextResponse.json(
      {
        message: "Failed to create Farmer",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
