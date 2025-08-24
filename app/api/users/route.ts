// app/api/users/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
//import { Resend } from "resend";
import { UserRole } from "@prisma/client";
// import { EmailTemplate } from "@/components/email-template";

// Initialize Resend once
//const resend = new Resend(process.env.RESEND_API_KEY);


interface CreateUserBody {
  name: string;
  email: string;
  password: string;
  role: UserRole;  
  plan?: string;
}

interface ApiResponse<T = any> {
  data?: T;
  message: string;
  error?: string;
}

// ✅ Handle POST (create user)
export async function POST(request: Request) {
  try {
    const body: CreateUserBody = await request.json();
    const { name, email, password, role, plan } = body;

    // Input validation
    if (!name || !email || !password || !role) {
      const res: ApiResponse = { message: "Missing required fields" };
      return NextResponse.json(res, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      const res: ApiResponse = {
        data: null,
        message: `User with email (${email}) already exists`,
      };
      return NextResponse.json(res, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const token = base64url.encode(uuidv4());

    // Create user
   const newUser = await db.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role,  // ✅ type-safe
    plan,
    verificationToken: token,
  },
});

    // --- Optional Email sending ---
    /*
    if (role === "FARMER") {
      const redirectUrl = `onboarding/${newUser.id}?token=${token}`;
      const subject = "Account Verification - Limi Ecommerce";

      await resend.emails.send({
        from: "Desishub <info@jazzafricaadventures.com>",
        to: email,
        subject,
        react: EmailTemplate({
          name,
          redirectUrl,
          linkText: "Verify Account",
          description: "Thank you for creating an account. Click the link to complete onboarding.",
          subject,
        }),
      });
    }
    */

    const res: ApiResponse<typeof newUser> = {
      data: newUser,
      message: "User created successfully",
    };
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    const res: ApiResponse = { message: "Server error", error: String(error) };
    return NextResponse.json(res, { status: 500 });
  }
}

// ✅ Handle GET (list users)
export async function GET() {
  try {
    const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    const res: ApiResponse = { message: "Failed to fetch users", error: String(error) };
    return NextResponse.json(res, { status: 500 });
  }
}
