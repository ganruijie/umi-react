import React from 'react';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import './global.less';

import { createLogger } from 'redux-logger';
import { message } from 'antd';
export const layout = ():BasicLayoutProps => {
  return {
    rightContentRender: () => <header>header</header>,
    footerRender: () => <footer>footer</footer>
  }
}
