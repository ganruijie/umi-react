import React from 'react';
import { Redirect } from 'umi';
import useAuth from '@/hooks/useAuth';
export default (props: any) => {
  const data = useAuth();
  console.log('222', data);
  if (data === 1) {
    return <div>正在加载...</div>;
  } else if (data === 2) {
    return <div>出错了...</div>;
  } else {
    console.log('333', data);
    if (data.length !== 0) {
      return <div>{props.children}</div>;
    } else {
      return <Redirect to="/login" />;
    }
  }
};
