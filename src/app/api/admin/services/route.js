import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Helper function to check if user is admin
async function isAdmin(userId) {
  try {
    const client = await clientPromise
    const db = client.db()
    const user = await db.collection("users").findOne({ _id: userId })
    return user && user.role === "admin"
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
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

    const services = await db.collection("services").find({ type }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ services }, { status: 200 })
  } catch (error) {
    console.error("Get services error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
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

    const { name, description, price, image, type, category, duration, includes } = await request.json()

    if (!name || !description || !price || !type) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const service = {
      name,
      description,
      price: Number(price),
      image: image || "/placeholder.svg?height=300&width=400",
      type,
      category: category || "general",
      duration: duration || "2-3 hours",
      includes: includes || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("services").insertOne(service)

    return NextResponse.json(
      {
        message: "Service created successfully",
        service: { ...service, _id: result.insertedId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create service error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
    return NextResponse.json({ error: "An error occurred while creating the service" }, { status: 500 })
  }
}

export async function DELETE(request) {
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
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("services").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Delete service error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
    return NextResponse.json({ error: "An error occurred while deleting the service" }, { status: 500 })
  }
}
