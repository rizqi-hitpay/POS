import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface HomeIconProps {
  size?: number;
  color?: string;
}

export default function HomeIcon({ size = 20, color = '#03102F' }: HomeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G>
        <Path
          d="M11 2.20833C10.4074 1.76389 9.59258 1.76389 9 2.20833L3.16667 6.58333C2.74699 6.89809 2.5 7.39208 2.5 7.91667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H7.41667C7.92292 17.5 8.33333 17.0896 8.33333 16.5833V12.5C8.33333 11.5795 9.0795 10.8333 10 10.8333C10.9205 10.8333 11.6667 11.5795 11.6667 12.5V16.5833C11.6667 17.0896 12.0771 17.5 12.5833 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V7.91667C17.5 7.39208 17.253 6.89809 16.8333 6.58333L11 2.20833Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}
