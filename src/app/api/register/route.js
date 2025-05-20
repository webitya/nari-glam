import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { hash } from "bcrypt"
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      verificationExpires,
      createdAt: new Date(),
    }

    await db.collection("users").insertOne(user)

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ message: "User registered successfully. Please verify your email." }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
