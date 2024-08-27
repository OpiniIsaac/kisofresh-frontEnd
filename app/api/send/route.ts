import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure the transporter with your Gmail credentials
// Configure the transporter with your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail email address
      pass: process.env.GMAIL_PASS, // Your Gmail app password
    },
  });
  

export async function POST(req: NextRequest) {
  try {
    const { email, crop, quantity, message, deliveryOption, desiredDeliveryDate, deliveryLocation, pickupDate, pickupQuantity } = await req.json();



    // Define the email content with the progress bar and stages
    let emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
      
      <title>Quote Request Confirmation - KisoIndex</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }
        h1, h2, p {
          margin: 1em 0;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        .container {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Quote Request Confirmation</h1>
          
        </div>
        <p>We have received your request for a quote on ${quantity} tonnes of ${crop}.</p>
        <p>Here are the details of your request:</p>
        <ul>
          <li>Delivery or Pickup: ${deliveryOption}</li>
          ${deliveryOption === 'delivery' ? `
            <li>Desired Delivery Date: ${desiredDeliveryDate}</li>
            <li>Delivery Location: ${deliveryLocation}</li>
          ` : `
            <li>Desired Pickup Date: ${pickupDate}</li>
            <li>Pickup Quantity: ${pickupQuantity}</li>
          `}
          <li>Message: ${message}</li>
        </ul>
        <p>Apart of your order is being processed. Our team will review your request and be in touch shortly with a quote. In the meantime, if you have any questions or need to update your request, please don't hesitate to reply to this email.</p>
        <p>Thank you again for your interest in our products. We look forward to working with you!</p>
        <p>Sincerely,</p>
        <p>The KisoIndex Team</p>
      </div>
    </body>
    </html>
    `;



    // Send the email
    await transporter.sendMail({
      from: `"KisoIndex " <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Order Status Update',
      html: emailContent,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      message: 'Error sending email',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

  