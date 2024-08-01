import React from 'react';

const VideoFrame = ({ video }) => {
  if (!video) {
    return null;
  }

  const { hashed_id, name, thumbnail } = video;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
      <div className="p-4 flex-grow">
        <h3 className="font-lora text-palatinate text-lg font-semibold mb-2 truncate">{name}</h3>
      </div>
      <div
        className={`wistia_embed wistia_async_${hashed_id} videoFoam=true bg-myrtle-green playerColor=317872`}
        style={{ height: '200px', width: '100%' }}
      >
        <div 
          className="wistia_swatch" 
          style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}
        >
          <img
            src={thumbnail.url}
            style={{ filter: 'blur(5px)', height: '100%', objectFit: 'cover', width: '100%' }}
            alt={name}
            aria-hidden="true"
            onLoad={(e) => e.target.parentNode.style.opacity = 1}
          />
        </div>
      </div>
      <script src={`https://fast.wistia.com/embed/medias/${hashed_id}.jsonp`} async></script>
      <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
    </div>
  );
};

export default VideoFrame;