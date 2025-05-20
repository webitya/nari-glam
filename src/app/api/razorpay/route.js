import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import Razorpay from "razorpay"
import crypto from "crypto"

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to make a payment" }, { status: 401 })
    }

    const { amount, currency = "INR", receipt, notes } = await request.json()

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // Create order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      notes: {
        ...notes,
        userId: session.user.id,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json({ error: "An error occurred while creating the payment order" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification parameters" }, { status: 400 })
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Payment is verified
    return NextResponse.json(
      {
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Razorpay verification error:", error)
    return NextResponse.json({ error: "An error occurred during payment verification" }, { status: 500 })
  }
}
