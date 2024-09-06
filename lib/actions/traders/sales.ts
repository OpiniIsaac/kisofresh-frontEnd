'use server'; // Use this for server functions

import { MongoClient } from 'mongodb';

export async function getQuotes(userId: string) {
  const client = new MongoClient(process.env.TEST_DATABASE ?? '');

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('KisoIndex');
    const collection = db.collection('quoteRequests');

    // Fetch all quotes for the user
    const quotes = await collection.find({ userId }).toArray();

    // Create an object to hold counts of approved and rejected quotes per month
    const quoteStatsByMonth: Record<string, { approved: number; rejected: number }> = {};

    quotes.forEach((quote) => {
      // Format the date to be "MM/YYYY"
      const month = new Date(quote.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });

      // Initialize the month entry if it doesn't exist
      if (!quoteStatsByMonth[month]) {
        quoteStatsByMonth[month] = { approved: 0, rejected: 0 };
      }

      // Increment the appropriate count based on the quote status
      if (quote.status === 'QUOTE_APPROVED') {
        quoteStatsByMonth[month].approved += 1;
      } else if (quote.status === 'QUOTE_REJECTED') {
        quoteStatsByMonth[month].rejected += 1;
      }
    });

    // Transform the stats into an array suitable for recharts
    const chartData = Object.keys(quoteStatsByMonth).map((month) => ({
      name: month, // Month as "MM/YYYY"
      approved: quoteStatsByMonth[month].approved,
      rejected: quoteStatsByMonth[month].rejected,
    }));

    return chartData;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return { error: 'Failed to fetch quotes' };
  } finally {
    await client.close();
  }
}
