import React from 'react';

import './index.less';

export default function Tip({ color, text, count, increment }) {
  return (
    <li className='tip'>
      <p className='tip-top'>
        较昨日<span style={{ color }}>+{increment}</span>
      </p>
      <strong style={{ color }}>+{count}</strong>
      <p className='tip-bottom'>{text}</p>
    </li>
  );
}
