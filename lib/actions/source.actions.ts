"use server";

import { db } from "@/app/firebase/config";
import { capitalizeFirstLetter } from "@/utilis/capitalLetter";
import { doc, getDoc } from "firebase/firestore";

const { MongoClient , ObjectId} = require("mongodb");


export async function fetchFarmersByCriteria({
 
  cropType,
}: {
  cropType?: string;
}) {
  const uri = process.env.TEST_DATABASE;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("KisoIndex");
    const collection = db.collection("crops");

    // Build the query with filters
    const query: any = {};

    // Add case-insensitive text search on CropType if provided
    if (cropType) {
      query.CropType = { $regex: cropType, $options: "i" }; // Case-insensitive regex search for CropType
    }

   

    // Fetch documents matching the criteria
    const cursor = collection.find(query);

    // Convert cursor to array of documents
    const documents = await cursor.toArray();

    console.log("Farmers matching criteria:", documents);
    return documents;
  } catch (error) {
    console.error("Error fetching farmers by criteria:", error);
    return [];
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
    const { firstName, secondName, locationDetails, country } = userData;

    // Extract values from locationDetails array
    const district = locationDetails[0]?.value || '';
    const subcounty = locationDetails[1]?.value || '';
    const village = locationDetails[2]?.value || '';

    // Capitalize the first letter of the crop name
    const capitalizedCropName = capitalizeFirstLetter(name);
    const numericQuantity = Number(quantity);
    // Add new crop to the collection with user information
    const cropsCollection = client.db('KisoIndex').collection('crops');

    const result = await cropsCollection.insertOne({
      CropType: capitalizedCropName,
      quantity,
      userId,
      firstName,
      secondName,
      'Country ': country,
      'YieldEstimation . result' : numericQuantity, 
      Districk :district,
      Subcounty:subcounty,
      village,
      name : firstName + secondName
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
export async function deleteCropFromInventory(cropId: string) {
  const uri = process.env.TEST_DATABASE;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const cropsCollection = client.db('KisoIndex').collection('crops');

    const result = await cropsCollection.deleteOne({ _id: new ObjectId(cropId) });

    if (result.deletedCount === 1) {
      console.log('Crop deleted:', cropId);
      return { success: true };
    } else {
      console.log('No crop found with ID:', cropId);
      return { success: false, message: 'Crop not found' };
    }
  } catch (error) {
    console.error('Error deleting crop from inventory:', error);
    return { success: false, error: error };
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




const uri = process.env.TEST_DATABASE ?? '';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

interface Quote {
  _id: typeof ObjectId;
  crop: string;
  country: string;
  region: string;
  quantity: number;
  deliveryOption: string;
  status: string;
}

export async function getSingleQuote(id: string): Promise<{ quote?: Quote; error?: string; status?: number }> {
  if (!ObjectId.isValid(id)) {
    return { error: 'Invalid quote ID', status: 400 };
  }

  try {
    await client.connect();
    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    const quote = await collection.findOne({ _id: new ObjectId(id) });

    if (!quote) {
      return { error: 'Quote not found', status: 404 };
    }

    return { quote: quote as Quote };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { error: 'Failed to fetch quote', status: 500 };
  } finally {
    await client.close();
  }
}

export async function cropPrices() {
  const uri = 'mongodb+srv://qwertyisaac9:fABvsWbvzyUu6er0@cluster0.xrpcdl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('priceFour');
    const collection = db.collection('crop_prices');
    const cropPrices = await collection.find({}).toArray();
    return cropPrices;
  } finally {
    await client.close();
  }
}

export async function getUserCropCount(userId: string): Promise<{ count: number; error?: string }> {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('crops');

    // Count the number of crops where the userId matches
    const count = await collection.countDocuments({ userId });

    console.log('Number of crops for user:', count);
    return { count };
  } catch (error) {
    console.error('Error fetching crop count:', error);
    return { count: 0, error: 'Failed to fetch crop count' };
  } finally {
    await client.close();
  }
}

export async function fetchCropSuggestions(input: string) {
  try {
    const response = await fetch(`/api/crops?search=${input}`);
    const data = await response.json();
    return data.map((crop: any) => crop.name); // Adjust according to your database structure
  } catch (error) {
    console.error("Error fetching crop suggestions:", error);
    return [];
  }
}
