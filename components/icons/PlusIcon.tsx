import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface PlusIconProps {
  size?: number;
  color?: string;
}

export default function PlusIcon({ size = 28, color = '#002771' }: PlusIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <G>
        <Path
          d="M12.8333 23.3333C12.8333 23.9777 13.3557 24.5 14 24.5C14.6444 24.5 15.1667 23.9777 15.1667 23.3333V15.1667H23.3333C23.9777 15.1667 24.5 14.6444 24.5 14C24.5 13.3557 23.9777 12.8333 23.3333 12.8333H15.1667V4.66667C15.1667 4.02234 14.6444 3.5 14 3.5C13.3557 3.5 12.8333 4.02234 12.8333 4.66667V12.8333H4.66667C4.02234 12.8333 3.5 13.3557 3.5 14C3.5 14.6444 4.02234 15.1667 4.66667 15.1667H12.8333V23.3333Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}
