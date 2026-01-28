import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface MinusIconProps {
  size?: number;
  color?: string;
}

export default function MinusIcon({ size = 28, color = '#002771' }: MinusIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.5 14C3.5 13.3557 4.02234 12.8333 4.66667 12.8333H23.3333C23.9777 12.8333 24.5 13.3557 24.5 14C24.5 14.6444 23.9777 15.1667 23.3333 15.1667H4.66667C4.02234 15.1667 3.5 14.6444 3.5 14Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}
