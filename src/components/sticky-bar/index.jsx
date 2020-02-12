import React from 'react';
import { Tabs } from 'antd-mobile';
import { Sticky } from 'react-sticky';

import './index.less';

const tabs = [
  { title: '疫情地图' },
  { title: '辟谣与防护' },
  { title: '实时播报' },
  { title: '疾病知识' }
];

const tabIndex = [0, 1700, 2000, 3000];

export default function StickyBar() {
  const handleTabClick = (tab, index) => {
    window.scrollTo(0, tabIndex[index]);
  };

  return (
    <div className='sticky-bar'>
      <Sticky topOffset={400}>
        {({ style }) => {
          const isSticky = !!style.position;
          return (
            <div style={{ ...style, zIndex: 1 }}>
              <Tabs
                tabs={tabs}
                tabBarBackgroundColor={isSticky ? '#1DA57A' : '#fff'}
                tabBarTextStyle={{
                  fontSize: '0.4rem',
                  color: isSticky ? '#fff' : '#1DA57A'
                }}
                tabBarUnderlineStyle={{
                  width: '10%',
                  transform: 'translateX(75%)',
                  height: '8px',
                  backgroundColor: isSticky ? '#fff' : '#1DA57A'
                }}
                onTabClick={handleTabClick}
              />
            </div>
          );
        }}
      </Sticky>
    </div>
  );
}
