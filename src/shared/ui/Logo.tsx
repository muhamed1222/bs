import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  company: 'outcasts' | 'fc' | 'media';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 32,
  md: 48,
  lg: 64,
};

const logos = {
  outcasts: '/images/outcasts/logo.svg',
  fc: '/images/fc/logo.svg',
  media: '/images/media/logo.svg',
};

export const Logo: React.FC<LogoProps> = ({ company, size = 'md', className = '' }) => {
  const logoSize = sizes[size];

  return (
    <Link href={`/companies/${company}`} className={`inline-block ${className}`}>
      <Image
        src={logos[company]}
        alt={`${company} logo`}
        width={logoSize}
        height={logoSize}
        className="object-contain"
      />
    </Link>
  );
}; 