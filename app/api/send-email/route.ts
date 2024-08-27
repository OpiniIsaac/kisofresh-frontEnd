import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a Nodemailer transporter object with SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail email address
      pass: process.env.GMAIL_PASS, // Your Gmail app password
    },
  });

export async function POST(req: Request) {
  // Parse the request body to extract necessary fields
  const { to, subject, text } = await req.json();

  try {
    // Send an email using the configured transporter
    await transporter.sendMail({
        from: `"KisoIndex " <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
    });

    // Return a success response
    return NextResponse.json({ message: 'Quote request submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Return an error response in case of failure
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
