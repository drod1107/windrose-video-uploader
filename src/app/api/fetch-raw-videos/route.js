import { NextResponse } from "next/server";

export async function POST(request) {

  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    const response = await fetch("https://api.wistia.com/v1/medias", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Request was sent on fetch-raw-route to wistia api for get all method");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in fetch-raw-videos route:", error);
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}