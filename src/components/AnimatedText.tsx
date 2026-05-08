'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useMemo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type AnimationMode = 'words' | 'lines' | 'chars';

interface AnimatedTextProps {
  children: string;
  mode?: AnimationMode;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  once?: boolean;
}

export default function AnimatedText({
  children,
  mode = 'words',
  className = '',
  tag: Tag = 'span',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  triggerOnScroll = true,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Split text based on mode
  const segments = useMemo(() => {
    if (mode === 'chars') {
      return children.split('').map((char, i) => ({
        content: char === ' ' ? '\u00A0' : char,
        key: i,
      }));
    }
    if (mode === 'lines') {
      return children.split('\n').map((line, i) => ({
        content: line,
        key: i,
      }));
    }
    // Default: words
    return children.split(' ').map((word, i) => ({
      content: word,
      key: i,
    }));
  }, [children, mode]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('.anim-segment');

      const animConfig = {
        y: 30,
        opacity: 0,
        duration,
        stagger,
        ease: 'power3.out',
        delay,
      };

      if (triggerOnScroll) {
        gsap.from(elements, {
          ...animConfig,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        });
      } else {
        gsap.from(elements, animConfig);
      }
    },
    { scope: containerRef }
  );

  const displayStyle = mode === 'lines' ? 'block' : 'inline-block';

  return (
    <Tag
      ref={
        containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>
      }
      className={`overflow-hidden ${className}`}
    >
      {segments.map((segment, index) => (
        <span
          key={segment.key}
          className="anim-segment inline-block"
          style={{ display: displayStyle }}
        >
          {segment.content}
          {mode === 'words' && index < segments.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
