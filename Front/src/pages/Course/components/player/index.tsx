import Hls from "hls.js";
import React from "react";

interface IProps {
  thumbnail: string;
  src: string;
}
const Player: React.FC<IProps> = ({ src, thumbnail }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.controls = true;
    let hls: Hls;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, videoRef]);

  return <video ref={videoRef} poster={thumbnail} autoPlay />;
};

export default Player;
