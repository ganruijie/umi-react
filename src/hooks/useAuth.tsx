import React from 'react';
import { useRequest } from 'umi';
import { checkAuthReq } from '@/services/index';

export default () => {
  const test = useRequest(() => checkAuthReq());
  console.log('1111', test);
  const { loading, error, data } = test;
  if (loading) {
    return 1;
  }
  if (error) {
    return 2;
  }
  return data;
};
