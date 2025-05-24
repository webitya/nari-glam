import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to create a booking" }, { status: 401 })
    }

    const { serviceId, serviceName, serviceType, date, time, paymentMethod, amount, size, razorpayPaymentId } =
      await request.json()

    if (!serviceId || !serviceName || !serviceType || !date || !paymentMethod || !amount) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Generate booking ID
    const bookingId = `BK${Date.now()}`

    // Create booking
    const booking = {
      id: bookingId,
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      serviceId,
      service: serviceName,
      serviceType,
      date,
      time,
      size: size || null,
      amount,
      paymentMethod,
      razorpayPaymentId: razorpayPaymentId || null,
      status: paymentMethod === "cod" ? "confirmed" : "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("bookings").insertOne(booking)

    return NextResponse.json(
      {
        message: "Booking created successfully",
        bookingId,
        booking: { ...booking, _id: result.insertedId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create booking error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
    return NextResponse.json({ error: "An error occurred while creating the booking" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to view bookings" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    // Get user's bookings
    const bookings = await db.collection("bookings").find({ userId: session.user.id }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    console.error("Get bookings error:", error)
    if (error.message.includes("MongoDB URI not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }
    return NextResponse.json({ error: "An error occurred while fetching bookings" }, { status: 500 })
  }
}
