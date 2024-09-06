"use server";
import { MongoClient } from 'mongodb';

export async function getQuotes(userId: any) {
    const client = new MongoClient(process.env.TEST_DATABASE ?? '');

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('KisoIndex');
        const collection = db.collection('quoteRequests');

        // Fetch quotes for the specific user and organize them by status
        const quotes = await collection.find({ userId }).toArray();

        // Map MongoDB documents to Order type
        const mapToOrder = (doc: any) => ({
            orderId: doc._id, // Or another field if you have a separate order ID field
            crop: doc.crop,
            quantity: doc.quantity,

            totalPrice: doc.totalPrice,
            status: doc.status,
            date: doc.date,
        });

        const rejectedOrders = quotes
            .filter((quote) => quote.status === 'QUOTE_REJECTED')
            .map(mapToOrder);

        const approvedOrders = quotes
            .filter((quote) => quote.status === 'QUOTE_APPROVED')
            .map(mapToOrder);

        return { rejectedOrders, approvedOrders };
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return { error: 'Failed to fetch quotes' };
    } finally {
        await client.close();
    }
}
