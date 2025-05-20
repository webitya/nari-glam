import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import PDFDocument from "pdfkit"

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be signed in to access this resource" }, { status: 401 })
    }

    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Receipt ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Find booking by receipt ID
    const booking = await db.collection("bookings").findOne({
      receiptId: id,
      $or: [
        { userId: session.user.id }, // User's own booking
        { adminAccess: true }, // Admin has access to all receipts
      ],
    })

    if (!booking) {
      return NextResponse.json(
        { error: "Receipt not found or you do not have permission to access it" },
        { status: 404 },
      )
    }

    // Generate PDF receipt
    const doc = new PDFDocument({ margin: 50 })

    // Set response headers
    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Disposition", `attachment; filename="receipt-${booking.id}.pdf"`)

    // Create a stream to collect PDF data
    const chunks = []
    doc.on("data", (chunk) => chunks.push(chunk))

    // When PDF is done being generated
    const pdfPromise = new Promise((resolve) => {
      doc.on("end", () => {
        const pdfData = Buffer.concat(chunks)
        resolve(pdfData)
      })
    })

    // Add content to PDF
    doc.fontSize(25).text("Glamour Rentals", { align: "center" })
    doc.fontSize(15).text("Receipt", { align: "center" })
    doc.moveDown()

    doc.fontSize(12).text(`Receipt ID: ${booking.receiptId}`)
    doc.text(`Booking ID: ${booking.id}`)
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleDateString()}`)
    doc.moveDown()

    doc.text(`Customer: ${booking.userName}`)
    doc.text(`Email: ${booking.userEmail}`)
    doc.moveDown()

    doc.text(`Service: ${booking.service}`)
    doc.text(`Appointment Date: ${booking.date}`)
    doc.text(`Appointment Time: ${booking.time}`)
    doc.moveDown()

    doc.text(`Amount: ₹${booking.amount.toLocaleString()}`)
    doc.text(`Payment Method: ${booking.paymentMethod}`)
    doc.text(`Status: ${booking.status}`)
    doc.moveDown()

    doc.fontSize(10).text("Thank you for choosing Glamour Rentals!", { align: "center" })
    doc.text("For any queries, please contact us at info@glamourrentals.com or +91 98765 43210", { align: "center" })

    // Finalize the PDF
    doc.end()

    // Wait for PDF to be fully generated
    const pdfData = await pdfPromise

    // Return the PDF
    return new Response(pdfData, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Generate receipt error:", error)
    return NextResponse.json({ error: "An error occurred while generating the receipt" }, { status: 500 })
  }
}
