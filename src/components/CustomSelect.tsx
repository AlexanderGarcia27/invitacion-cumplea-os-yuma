'use client';

import './CustomSelect.css';

import React, { useRef, useState, useEffect } from 'react';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onToggle?: (isOpen: boolean) => void;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  onToggle,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we should open up based on screen position
  useEffect(() => {
    if (isOpen) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < 250 && spaceAbove > spaceBelow) {
          setOpenUp(true);
        } else {
          setOpenUp(false);
        }
      }
    }

    onToggle?.(isOpen);
  }, [isOpen, onToggle]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionChange = (optionValue: string) => {
    onChange(optionValue);
    // Give a small delay for the animation before closing
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div
      className={`custom-select-container ${isOpen ? 'is-open' : ''} ${openUp ? 'open-up' : ''}`}
      ref={containerRef}
    >
      <input
        type="checkbox"
        className="custom-select-checkbox"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="custom-select-btn">
        <div className="custom-selected-value">
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <div className="custom-chevrons">
          <ChevronUp size={12} />
          <ChevronDown size={12} />
        </div>
      </div>
      <div className="custom-options">
        {options.map((opt) => (
          <div
            key={opt.value}
            className="custom-option"
            style={{ '--select-accent-color': opt.color || '#2d3667' } as React.CSSProperties}
          >
            <input
              className="custom-option-radio top"
              type="radio"
              name={`select-${placeholder}-${value}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => handleOptionChange(opt.value)}
            />
            <input
              className="custom-option-radio bottom"
              type="radio"
              name={`select-${placeholder}-${value}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => handleOptionChange(opt.value)}
            />
            <div className="custom-option-icon">{opt.icon || <Check size={14} />}</div>
            <span className="custom-option-label">{opt.label}</span>
            <div className="custom-option-bg" />
          </div>
        ))}
      </div>
    </div>
  );
}
