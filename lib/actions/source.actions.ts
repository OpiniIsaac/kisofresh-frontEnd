"use server";

import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const { MongoClient } = require("mongodb");



export async function fetchFarmersByCriteria({
  country,
  region,
  cropType,
  quantity,
}: {
  country: string;
  region: string;
  cropType: string;
  quantity: number;
}) {
  const uri = process.env.TEST_DATABASE;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('FarmerData');
    const collection = db.collection('farmers');

    // Fetch documents matching the criteria
    const cursor = collection.find({
      'Country ': { $regex: new RegExp(`^${country}$`, 'i') },
      Region: { $regex: new RegExp(`^${region}$`, 'i') },
      CropType: { $regex: new RegExp(`^${cropType}$`, 'i') },
      $or: [
        { 'YieldEstimation .result': { $exists: false } },
        { 'YieldEstimation .result': { $gte: quantity } }
      ]
    });

    // Convert cursor to array of documents
    const documents = await cursor.toArray();

    console.log("Farmers matching criteria:", documents);
    return documents;
  } catch (error) {
    console.error("Error fetching farmers by criteria:", error);
  } finally {
    await client.close();
  }
}




export async function addCropToInventory({
  name,
  quantity,
  userId,
}: {
  name: string;
  quantity: number;
  userId: string;
}) {
  const uri = process.env.TEST_DATABASE;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Fetch user information from Firebase
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const { firstName, secondName, locationDetails } = userData;

    // Extract values from locationDetails array
    const district = locationDetails[0]?.value || '';
    const subcounty = locationDetails[1]?.value || '';
    const village = locationDetails[2]?.value || '';

    // Add new crop to the collection with user information
    const cropsCollection = client.db('KisoIndex').collection('crops');
    const result = await cropsCollection.insertOne({
      CropType: name,
      quantity,
      userId,
      firstName,
      secondName,
      district,
      subcounty,
      village,
    });

    console.log('Crop added:', result.insertedId);
    return { insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error('Error adding crop to inventory:', error);
    return { error: error };
  } finally {
    await client.close();
  }
}

export async function fetchCropsByUserId(userId: string) {
  const uri = process.env.TEST_DATABASE;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('crops');

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