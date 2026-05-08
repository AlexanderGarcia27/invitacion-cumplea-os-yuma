'use client';

import React, { useMemo } from 'react';
import { INVITATION_FONTS } from '@/constants/events';

interface ThemeConstructorProps {
  theme: {
    colorScheme?: string;
    colorMode?: 'LIGHT' | 'DARK';
    font?: string;
  };
  children: React.ReactNode;
}

const COLOR_MAP: Record<
  string,
  {
    primary: string;
    secondary: string;
    accent: string;
    warmGray: string;
    beige: string;
    gold: string;
  }
> = {
  BOSQUE_IMPERIAL: {
    primary: '#4d5317',
    secondary: '#8fa02e',
    accent: '#a7b055ff',
    warmGray: '#78716c',
    beige: '#f2f4e8',
    gold: '#b4914c',
  },
  BURDEOS_REGIO: {
    primary: '#6b1b1b',
    secondary: '#a63d3d',
    accent: '#4a1212',
    warmGray: '#78716c',
    beige: '#fdf2f2',
    gold: '#d4af37',
  },
  PIZARRA_NOBLE: {
    primary: '#444444',
    secondary: '#777777',
    accent: '#222222',
    warmGray: '#555555',
    beige: '#f5f5f5',
    gold: '#a0a0a0',
  },
  MARFIL_AUREO: {
    primary: '#b4914c',
    secondary: '#d4af37',
    accent: '#8c6d31',
    warmGray: '#a8a29e',
    beige: '#fafaf9',
    gold: '#f0c05a',
  },
  AZUL_CATEDRAL: {
    primary: '#1a3a5f',
    secondary: '#3a5a7f',
    accent: '#0a1a2f',
    warmGray: '#64748b',
    beige: '#f0f4f9',
    gold: '#94a3b8',
  },
  TERRACOTA_REAL: {
    primary: '#a65d3d',
    secondary: '#d68d6d',
    accent: '#763d1d',
    warmGray: '#78716c',
    beige: '#f9f0ea',
    gold: '#c68d5d',
  },
  LAVANDA_BARROCA: {
    primary: '#7a6a8a',
    secondary: '#9a8aba',
    accent: '#5a4a6a',
    warmGray: '#78716c',
    beige: '#f3f0f7',
    gold: '#b0a0c0',
  },
  OBSIDIANA_ROSA: {
    primary: '#e6a1b1',
    secondary: '#f6c1d1',
    accent: '#f98bb7ff',
    warmGray: '#78716c',
    beige: '#fff5f7',
    gold: '#ffb6c1',
  },
};

export default function ThemeConstructor({ theme, children }: ThemeConstructorProps) {
  const { colorScheme = 'BOSQUE_IMPERIAL', colorMode = 'LIGHT', font = 'INTER' } = theme;

  const fontConfig = useMemo(
    () =>
      (INVITATION_FONTS as Record<string, { family: string; source: string; label: string }>)[
        font
      ] || INVITATION_FONTS.INTER,
    [font]
  );

  const cssVariables = useMemo(() => {
    const colors = COLOR_MAP[colorScheme] || COLOR_MAP.BOSQUE_IMPERIAL;

    const isDark = colorMode === 'DARK';

    // Base colors
    let bg = isDark ? '#1c1917' : colors.beige;
    let fg = isDark ? '#fafaf9' : '#1c1917';

    // Specific adjustments for schemes
    if (colorScheme === 'OBSIDIANA_ROSA' && isDark) {
      bg = '#0f0e0d';
      fg = '#fce4ea';
    }

    // In dark mode, if the primary color is too dark, we use a lighter version for better visibility
    const primaryColor =
      isDark && !['OBSIDIANA_ROSA', 'LAVANDA_BARROCO'].includes(colorScheme)
        ? colors.secondary
        : colors.primary;

    return {
      '--background': bg,
      '--foreground': fg,
      '--olive': primaryColor,
      '--olive-light': colors.secondary,
      '--olive-bright': colors.accent,
      '--warm-gray': isDark ? '#a8a29e' : colors.warmGray,
      '--warm-gray-light': isDark ? '#d6d3d1' : '#a8a29e',
      '--beige': colors.beige,
      '--beige-muted': isDark ? '#292524' : '#f5f5f4',
      '--accent-gold': colors.gold,
      '--font-sans': fontConfig.family,
      '--font-serif': fontConfig.family,
      '--font-family-sans': fontConfig.family,
      '--font-family-serif': fontConfig.family,
    } as React.CSSProperties & Record<string, string>;
  }, [colorScheme, colorMode, fontConfig]);

  // Google Fonts URL generator
  const googleFontsUrl = useMemo(() => {
    if (fontConfig.source !== 'GOOGLE_FONTS') return null;
    const fontName = fontConfig.label.replace(/\s+/g, '+');
    return `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap`;
  }, [fontConfig]);

  return (
    <>
      {googleFontsUrl && <link href={googleFontsUrl} rel="stylesheet" />}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --background: ${cssVariables['--background'] as string} !important;
          --foreground: ${cssVariables['--foreground'] as string} !important;
          --olive: ${cssVariables['--olive'] as string} !important;
          --olive-light: ${cssVariables['--olive-light'] as string} !important;
          --olive-bright: ${cssVariables['--olive-bright'] as string} !important;
          --warm-gray: ${cssVariables['--warm-gray'] as string} !important;
          --warm-gray-light: ${cssVariables['--warm-gray-light'] as string} !important;
          --beige: ${cssVariables['--beige'] as string} !important;
          --beige-muted: ${cssVariables['--beige-muted'] as string} !important;
          --accent-gold: ${cssVariables['--accent-gold'] as string} !important;
          --font-family-sans: ${fontConfig.family} !important;
          --font-family-serif: ${fontConfig.family} !important;
          --font-sans: ${fontConfig.family} !important;
          --font-serif: ${fontConfig.family} !important;
        }
        body {
          background-color: var(--background) !important;
          color: var(--foreground) !important;
          font-family: ${fontConfig.family}, sans-serif !important;
        }
        .font-sans, .font-serif, [style*="font-family"] {
          font-family: ${fontConfig.family} !important;
        }
      `,
        }}
      />
      <div style={cssVariables} className="min-h-screen">
        {children}
      </div>
    </>
  );
}
