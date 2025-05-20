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
    const type = searchParams.get("type") || "makeup"

    const client = await clientPromise
    const db = client.db()

    // Get services based on type
    const services = await db.collection("services").find({ type }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ services }, { status: 200 })
  } catch (error) {
    console.error("Get services error:", error)
    return NextResponse.json({ error: "An error occurred while fetching services" }, { status: 500 })
  }
}

export async function POST(request) {
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

    const serviceData = await request.json()

    // Validate input
    if (!serviceData.name || !serviceData.type || !serviceData.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Add service
    const service = {
      ...serviceData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("services").insertOne(service)

    return NextResponse.json(
      {
        message: "Service added successfully",
        serviceId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add service error:", error)
    return NextResponse.json({ error: "An error occurred while adding the service" }, { status: 500 })
  }
}
