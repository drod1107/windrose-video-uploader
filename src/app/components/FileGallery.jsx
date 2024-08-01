import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import VideoFrame from './VideoFrame';

export default function FileGallery() {
  const { user } = useUser();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUploadToken() {
    const response = await fetch('/api/obtain-upload-token', { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to fetch upload token');
    }
    const data = await response.json();
    return data.token;
  }

  useEffect(() => {
    if (!user) return;

    const fetchVideos = async () => {
      try {
        console.log("User ID:", user.id);
        const token = await fetchUploadToken();
        console.log("Token:", token);
        
        const response = await fetch('/api/get-all-videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, clerkUserId: user.id })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-papaya-whip">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-myrtle-green"></div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-lora text-palatinate text-2xl mb-4">Error</h2>
        <p className="font-hind text-gunmetal">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen">
      <h1 className="font-lora text-palatinate text-3xl md:text-4xl font-bold mb-8 text-center ms- ">Your Video Gallery</h1>
      {videos.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="font-hind text-gunmetal text-center">No videos found. Start uploading to see your content here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoFrame key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}