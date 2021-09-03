import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMount } from 'ahooks';
import { IAdminLogin } from '@/services/admin';
import { connect, ConnectRC } from 'umi';
export interface PageProps {}

const Login: ConnectRC<PageProps> = ({ dispatch }) => {
  const onFinish = (values: IAdminLogin) => {
    console.log('Received values of form:', values);
    dispatch({
      type: 'admin/loginReq',
      payload: values,
    });
  };
  // js控制容器
  useMount(() => {
    let height: number = document.documentElement.offsetHeight;
    console.log(height, 'height');
    let login_container: any = document.querySelector('.login_container');
    login_container.style.height = height + 'px';
  });
  return (
    <div className="login_container">
      <h1 className="login_title">test-react</h1>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="adminname"
          rules={[
            {
              required: true,
              pattern: /[a-zA-Z-9_-]{4,16}$/,
              message: '请输入4-16位有效字符，包含字母，数字，下划线以及减号!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="管理员账号"
          ></Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              len: 6,
              // pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
              message: '请输入6位字符密码！',
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                type="password"
                placeholder="管理员密码"
              />
            }
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect((state) => {
  console.log(state, 'login----state');
  return {};
})(Login);
