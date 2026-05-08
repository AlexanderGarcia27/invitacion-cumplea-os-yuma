'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

interface BotonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function BotonBase({
  variant = 'primary',
  children,
  className = '',
  ...props
}: BotonBaseProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      // Create refined hover animation timeline
      const hoverTl = gsap.timeline({ paused: true });

      if (variant === 'primary') {
        // Primary: subtle lift with enhanced glow
        hoverTl
          .to(button, {
            y: -2,
            boxShadow: '0 8px 20px -4px rgba(77, 83, 23, 0.4)',
            duration: 0.25,
            ease: 'power2.out',
          })
          .to(
            button.querySelector('.btn-icon'),
            {
              x: 2,
              duration: 0.2,
              ease: 'power2.out',
            },
            0
          );
      } else {
        // Secondary: border glow with subtle scale
        hoverTl
          .to(button, {
            scale: 1.02,
            boxShadow: '0 0 15px rgba(77, 83, 23, 0.3), inset 0 0 0 2px rgba(125, 136, 42, 0.8)',
            duration: 0.25,
            ease: 'power2.out',
          })
          .to(
            button.querySelector('.btn-icon'),
            {
              rotate: 8,
              duration: 0.2,
              ease: 'power2.out',
            },
            0
          );
      }

      const handleEnter = () => hoverTl.play();
      const handleLeave = () => hoverTl.reverse();

      button.addEventListener('mouseenter', handleEnter);
      button.addEventListener('mouseleave', handleLeave);

      // eslint-disable-next-line consistent-return
      return () => {
        button.removeEventListener('mouseenter', handleEnter);
        button.removeEventListener('mouseleave', handleLeave);
      };
    },
    { scope: buttonRef, dependencies: [variant] }
  );

  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-sans tracking-wide text-xs uppercase font-medium cursor-pointer transition-all duration-300';
  const variants = {
    primary: 'bg-background text-olive border border-olive hover:bg-olive hover:text-white',
    secondary:
      'bg-background text-foreground border border-foreground/20 hover:border-olive hover:text-olive',
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
