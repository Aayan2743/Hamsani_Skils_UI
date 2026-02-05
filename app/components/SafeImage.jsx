"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ 
  src, 
  alt, 
  fallback = "/placeholder.png",
  className = "",
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <Image
      src={imgSrc || fallback}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}