'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const OnboardingForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    orgName: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        orgName: '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-wistia-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.orgName,
          adminEmail: formData.email,
          clerkUserId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Wistia project');
      }

      const data = await response.json();
      if (data.success) {
        // Redirect to home page
        router.push('/');
      } else {
        throw new Error(data.error || 'An error occurred during onboarding');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="orgName"
        value={formData.orgName}
        onChange={handleChange}
        placeholder="Organization Name"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Complete Onboarding
      </button>
    </form>
  );
};

export default OnboardingForm;