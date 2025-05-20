// This file would contain email sending logic
import nodemailer from "nodemailer"

export async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
  })

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email address",
    text: `Please verify your email address by clicking the following link: ${verificationUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d53f8c;">Verify Your Email Address</h2>
        <p>Thank you for registering with Glamour Rentals. Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #d53f8c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
        <p>If the button doesn't work, you can also click on the link below or copy it to your browser:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't register for an account, please ignore this email.</p>
      </div>
    `,
  }

  // Send email
  await transporter.sendMail(mailOptions)
}

export async function sendBookingConfirmation(email, booking) {
  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
  })

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Booking Confirmation - Glamour Rentals",
    text: `Your booking for ${booking.service} on ${booking.date} at ${booking.time} has been confirmed.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d53f8c;">Booking Confirmation</h2>
        <p>Thank you for booking with Glamour Rentals. Your booking details are as follows:</p>
        <div style="background-color: #f8f4f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Booking ID:</strong> ${booking.id}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Amount:</strong> ₹${booking.amount.toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
        </div>
        <p>You can view your booking details and download your receipt by logging into your account.</p>
        <p>If you have any questions, please contact us at info@glamourrentals.com or call us at +91 98765 43210.</p>
      </div>
    `,
  }

  // Send email
  await transporter.sendMail(mailOptions)
}
