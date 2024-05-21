import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  let url = "";

  try {
    if (address) {
    url = `http://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=ac6be0e62d8605a0e90e06d1f44ae0af`;
  }
  } catch (e){
    console.log(e);
    
  }
  

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
