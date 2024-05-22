import {NextRequest, NextResponse} from "next/server";

export async function GET(request: any){
    const {searchParams} = new URL(request.url);
    const address = searchParams.get('address');

    let url = "";
    if(address){
        url = `http://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=ac6be0e62d8605a0e90e06d1f44ae0af&units=metric`;
    }else{
        url = `http://api.openweathermap.org/data/2.5/forecast?q=kampala&appid=ac6be0e62d8605a0e90e06d1f44ae0af&units=metric`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json({data});

}