import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new MongoClient(process.env.TEST_DATABASE ?? "");

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("KisoIndex");
    const collection = db.collection("quoteRequests");

    // Count the total number of quotes with status "ORDER_RECIEVED"
    const totalQuotesReceived = await collection.countDocuments({
      status: "ORDER_RECIEVED",
    });

    return NextResponse.json({ totalQuotesReceived }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total number of quotes:", error);
    return NextResponse.json(
      { message: "Error fetching total number of quotes", error },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
