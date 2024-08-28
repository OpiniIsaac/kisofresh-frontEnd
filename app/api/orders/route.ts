import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = new MongoClient(process.env.TEST_DATABASE ?? '');

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    // Filter orders by status and sort them by createdAt in descending order
    const orders = await collection.find({
      status: { $in: ['QUOTE_REJECTED', 'QUOTE_APPROVED'] }
    }).sort({ createdAt: -1 }).toArray();

  
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Error fetching orders', error }, { status: 500 });
  } finally {
    await client.close();
  }
}
