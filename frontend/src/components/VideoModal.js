import React from 'react';
import Modal from 'react-modal';
import '../styles/Contents.css';
const VideoModal = ({ isOpen, videoUrl, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Video Modal"
      className="video-modal"
      overlayClassName="video-modal-overlay"
    >
      <div className="video-container">
        <iframe
          title="Video Player"
          width="100%"
          height="100%"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <button className="close-video-button" onClick={onRequestClose}>
        Close Video
      </button>
    </Modal>
  );
};

export default VideoModal;
