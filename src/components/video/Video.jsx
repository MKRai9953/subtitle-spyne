import React, { useRef, useState } from "react";
import "./Video.css";

const Video = () => {
  const videoRef = useRef(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      const videoElement = videoRef.current;
      videoElement.src = url;
      setError("");
      videoElement.load();
      videoElement
        .play()
        .catch((err) =>
          setError("Failed to play the video. Please check the URL.")
        );
    } else {
      setError("Invalid URL. Please enter a valid video URL.");
    }
  };

  return (
    <div className="video-container">
      <form onSubmit={handleSubmit} className="video-form">
        <input
          type="text"
          placeholder="Enter URL here"
          onChange={(e) => setUrl(e.target.value)}
          className="video-input"
          required
        />
        <button type="submit" className="video-button">
          Submit
        </button>
      </form>
      {error && <p className="video-error">{error}</p>}
      <div className="video-wrapper">
        <video ref={videoRef} className="video-element" controls />
      </div>
    </div>
  );
};

export default Video;
