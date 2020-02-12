import React, { useCallback } from 'react';
import { Button } from 'antd-mobile';

import './index.less';

export default function NotMatch({ history }) {
  const goHome = useCallback(() => {
    history.replace('/');
  }, [history]);

  return (
    <div className='not-match'>
      哇哦，页面找不到~
      <Button className='go-home-btn' type='primary' onClick={goHome}>
        回到首页
      </Button>
    </div>
  );
}
