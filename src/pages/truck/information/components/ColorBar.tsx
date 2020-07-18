import React from 'react';

import { ColorProps } from '../data';

const ColorBar: React.FC<ColorProps> = ({ data }) => (
  <div
    style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', margin: '20px 0' }}
  >
    {data?.map(({ color, percent }, idx) => (
      <div
        key={idx}
        style={{
          backgroundColor: color,
          width: percent,
          height: 12,
        }}
      ></div>
    ))}
  </div>
);

export default ColorBar;
