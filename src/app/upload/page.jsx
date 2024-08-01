'use client';
import { useUser } from '@clerk/nextjs'
import WistiaUploader from '../components/WistiaUploader';
import VideoFrame from '../components/VideoFrame';

const UploadPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-papaya-whip">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-myrtle-green"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="font-lora text-palatinate text-2xl mb-4">Access Restricted</h2>
          <p className="font-hind text-gunmetal">Please sign in to upload videos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen">
      <h1 className="font-lora text-palatinate text-3xl md:text-4xl font-bold mb-8 text-center">Upload a Video</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <WistiaUploader />
      </div>
      
      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-lora text-myrtle-green text-2xl font-bold mb-4">Preview</h2>
        <VideoFrame />
      </div> */}
    </div>
  );
};

export default UploadPage;