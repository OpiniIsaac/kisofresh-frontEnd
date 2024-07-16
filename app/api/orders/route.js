// app/api/orders/route.js

import { NextResponse } from 'next/server';

// Dummy Data
const ordersData = [
  { name: "Jan", Sales: 4000, Orders: 2400 },
  { name: "Feb", Sales: 3000, Orders: 1398 },
  { name: "Mar", Sales: 2000, Orders: 9800 },
  { name: "Apr", Sales: 2780, Orders: 3908 },
  { name: "May", Sales: 1890, Orders: 4800 },
  { name: "Jun", Sales: 2390, Orders: 3800 },
  { name: "Jul", Sales: 3490, Orders: 4300 },
];

export async function GET() {
  return NextResponse.json(ordersData);
}
