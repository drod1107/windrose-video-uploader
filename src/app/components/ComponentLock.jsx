'use client'

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const ProtectedContent = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const {userId} = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const checkUserProject = async () => {
        
        try {


          const response = await fetch('/api/check-user-project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user: userId })
          });
          const data = await response.json();
          if (!data.hasProject) {
            router.push('/onboarding');
          }
        } catch (error) {
          console.error('Error checking user project:', error);
        } finally {
          setIsChecking(false);
        }
      };

      checkUserProject();
    } else if (isLoaded && !isSignedIn) {
      setIsChecking(false);
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded || isChecking) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return children; // Allow access to public pages
  }

  return children;
};

export default ProtectedContent;