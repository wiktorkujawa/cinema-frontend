import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
    src: string,
    fallbackSrc: string,
}

const validatePosterURL = (url: string): string => {
    if (url?.startsWith('/') || url?.startsWith('http://') || url?.startsWith('https://')) {
      return url;
    }
    return '/images/fallback.jpg';
  };

export default function ImageFallback({ src, fallbackSrc, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(validatePosterURL(src));

  useEffect(() => {
    const validatePosterURL = (url: string): string => {
      if (url?.startsWith('/') || url?.startsWith('http://') || url?.startsWith('https://')) {
        return url;
      }
      return '/images/fallback.jpg';
    };

    setImgSrc(validatePosterURL(src));
  }, [src]);


  return (
    <img
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt='fallback image'
    />
  );
}