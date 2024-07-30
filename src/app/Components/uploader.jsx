import { useEffect, useState, useRef } from 'react';

const Uploader = () => {
  const [uploadToken, setUploadToken] = useState('');
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const uploaderRef = useRef(null);
  const wistiaUploaderRef = useRef(null);

  useEffect(() => {
    const fetchUploadToken = async () => {
      try {
        const response = await fetch('/api/obtain-upload-token', { method: 'POST' });
        const data = await response.json();
        if (data.token) {
          setUploadToken(data.token);
          setIsTokenLoaded(true);
        } else {
          console.error('Token not found in response', data);
        }
      } catch (error) {
        console.error('Error obtaining upload token:', error);
      }
    };
    fetchUploadToken();
  }, []);

  useEffect(() => {
    return () => {
      if (wistiaUploaderRef.current) {
        wistiaUploaderRef.current.destroy();
      }
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isTokenLoaded && uploaderRef.current) {
      try {
        const script = document.createElement('script');
        script.src = '//fast.wistia.com/assets/external/api.js';
        script.async = true;
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '//fast.wistia.com/assets/external/uploader.css';
        document.head.appendChild(link);

        const wapiq = window._wapiq || [];
        wapiq.push((W) => {
          const uploader = new W.Uploader({
            accessToken: uploadToken,
            dropIn: uploaderRef.current.getBoundingClientRect(),
            projectId: `${process.env.NEXT_PUBLIC_FOLDER_ID}`,
          });
          wistiaUploaderRef.current = uploader;
        });
      } catch (error) {
        console.error('Error setting up Wistia uploader:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        ref={uploaderRef}
        style={{ height: 360, width: 640 }}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Uploader;
