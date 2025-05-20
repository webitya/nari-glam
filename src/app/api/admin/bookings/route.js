import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"

// Helper function to check if user is admin
async function isAdmin(userId) {
  const client = await clientPromise
  const db = client.db()

  const user = await db.collection("users").findOne({ _id: userId })
  return user && user.role === "admin"
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to access this resource" }, { status: 401 })
    }

    // Check if user is admin
    const admin = await isAdmin(session.user.id)
    if (!admin) {
      return NextResponse.json({ error: "You do not have permission to access this resource" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db()

    // Build query
    const query = {}
    if (status && status !== "all") {
      query.status = status
    }
    if (search) {
      query.$or = [
        { id: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { service: { $regex: search, $options: "i" } },
      ]
    }

    // Get bookings
    const bookings = await db
      .collection("bookings")
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("bookings").countDocuments(query)

    return NextResponse.json(
      {
        bookings,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get admin bookings error:", error)
    return NextResponse.json({ error: "An error occurred while fetching bookings" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to access this resource" }, { status: 401 })
    }

    // Check if user is admin
    const admin = await isAdmin(session.user.id)
    if (!admin) {
      return NextResponse.json({ error: "You do not have permission to access this resource" }, { status: 403 })
    }

    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "Booking ID and status are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Update booking status
    const result = await db.collection("bookings").updateOne(
      { id },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Booking status updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Update booking status error:", error)
    return NextResponse.json({ error: "An error occurred while updating the booking status" }, { status: 500 })
  }
}
