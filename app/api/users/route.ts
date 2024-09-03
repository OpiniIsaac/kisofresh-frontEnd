import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';


export async function POST(request: Request) {
  try {
    // Parse the request body to get userIds
    const { userIds } = await request.json();

    // Ensure userIds is an array
    if (!Array.isArray(userIds)) {
      return NextResponse.json({ message: 'Invalid user IDs provided' }, { status: 400 });
    }

    const users = [];

    for (const userId of userIds) {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log(`User with ID ${userId} exists:`, userData);
        users.push({
          id: userId,
          firstName: userData.firstName,
          secondName: userData.secondName, 
          
        });
      } else {
        console.error(`User with ID ${userId} does not exist`);
      }
    }

    // Return the fetched users
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users from Firebase:', error);
    return NextResponse.json({ message: 'Error fetching users', error }, { status: 500 });
  }
}
