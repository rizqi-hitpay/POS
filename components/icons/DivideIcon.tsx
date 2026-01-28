import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface DivideIconProps {
  size?: number;
  color?: string;
}

export default function DivideIcon({ size = 32, color = '#03102F' }: DivideIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <G>
        <Path
          d="M16 22.0004C17.1045 22.0004 18 22.8958 18 24.0004C17.9998 25.1048 17.1044 26.0004 16 26.0004C14.8955 26.0004 14.0002 25.1048 14 24.0004C14 22.8958 14.8954 22.0004 16 22.0004ZM5.14255 15.3334H26.8574C27.0277 15.3336 27.333 15.5323 27.333 16.0004C27.3328 16.4682 27.0277 16.6662 26.8574 16.6664H5.14255C4.97226 16.6662 4.66711 16.4682 4.66697 16.0004C4.66697 15.5323 4.97222 15.3336 5.14255 15.3334ZM16 6.00036C17.1045 6.00036 18 6.89579 18 8.00036C17.9998 9.10478 17.1044 10.0004 16 10.0004C14.8955 10.0004 14.0002 9.10478 14 8.00036C14 6.89579 14.8954 6.00036 16 6.00036Z"
          fill={color}
          stroke={color}
          strokeWidth={1.33333}
        />
      </G>
    </Svg>
  );
}
