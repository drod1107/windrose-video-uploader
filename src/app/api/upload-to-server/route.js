import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import WistiaVideo from "@/app/models/WistiaVideo";

export const api = {
    bodyParser: false
  }

export async function POST(request) {

  try {
    await connectToDatabase();

    const formData = await request.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const token = formData.get("token");
    const projectId = process.env.NEXT_PUBLIC_FOLDER_ID;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("name", name);
    uploadFormData.append("project_id", projectId);
    
    console.log('Token being sent to Wistia:', token);

    const response = await fetch("https://upload.wistia.com/", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: uploadFormData,
    });

    const responseBody = await response.text();
    console.log('Response from Wistia:', responseBody);

    if (!response.ok) {
      console.error('Wistia upload failed:', response.status, responseBody);
      return NextResponse.json(
        { error: 'Wistia upload failed', details: responseBody },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseBody);
    } catch (error) {
      console.error('Error parsing Wistia response:', error);
      return NextResponse.json(
        { error: 'Error parsing Wistia response', details: responseBody },
        { status: 500 }
      );
    }

    console.log('Parsed response from Wistia:', data);

    // Save the Wistia data to MongoDB
    const newVideo = new WistiaVideo(data);
    await newVideo.save();

    console.log("Data saved successfully to MongoDB");

    return NextResponse.json({ message: 'Upload successful', data });
  } catch (error) {
    console.error('Error in upload-to-server:', error);
    return NextResponse.json(
      { error: "Error uploading file", details: error.message },
      { status: 500 }
    );
  }
}