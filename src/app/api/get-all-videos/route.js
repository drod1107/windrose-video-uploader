import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';

export async function POST(req) {
  try {
    const { token, clerkUserId } = await req.json();
    console.log("Token:", token);
    console.log("Clerk User ID:", clerkUserId);

    // Fetch projects from Wistia API
    const projectsResponse = await fetch('https://api.wistia.com/v1/projects.json', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!projectsResponse.ok) {
      console.log("Failed to fetch projects from Wistia:", projectsResponse.statusText);
      throw new Error(`Failed to fetch projects: ${projectsResponse.statusText}`);
    }

    const projects = await projectsResponse.json();
    console.log("Wistia projects:", projects);

    if (projects.length === 0) {
      return NextResponse.json({ error: 'No projects found for this user' }, { status: 404 });
    }

    // Use the first project (assuming there's only one)
    const project = projects[0];
    console.log("Using project:", project.hashedId);

    // Fetch videos for the project
    const videosResponse = await fetch(`https://api.wistia.com/v1/projects/${project.hashedId}.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!videosResponse.ok) {
      console.log("Failed to fetch videos from Wistia:", videosResponse.statusText);
      throw new Error(`Failed to fetch videos: ${videosResponse.statusText}`);
    }

    const projectData = await videosResponse.json();
    const medias = projectData.medias || [];

    // Update the project_id in the database
    await dbConnect();
    await User.findOneAndUpdate(
      { clerkUserId },
      { project_id: project.hashedId },
      { new: true, upsert: true }
    );

    return NextResponse.json(medias);

  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}