import React from 'react';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function RefreshIcon({ size = 20, color = '#03102F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.0833 10.8333C16.8333 13.75 14.4167 16.0833 11.4167 16.3333C8.83333 16.5833 6.5 15.25 5.41667 13.1667M2.91667 9.16667C3.16667 6.25 5.58333 3.91667 8.58333 3.66667C11.1667 3.41667 13.5 4.75 14.5833 6.83333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.5833 3.33333V6.83333H11.0833"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.41667 16.6667V13.1667H8.91667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function EditPencilIcon({ size = 13.5, color = '#03102F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M10.0833 1.75L12.25 3.91667M8.75 12.25H12.25M1.75 10.0833L1.16667 12.8333L3.91667 12.25L11.4583 4.70833C11.6997 4.46693 11.8353 4.14038 11.8353 3.8C11.8353 3.45962 11.6997 3.13307 11.4583 2.89167L11.1083 2.54167C10.8669 2.30026 10.5404 2.16468 10.2 2.16468C9.85962 2.16468 9.53307 2.30026 9.29167 2.54167L1.75 10.0833Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TrashBinIcon({ size = 13.5, color = '#03102F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M1.75 3.5H12.25"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.25 3.5V2.33333C5.25 2.02391 5.37292 1.72717 5.59171 1.50838C5.8105 1.28958 6.10725 1.16667 6.41667 1.16667H7.58333C7.89275 1.16667 8.1895 1.28958 8.40829 1.50838C8.62708 1.72717 8.75 2.02391 8.75 2.33333V3.5M10.5 3.5V11.6667C10.5 11.9761 10.3771 12.2728 10.1583 12.4916C9.9395 12.7104 9.64275 12.8333 9.33333 12.8333H4.66667C4.35725 12.8333 4.0605 12.7104 3.84171 12.4916C3.62292 12.2728 3.5 11.9761 3.5 11.6667V3.5H10.5Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DiscountIcon({ size = 20, color = '#2465DE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.5 12.5L12.5 7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8.33333" cy="8.33333" r="0.833333" fill={color} />
      <Circle cx="11.6667" cy="11.6667" r="0.833333" fill={color} />
      <Path
        d="M2.5 10L10 2.5L17.5 10L10 17.5L2.5 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DotsVerticalIcon({ size = 20, color = '#2465DE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="4" r="1.5" fill={color} />
      <Circle cx="10" cy="10" r="1.5" fill={color} />
      <Circle cx="10" cy="16" r="1.5" fill={color} />
    </Svg>
  );
}

export function BackArrowIcon({ size = 24, color = '#03102F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DocumentIcon({ size = 28, color = '#03102F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Rect
        x="6"
        y="3"
        width="16"
        height="22"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <Line
        x1="10"
        y1="9"
        x2="18"
        y2="9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Line
        x1="10"
        y1="13"
        x2="18"
        y2="13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Line
        x1="10"
        y1="17"
        x2="14"
        y2="17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function UserAddIcon({ size = 20, color = '#2465DE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 10C11.8409 10 13.3333 8.50761 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50761 8.15905 10 10 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33333 16.6667C3.33333 14.0833 6.31667 12.0833 10 12.0833C10.6917 12.0833 11.3583 12.15 12 12.2833"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6667 15H13.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 13.3333V16.6667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AddPaymentIcon({ size = 38, color = '#2465DE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <Rect
        x="4"
        y="9"
        width="30"
        height="20"
        rx="3"
        stroke={color}
        strokeWidth="2"
      />
      <Line
        x1="4"
        y1="16"
        x2="34"
        y2="16"
        stroke={color}
        strokeWidth="2"
      />
      <Circle
        cx="28"
        cy="28"
        r="8"
        fill={color}
      />
      <Line
        x1="28"
        y1="24"
        x2="28"
        y2="32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="24"
        y1="28"
        x2="32"
        y2="28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
