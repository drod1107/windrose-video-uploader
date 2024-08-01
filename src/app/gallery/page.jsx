'use client';
import { useUser } from '@clerk/nextjs';
import FileGallery from '../components/FileGallery';

const Gallery = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="font-lora text-palatinate text-2xl mb-4">Access Restricted</h2>
          <p className="font-hind text-gunmetal">Please sign in to view the gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen">
      <h1 className="font-lora text-palatinate text-3xl md:text-4xl font-bold mb-4 text-center">Welcome to the Video Gallery</h1>
      <p className="font-hind text-gunmetal text-center mb-4">Here you can review recent uploads.</p>
      <p className="font-hind text-gunmetal text-center mb-8">
        If your file has been deleted, and this appears to be an error, please contact admin.
      </p>
      <FileGallery />
    </div>
  );
};

export default Gallery;