import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = new MongoClient(process.env.TEST_DATABASE ?? '');

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    const data = await request.json();

    const {
      crop,
      country,
      region,
      phoneNumber,
      quantity,
      message,
      deliveryOption,
      desiredDeliveryDate,
      deliveryLocation,
      pickupDate,
      pickupQuantity,
      dueDiligence,
      dueDiligenceTestType,
      userId,
      userEmail
    } = data;

    const result = await collection.insertOne({
      crop,
      country,
      region,
      phoneNumber,
      quantity,
      message,
      deliveryOption,
      desiredDeliveryDate,
      deliveryLocation,
      pickupDate,
      pickupQuantity,
      dueDiligence,
      status:"ORDER_RECIEVED",
      userId,
      userEmail,
      dueDiligenceTestType,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Quote request submitted successfully', data: result }, { status: 201 });
  } catch (error) {
    console.error('Error submitting quote request:', error);
    return NextResponse.json({ message: 'Error submitting quote request', error }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET() {
  const client = new MongoClient(process.env.TEST_DATABASE ?? '');

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    // Filter quotes by status and sort them by createdAt in descending order
    const quotes = await collection.find({
      status: { $in: ['ORDER_RECIEVED', 'ORDER_REVIEWED'] }
    }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ message: 'Error fetching quotes', error }, { status: 500 });
  } finally {
    await client.close();
  }
}




