"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  sources: string[];
  className?: string;
};

export default function ProjectVideo({ sources, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [index]);

  const handleEnded = () => {
    setIndex((i) => (i + 1) % sources.length);
  };

  return (
    <div className={className}>
      {sources.length > 0 && (
        <video
          ref={videoRef}
          src={sources[index]}
          autoPlay
          muted
          playsInline
          preload="auto"
          loop={sources.length === 1}
          onEnded={handleEnded}
        />
      )}
    </div>
  );
}
