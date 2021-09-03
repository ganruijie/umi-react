import * as React from 'react';
import TableList from './TableList';
import { useMount } from 'ahooks';
import { connect, ConnectRC } from 'umi';
import { IPro } from './pro';
import { Button, Select, Input } from 'antd';
const { Option } = Select;
import { getSearchListReq } from '@/services/pro';
export interface IProListProps {
  proList: IPro[];
}
const ProList: ConnectRC<IProListProps> = (props) => {
  const [list, setList] = React.useState([]); // 数据库中的分类数据
  const [category, setCategory] = React.useState(''); // 用户选中的分类数据
  const [search, setSearch] = React.useState(''); //用户输入的关键词
  useMount(() => {
    props.dispatch({
      type: 'pro/getProListEffect',
      payload: { limitNum: 200 },
    });
  });
  const searchPro = () => {
    getSearchListReq({ category, search }).then((res) => {
      // 产品列表数据在dav数据流
      props.dispatch({
        type: 'prop/changeProList',
        payload: res.data,
      });
    });
  };
  return (
    <div>
      <Button
        onClick={() => {
          const arr = [...props.proList];
          arr.sort((a: IPro, b: IPro) => {
            return a.originprice - b.originprice;
          });
          props.dispatch({
            type: 'pro/changeProList',
            payload: arr,
          });
        }}
      >
        价格升序
      </Button>
      <Button
        onClick={() => {
          const arr = [...props.proList];
          arr.sort((a: IPro, b: IPro) => {
            return b.originprice - a.originprice;
          });
          props.dispatch({
            type: 'pro/changeProList',
            payload: arr,
          });
        }}
      >
        价格降序
      </Button>
      <div className="fiterdata">
        <Select
          defaultValue=""
          style={{ width: 120 }}
          allowClear
          onChange={(value) => {
            console.log(value);
            setCategory(value);
          }}
          value={category}
        >
          <Option value="">全部</Option>
        </Select>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: 300 }}
          placeholder="请输入关键词"
        ></Input>
        <Button type="primary" onClick={searchPro}>
          搜索
        </Button>
      </div>
      <TableList dataSource={props.proList} />
    </div>
  );
};
export default connect((state: any) => {
  return {
    proList: state.pro.proList,
  };
})(ProList);
