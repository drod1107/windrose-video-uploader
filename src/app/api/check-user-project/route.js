// app/api/check-user-project/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';

export async function POST(request) {
    const reqBody = await request.json();
    console.log(`The request package when first received by check-user-project is: `, reqBody)
  const userId = reqBody.user;

  if (!userId) {
    return NextResponse.json({ hasProject: false }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ clerkUserId: userId });
    const hasProject = (user && user.project_id)?true:false;

    return NextResponse.json({ hasProject });
  } catch (error) {
    console.error('Error checking user project:', error);
    return NextResponse.json({ hasProject: false }, { status: 500 });
  }
}
