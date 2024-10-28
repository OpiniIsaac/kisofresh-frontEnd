import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db as firebase } from "@/app/firebase/config";

const uri = process.env.TEST_DATABASE ?? '';
const client = new MongoClient(uri);

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { pricePerUnit, markupPercentage, status , totalPrice,pricePerUnitWithMarkup} = await request.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    // Prepare the update object
    const updateObject: any = {};
    if (pricePerUnit !== undefined) updateObject.pricePerUnit = pricePerUnit;
    if (markupPercentage !== undefined) updateObject.markupPercentage = markupPercentage;
    if (status !== undefined) updateObject.status = status;
    if (totalPrice !== undefined) updateObject.totalPrice = totalPrice;
    if (pricePerUnitWithMarkup !== undefined) updateObject.pricePerUnitWithMarkup = pricePerUnitWithMarkup;
    // Update the quote
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateObject }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid quote ID" }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db("KisoIndex");
    const collection = db.collection("quoteRequests");

    // Fetch the quote from MongoDB
    const quote = await collection.findOne({ _id: new ObjectId(id) });
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Fetch user data from Firebase using userId from the quote document
    const userId = quote.userId;
    const userDoc = await getDoc(doc(firebase, "users", userId));
    if (!userDoc.exists()) {
      console.error(`User with ID ${userId} not found`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Combine quote and user information
    const userData = userDoc.data();
    const responsePayload = {
      ...quote,
      user: {
        firstName: userData.firstName,
        lastName: userData.secondName,
        phoneNumber: userData.phoneNumber,
       // Optional additional fields if available
      },
    };
console.log(responsePayload)
    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Error fetching quote or user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote and user data" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}