"use server";

import { db } from "@/app/firebase/config";
import { capitalizeFirstLetter } from "@/utilis/capitalLetter";
import { doc, getDoc } from "firebase/firestore";

const { MongoClient , ObjectId} = require("mongodb");

export async function fetchQuotesByUserId(userId: string) {
    const uri = process.env.TEST_DATABASE;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
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