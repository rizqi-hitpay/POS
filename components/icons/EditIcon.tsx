import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EditIconProps {
  size?: number;
  color?: string;
}

export default function EditIcon({ size = 14, color = '#2465DE' }: EditIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M10.0779 1.42773C10.5371 0.968577 11.279 0.968577 11.7382 1.42773L12.5721 2.26165C13.0312 2.72081 13.0312 3.46271 12.5721 3.92187L5.24382 11.2502L2.33301 11.667L2.74976 8.75615L10.0779 1.42773ZM10.908 2.25781L3.83301 9.33285L3.62467 10.3752L4.66699 10.1668L11.742 3.09179L10.908 2.25781Z"
        fill={color}
      />
    </Svg>
  );
}
