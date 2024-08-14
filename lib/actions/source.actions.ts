"use server";
const { MongoClient } = require("mongodb");

// export async function fetchUploadedData() {
//   const uri =
//     "mongodb+srv://isaacopini8:cool@data.17kkyxj.mongodb.net/Cotton?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");

//     const db = client.db('DatasetTwo');
//     const collection = db.collection('farmers');

//     // Fetch all documents
//     const cursor = collection.find({}).limit(10);

//     // Convert cursor to array of documents
//     const documents = await cursor.toArray();

//     console.log("Uploaded Data:", documents);
//     return documents;
//   } catch (error) {
//     console.error("Error fetching uploaded data:", error);
//   } finally {
//     await client.close();
//   }
// }

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


// export async function cropPrices() {
//   const uri = 'mongodb+srv://qwertyisaac9:fABvsWbvzyUu6er0@cluster0.xrpcdl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const db = client.db('priceFour');
//     const collection = db.collection('crop_prices');
//     const cropPrices = await collection.find({}).toArray();
//     return cropPrices;
//   } finally {
//     await client.close();
//   }
// }

// import { MongoClient } from 'mongodb';

export async function addCropToInventory({
  name,
  country,
  region,
  quality,
  inStock,
  userId,
}: {
  name: string;
  country: string;
  quality: number;
  inStock: boolean;
  userId:string, 
  region: string
}) {
  const uri = process.env.TEST_DATABASE;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('FarmerDataTest');
    const collection = db.collection('crops');

    // Add new crop to the collection
    const result = await collection.insertOne({
      CropType : name,
      'Country ': country,
      quality,
      inStock,
      userId,
      Region: region
    });

    console.log('Crop added:', result);
    return result;
  } catch (error) {
    console.error('Error adding crop to inventory:', error);
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

    const db = client.db('FarmerDataTest');
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