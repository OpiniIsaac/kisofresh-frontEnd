import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.TEST_DATABASE ?? '';
const client = new MongoClient(uri);

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await request.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
    }
  
    try {
      await client.connect();
      const db = client.db('KisoIndex');
      const collection = db.collection('quoteRequests');
  
      const quote = await collection.findOne({ _id: new ObjectId(id) });
  
      if (!quote) {
        return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
      }
  
      return NextResponse.json(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
    } finally {
      await client.close();
    }
  }