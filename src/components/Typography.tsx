import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Title({ children, className = '' }: TypographyProps) {
  return (
    <h1 className={`font-serif text-4xl md:text-6xl text-foreground leading-tight ${className}`}>
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = '' }: TypographyProps) {
  return (
    <h2 className={`font-serif text-2xl md:text-3xl text-warm-gray tracking-wide ${className}`}>
      {children}
    </h2>
  );
}

export function BodyText({ children, className = '' }: TypographyProps) {
  return (
    <p
      className={`font-sans text-base md:text-lg text-warm-gray-light font-light leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className = '' }: TypographyProps) {
  return (
    <span className={`font-sans text-sm text-warm-gray/80 uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}
