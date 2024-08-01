'use client';

import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import Script from 'next/script';

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Windrose Video Uploader",
          "url": "https://www.windrose.dev",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.windrose.dev/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </Script>

      <div className="container mx-auto px-4 py-8 bg-papaya-whip min-h-screen">
        <h1 className="font-lora text-palatinate text-4xl md:text-5xl font-bold mb-8 text-center">Welcome to Windrose Video Uploader</h1>
        
      
      {isSignedIn ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="font-hind text-gunmetal text-xl mb-6 text-center">
            Welcome back, we're glad you're here! What would you like to do today?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/upload" className="bg-myrtle-green hover:bg-myrtle-green-light text-papaya-whip font-montserrat font-bold py-3 px-6 rounded-full transition duration-300 text-center w-full sm:w-auto">
              Upload a Video
            </Link>
            <Link href="/gallery" className="bg-palatinate hover:bg-earth-yellow text-papaya-whip font-montserrat font-bold py-3 px-6 rounded-full transition duration-300 text-center w-full sm:w-auto">
              Go to Gallery
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="font-hind text-gunmetal text-xl mb-6">
            Please sign in to access Windrose's features.
          </p>
          <button className="bg-myrtle-green hover:bg-myrtle-green-light text-papaya-whip font-montserrat font-bold py-3 px-6 rounded-full transition duration-300">
            Sign In
          </button>
        </div>
      )}
    </div>
    </>
  );
}