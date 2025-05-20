import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { sendBookingConfirmation } from "@/lib/email"
import { v4 as uuidv4 } from "uuid"

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to make a booking" }, { status: 401 })
    }

    const { serviceId, serviceName, date, time, amount, paymentMethod } = await request.json()

    // Validate input
    if (!serviceId || !serviceName || !date || !time || !amount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Generate booking ID
    const bookingId = `BK${Date.now().toString().slice(-6)}`

    // Create booking
    const booking = {
      id: bookingId,
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      serviceId,
      service: serviceName,
      date,
      time,
      amount,
      paymentMethod,
      status: "Confirmed",
      createdAt: new Date(),
      receiptId: uuidv4(),
    }

    await db.collection("bookings").insertOne(booking)

    // Send confirmation email
    await sendBookingConfirmation(session.user.email, booking)

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          id: booking.id,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          amount: booking.amount,
          status: booking.status,
          receiptId: booking.receiptId,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "An error occurred during booking" }, { status: 500 })
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
    return NextResponse.json({ error: "An error occurred while fetching bookings" }, { status: 500 })
  }
}
