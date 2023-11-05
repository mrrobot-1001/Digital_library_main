import React from 'react';

const Video = ({ videoUrl }) => {
  return (
    <div className="video-container">
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
