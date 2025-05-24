import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Find user with verification token
    const user = await db.collection("users").findOne({ verificationToken: token })

    if (!user) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 200 })
    }

    // Update user as verified
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerified: true,
          verificationToken: null,
        },
      },
    )

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email verification error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
    return NextResponse.json({ error: "An error occurred during email verification" }, { status: 500 })
  }
}
