import React from 'react';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import RightHeader from './components/RightHeader';
import './global.less';

import { createLogger } from 'redux-logger';
import { message } from 'antd';
export const layout = (): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightHeader></RightHeader>,
    footerRender: () => <footer>footer</footer>,
  };
};
