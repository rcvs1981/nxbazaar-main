import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
     
      
    });
    return NextResponse.json(customers);
  
  } catch (error: unknown) {
    console.error("GET /api/customers error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to fetch customers", error: errorMessage },
      { status: 500 }
    );
  }
}
