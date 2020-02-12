import React from 'react';
import { WhiteSpace } from 'antd-mobile';

import Map from './map';
import Statistic from './statistic';
import './index.less';

export default function OutbreakMap() {
  return (
    <div>
      <WhiteSpace size='lg' />
      <div className='outbreak-map-container'>
        <Statistic />
      </div>
      <WhiteSpace size='lg' />
      <div className='map'>
        <p className='map-top'>
          <i></i>
          疫情地图
          <span>数据来源：国家及各省市地区卫健委</span>
        </p>
        <Map />
      </div>
    </div>
  );
}
