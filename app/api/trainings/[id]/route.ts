import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const training = await db.training.findUnique({ where: { id: params.id } });
    return NextResponse.json(training);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch training", error }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, slug, categoryId, imageUrl, description, isActive, content } = body;

    const existing = await db.training.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ message: "Training not found" }, { status: 404 });
    }

    const updated = await db.training.update({
      where: { id: params.id },
      data: { title, slug, categoryId, imageUrl, description, isActive, content },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update training", error }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const existing = await db.training.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ message: "Training not found" }, { status: 404 });
    }

    const deleted = await db.training.delete({ where: { id: params.id } });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete training", error }, { status: 500 });
  }
}
