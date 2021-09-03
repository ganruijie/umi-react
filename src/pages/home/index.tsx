import * as React from 'react';
import { connect, ILoginState } from 'umi';
export interface IHomeProps {
  adminname: string;
}

class Home extends React.PureComponent<IHomeProps> {
  public render() {
    return <div>首页-{this.props.adminname}</div>;
  }
}
export default connect(({ admin }: any) => {
  return {
    adminname: admin.adminname,
  };
})(Home);
