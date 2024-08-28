"use server";


import { MongoClient, ObjectId } from "mongodb";
import { db } from "@/app/firebase/config";
import { capitalizeFirstLetter } from "@/utilis/capitalLetter";
import { doc, getDoc } from "firebase/firestore";


export async function fetchQuotesByUserId(userId: string) {
    const uri = process.env.TEST_DATABASE;
    const client = new MongoClient(uri || '');
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const db = client.db('KisoIndex');
      const collection = db.collection('quoteRequests');
  
      // Fetch crops where the userId matches
      const crops = await collection.find({ userId }).toArray();
  
      console.log('Crops fetched:', crops);
      return crops;
    } catch (error) {
      console.error('Error fetching crops:', error);
      return [];
    } finally {
      await client.close();
    }
  }



const uri = process.env.TEST_DATABASE ?? '';
const client = new MongoClient(uri);

export async function approveQuote(quoteId: string): Promise<{ success: boolean; message?: string }> {
  if (!ObjectId.isValid(quoteId)) {
    return { success: false, message: 'Invalid quote ID' };
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    const result = await collection.updateOne(
      { _id: new ObjectId(quoteId) },
      { $set: { status: 'QUOTE_APPROVED' } }
    );

    if (result.matchedCount === 0) {
      return { success: false, message: 'Quote not found' };
    }

    console.log('Quote approved:', quoteId);
    return { success: true };
  } catch (error) {
    console.error('Error approving quote:', error);
    return { success: false, message: 'Failed to approve quote' };
  } finally {
    await client.close();
  }
}

export async function rejectQuote(quoteId: string): Promise<{ success: boolean; message?: string }> {
  if (!ObjectId.isValid(quoteId)) {
    return { success: false, message: 'Invalid quote ID' };
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    const result = await collection.updateOne(
      { _id: new ObjectId(quoteId) },
      { $set: { status: 'QUOTE_REJECTED' } }
    );

    if (result.matchedCount === 0) {
      return { success: false, message: 'Quote not found' };
    }

    console.log('Quote rejected:', quoteId);
    return { success: true };
  } catch (error) {
    console.error('Error rejecting quote:', error);
    return { success: false, message: 'Failed to reject quote' };
  } finally {
    await client.close();
  }
}
