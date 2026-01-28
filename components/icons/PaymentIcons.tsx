import React from 'react';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function TerminalIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2" />
      <Rect x="7" y="5" width="10" height="6" rx="1" fill={color} />
      <Circle cx="8.5" cy="14.5" r="1" fill={color} />
      <Circle cx="12" cy="14.5" r="1" fill={color} />
      <Circle cx="15.5" cy="14.5" r="1" fill={color} />
      <Circle cx="8.5" cy="17.5" r="1" fill={color} />
      <Circle cx="12" cy="17.5" r="1" fill={color} />
      <Circle cx="15.5" cy="17.5" r="1" fill={color} />
    </Svg>
  );
}

export function TapToPayIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill={color}
      />
      <Path
        d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
        fill={color}
      />
      <Circle cx="12" cy="12" r="2" fill={color} />
    </Svg>
  );
}

export function ScanToPayIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7V5C3 3.89543 3.89543 3 5 3H7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M17 3H19C20.1046 3 21 3.89543 21 5V7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M21 17V19C21 20.1046 20.1046 21 19 21H17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M7 21H5C3.89543 21 3 20.1046 3 19V17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Rect x="7" y="7" width="4" height="4" rx="0.5" fill={color} />
      <Rect x="13" y="7" width="4" height="4" rx="0.5" fill={color} />
      <Rect x="7" y="13" width="4" height="4" rx="0.5" fill={color} />
      <Rect x="13" y="13" width="2" height="2" fill={color} />
      <Rect x="15" y="15" width="2" height="2" fill={color} />
    </Svg>
  );
}

export function CardIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M2 9H22" stroke={color} strokeWidth="2" />
      <Rect x="5" y="14" width="6" height="2" rx="1" fill={color} />
    </Svg>
  );
}

export function PaymentLinkIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CashIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" />
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <Circle cx="5" cy="12" r="1" fill={color} />
      <Circle cx="19" cy="12" r="1" fill={color} />
    </Svg>
  );
}

export function WalletIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M16 14C16 14.5523 16.4477 15 17 15C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13C16.4477 13 16 13.4477 16 14Z"
        fill={color}
      />
      <Path d="M6 7V5C6 3.89543 6.89543 3 8 3H18C19.1046 3 20 3.89543 20 5V7" stroke={color} strokeWidth="2" />
    </Svg>
  );
}

export function CheckmarkIcon({ size = 12, color = '#22C55E' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M10 3L4.5 8.5L2 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export type PaymentIconType = 'Terminal' | 'TapToPay' | 'ScanToPay' | 'Card' | 'PaymentLink' | 'Cash' | 'Wallet';

export function getPaymentIcon(type: PaymentIconType, props?: IconProps) {
  switch (type) {
    case 'Terminal':
      return <TerminalIcon {...props} />;
    case 'TapToPay':
      return <TapToPayIcon {...props} />;
    case 'ScanToPay':
      return <ScanToPayIcon {...props} />;
    case 'Card':
      return <CardIcon {...props} />;
    case 'PaymentLink':
      return <PaymentLinkIcon {...props} />;
    case 'Cash':
      return <CashIcon {...props} />;
    case 'Wallet':
      return <WalletIcon {...props} />;
    default:
      return <CardIcon {...props} />;
  }
}

export function getIconBackgroundColor(type: PaymentIconType): string {
  switch (type) {
    case 'Terminal':
      return '#2465DE'; // Blue
    case 'TapToPay':
      return '#8B5CF6'; // Purple
    case 'ScanToPay':
      return '#F97316'; // Orange
    case 'Card':
      return '#06B6D4'; // Cyan
    case 'PaymentLink':
      return '#EC4899'; // Pink
    case 'Cash':
      return '#22C55E'; // Green
    case 'Wallet':
      return '#EAB308'; // Yellow
    default:
      return '#6B7280'; // Gray
  }
}
