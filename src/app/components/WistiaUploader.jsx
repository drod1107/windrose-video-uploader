'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createWistiaVideo } from '@/app/utils/createWistiaVideo';

async function fetchUploadToken() {
  const response = await fetch('/api/obtain-upload-token', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to fetch upload token');
  }
  const data = await response.json();
  console.log(`Returned key successfully - `, data.token);
  return data.token;
}

export default function WistiaUploader() {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const router = useRouter();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file and enter a file name');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const token = await fetchUploadToken();
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', fileName);
      formData.append('token', token);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload-to-server', true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const video = createWistiaVideo(data);
          setUploadedVideo(video);
          alert('File uploaded successfully!');
        } else {
          throw new Error('Failed to upload file');
        }
      };

      xhr.onerror = function() {
        throw new Error('Network error occurred during upload');
      };

      xhr.send(formData);

    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setIsUploading(false);
      setFileName('');
      setSelectedFile(null);
      const fileInput = document.getElementById('file-input');
      fileInput.value = '';
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-lora text-palatinate font-bold mb-6">Please be patient. Uploads may take time.</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="file-input" className="block text-sm font-medium text-gunmetal mb-2">
            Select a file:
          </label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileInputChange}
            className="block w-full text-sm text-gunmetal
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-myrtle-green file:text-papaya-whip
              hover:file:bg-myrtle-green-light"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file-name" className="block text-sm font-medium text-gunmetal mb-2">
            File Name:
          </label>
          <input
            type="text"
            id="file-name"
            value={fileName}
            onChange={handleFileNameChange}
            className="mt-1 text-gunmetal block w-full rounded-md border-gray-300 shadow-sm focus:border-myrtle-green focus:ring focus:ring-myrtle-green focus:ring-opacity-50"
            placeholder="Enter file name"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full bg-myrtle-green hover:bg-myrtle-green-light text-papaya-whip font-montserrat font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-myrtle-green h-2.5 rounded-full" 
              style={{width: `${uploadProgress}%`}}
            ></div>
          </div>
          <p className="text-gunmetal text-center mt-2">{uploadProgress.toFixed(0)}% Uploaded</p>
        </div>
      )}
      {uploadedVideo && (
        <div className="mt-4">
          <h3 className="text-lg font-lora text-palatinate font-semibold">{uploadedVideo.name}</h3>
          <p className="text-gunmetal">Status: {uploadedVideo.status}</p>
        </div>
      )}
    </div>
  );
}