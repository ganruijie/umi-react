import * as React from 'react';
import { Table, Image, Space, Button, Switch } from 'antd';
import { IPro } from './pro';
interface IAppProps {
  dataSource: Array<IPro>;
}

const TableList = (props: IAppProps) => {
  const { dataSource } = props;
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const columns: any = [
    {
      title: '序号',
      // render返回的是React的Node节点
      width: 100,
      align: 'center',
      render: (text: any, record: IPro, index: number): React.ReactNode => {
        return <span>{(current - 1) * pageSize + index + 1}</span>;
      },
    },
    {
      title: '产品名称',
      width: 150,
      align: 'center',
      dataIndex: 'proname', // 产品对应的字段
    },
    {
      title: '产品图片',
      width: 180,
      align: 'center',
      dataIndex: 'img1',
      render: (text: string, record: IPro, index: number): React.ReactNode => {
        return <Image width={100} src={text} />;
      },
    },
    {
      title: '产品分类',
      width: 100,
      align: 'center',
      dataIndex: 'category', // 产品对应的字段
    },
    {
      title: '产品品牌',
      width: 100,
      align: 'center',
      dataIndex: 'brand', // 产品对应的字段
    },
    {
      title: '产品原价',
      align: 'center',
      dataIndex: 'originprice',
      sorter(a: IPro, b: IPro) {
        return a.originprice - b.originprice;
      },
    },
    {
      title: '折扣',
      align: 'center',
      dataIndex: 'discount',
      sorter(a: IPro, b: IPro) {
        return a.discount - b.discount;
      },
    },
    {
      title: '销量',
      dataIndex: 'sales',
      align: 'center',
      sorter(a: IPro, b: IPro) {
        return a.sales - b.sales;
      },
    },
    {
      title: '库存',
      dataIndex: 'stock',
      align: 'center',
      sorter(a: IPro, b: IPro) {
        return a.stock - b.stock;
      },
    },
    {
      title: '是否售卖',
      dataIndex: 'issale',
      fixed: 'right',
      width: 80,
      render: (text: number, record: IPro, index: number): React.ReactNode => {
        return <Switch checked={text === 1} disabled={text === 0}></Switch>;
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'isrecommend',
      fixed: 'right',
      width: 80,
      render: (text: number, record: IPro, index: number): React.ReactNode => {
        return <Switch checked={text === 1} disabled={text === 0}></Switch>;
      },
    },
    {
      title: '是否秒杀',
      dataIndex: 'isseckill',
      fixed: 'right',
      width: 80,
      render: (text: number, record: IPro, index: number): React.ReactNode => {
        return <Switch checked={text === 1} disabled={text === 0}></Switch>;
      },
    },
    {
      title: '操作',
      fixed: 'right',
      width: 120,
      render: (text: any, record: IPro, index: number): React.ReactNode => {
        return (
          <Space>
            <Button type="primary">编辑</Button>
            <Button danger>删除</Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="proid"
      scroll={{ x: 1800, y: 800 }}
      pagination={{
        total: dataSource.length,
        position: ['bottomLeft'],
        current,
        pageSize,
        showQuickJumper: true,
        hideOnSinglePage: true,
        pageSizeOptions: ['10', '30', '60', '100', '200'],
        onChange(page: number): void {
          setCurrent(page);
        },
        onShowSizeChange(current, size) {
          setPageSize(size);
        },
        showTotal(total) {
          return `共${total}条数据`;
        },
      }}
    />
  );
};

export default TableList;
