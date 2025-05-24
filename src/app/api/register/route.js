import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      role: "user",
      createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(user)

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json(
      { message: "User created successfully. Please check your email for verification." },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
