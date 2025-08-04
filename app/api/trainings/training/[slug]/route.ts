import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Next.js App Router में params context से आते हैं
export async function GET( context: { params: { slug: string } }) {
  try {
    const { slug } = context.params;

    const training = await db.training.findUnique({
      where: {
        slug,
      },
    });

    return NextResponse.json(training);
  } catch (error) {
    console.error("[GET_TRAINING_ERROR]", error);

    return NextResponse.json(
      {
        message: "Failed to fetch training",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
