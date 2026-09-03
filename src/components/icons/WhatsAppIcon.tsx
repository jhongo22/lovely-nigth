import React from 'react';

interface WhatsAppIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export default function WhatsAppIcon({ size = 20, className = '', color = 'currentColor' }: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path
        d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
        fill={color}
      />
    </svg>
  );
}

// Versión con el logo oficial relleno de WhatsApp
export function WhatsAppOfficialIcon({ size = 20, className = '', fill = '#25D366' }: { size?: number; className?: string; fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.15 4.14 13.56 4.14 11.92C4.14 7.38 7.84 3.67 12.05 3.67ZM8.84 7.15C8.65 7.15 8.35 7.22 8.1 7.49C7.85 7.76 7.15 8.42 7.15 9.76C7.15 11.1 8.13 12.39 8.27 12.58C8.41 12.77 10.19 15.52 12.91 16.7C13.56 16.98 14.07 17.15 14.46 17.27C15.11 17.48 15.7 17.45 16.16 17.38C16.68 17.3 17.76 16.72 17.98 16.09C18.21 15.46 18.21 14.93 18.14 14.81C18.07 14.69 17.88 14.62 17.6 14.48C17.32 14.34 15.93 13.65 15.67 13.56C15.42 13.47 15.23 13.42 15.05 13.7C14.86 13.98 14.33 14.62 14.17 14.81C14.01 14.99 13.85 15.02 13.57 14.88C13.29 14.74 12.39 14.44 11.32 13.49C10.49 12.75 9.93 11.83 9.79 11.59C9.65 11.35 9.77 11.22 9.91 11.08C10.04 10.95 10.2 10.74 10.34 10.58C10.48 10.41 10.53 10.29 10.62 10.11C10.71 9.93 10.67 9.77 10.6 9.63C10.53 9.49 10.02 8.24 9.81 7.73C9.6 7.23 9.39 7.3 9.23 7.29C9.08 7.28 8.9 7.28 8.84 7.15Z" />
    </svg>
  );
}
