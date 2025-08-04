import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, categoryId, imageUrl, description, isActive, content } = body;

    const existing = await db.training.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ message: `Training (${title}) already exists` }, { status: 409 });
    }

    const training = await db.training.create({
      data: { title, slug, categoryId, imageUrl, description, isActive, content },
    });

    return NextResponse.json(training);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ message: "Failed to create Training", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const trainings = await db.training.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ message: "Failed to fetch trainings", error }, { status: 500 });
  }
}
