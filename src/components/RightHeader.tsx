import * as React from 'react';
import { Button } from 'antd';
import { removeItem } from '@/utils/cookie';
import { history, connect } from 'umi';

interface IRightHeaderProps {
  adminname: string;
}
const RightHeader: React.FunctionComponent<IRightHeaderProps> = (props) => {
  return (
    <div>
      欢迎您：{props.adminname}
      <Button
        onClick={() => {
          removeItem('adminname');
          removeItem('role');
          removeItem('token');
          history.replace('/login');
        }}
      >
        退出
      </Button>
    </div>
  );
};
export default connect(({ admin }: any) => ({ adminname: admin.adminname }))(
  RightHeader,
);
