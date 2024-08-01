import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';

export async function POST(req) {
  console.log('Starting POST request...');
  await dbConnect();
  console.log('Connected to MongoDB');

  const { name, adminEmail, clerkUserId } = await req.json();
  console.log('Parsed request body:', { name, adminEmail, clerkUserId });
  const wistia_token = process.env.WISTIA_API_KEY
  try {
    // Create Wistia project
    console.log('Creating Wistia project...');
    const response = await fetch('https://api.wistia.com/v1/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${wistia_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        adminEmail,
      }),
    });
    console.log('Wistia project creation response:', response);

    if (!response.ok) {
      console.error('Failed to create new project:', response.status, response.statusText);
      throw new Error('Failed to create new project');
    }

    const wistiaProject = await response.json();
    console.log('Wistia project created:', wistiaProject);

    // Update user in MongoDB
    console.log('Updating user in MongoDB...');
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      { 
        project_id: wistiaProject.hashedId,
        orgName: name,
      },
      { new: true, upsert: true }
    );
    console.log('User updated:', updatedUser);

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error creating Wistia project:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}