import React from 'react';

// @ts-ignore
import numeral from 'numeral';

import { ColorProps } from '../data';

const ColorList: React.FC<ColorProps> = ({ data }) => (
  <div>
    {
      data.map(({name, value, percent, color}, index) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 36,
            borderTop: index === 0 ? '' : '1px solid #f2f2f2',
          }}
          key={index}
        > 
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 16}}>
            <div style={{
              height: 12,
              width: 12,
              border: `2px solid ${color}`,
              borderRadius: 6,
              boxSizing: 'border-box',
            }}>
            </div>
            <span style={{fontSize: 14, color: '#000', paddingLeft: 10}}>{name}</span>
          </div>
          <div>{numeral(value).format('0,0')}</div>
          <span>{percent}</span>
        </div>
      ))
    }
  </div>
)

export default ColorList;