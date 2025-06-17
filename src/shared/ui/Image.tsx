import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'src'> {
  src: string;
  alt: string;
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback = '/images/placeholder.jpg',
  className = '',
  ...props
}) => {
  const [error, setError] = React.useState(false);

  return (
    <NextImage
      src={error ? fallback : src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      {...props}
    />
  );
}; 