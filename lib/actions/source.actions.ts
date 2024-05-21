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
  const uri =
    "mongodb+srv://isaacopini8:cool@data.17kkyxj.mongodb.net/Cotton?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('DatasetTwo');
    const collection = db.collection('farmers');

  
    // Fetch documents matching the criteria
    const cursor = collection
    .find({
      'Country ': country,
      $or: [
        { 'YieldEstimation .result': { $exists: false } }, 
        { 'YieldEstimation .result': { $gte: quantity } }  
      ],
      Region: region,
      CropType: cropType
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