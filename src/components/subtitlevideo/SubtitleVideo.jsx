import React, { useRef, useState } from "react";
import "./SubtitleVideo.css";

const SubtitleVideo = () => {
  const videoRef = useRef(null);
  const [url, setUrl] = useState("");
  const [subtitles, setSubtitles] = useState("");
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

  const handleSubtitleChange = (e) => {
    setSubtitles(e.target.value);
  };

  const handleDownload = () => {
    const blob = new Blob([subtitles], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "subtitles.srt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="subtitle-video-container">
      <div className="subtitle-video-wrapper">
        <video ref={videoRef} className="subtitle-video-element" controls />
      </div>
      <div className="subtitle-controls">
        <form onSubmit={handleSubmit} className="subtitle-video-form">
          <input
            type="text"
            placeholder="Enter URL here"
            onChange={(e) => setUrl(e.target.value)}
            className="subtitle-video-input"
            required
          />
          <button type="submit" className="subtitle-video-button">
            Submit
          </button>
        </form>
        {error && <p className="subtitle-video-error">{error}</p>}
        <textarea
          placeholder="Enter subtitles (e.g., 00:00:00.000 --> 00:00:05.000 Hello world)"
          value={subtitles}
          onChange={handleSubtitleChange}
          className="subtitle-video-textarea"
        />
        <button
          onClick={handleDownload}
          className="subtitle-video-download-button"
        >
          Download Subtitles
        </button>
      </div>
    </div>
  );
};

export default SubtitleVideo;
