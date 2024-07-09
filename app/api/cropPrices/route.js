// pages/api/cropPrices.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = 'mongodb+srv://qwertyisaac9:fABvsWbvzyUu6er0@cluster0.xrpcdl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db('pricesTwo');
    const collection = db.collection('crop_prices');
    const cropPrices = await collection.find({}).toArray();
    return NextResponse.json(cropPrices);
  } catch (error) {
    console.error('Internal Server Error', error.message);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
