import React, { useEffect, useRef } from "react";

const CameraTest = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          console.log("✅ Camera stream started");
        }
      } catch (err) {
        console.error("❌ Failed to access camera", err);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (video) {
        console.log("🎥 Size:", video.videoWidth, video.videoHeight);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Camera Test</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", height: "auto", backgroundColor: "black" }}
      />
    </div>
  );
};

export default CameraTest;
