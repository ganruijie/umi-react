import { Effect, ImmerReducer, history } from 'umi';
import { login } from '@/services/admin';
import { message } from 'antd';
import { setItem, getItem } from '@/utils/cookie';
export interface ILoginState {
  adminname: string;
  token: string;
  role: string;
}
export interface ILoginModelInterface {
  namespace: 'admin';
  state: ILoginState;
  effects: {
    loginReq: Effect;
  };
  reducers: {
    changeAdminName: ImmerReducer<ILoginState>;
    changeToken: ImmerReducer<ILoginState>;
    changeRole: ImmerReducer<ILoginState>;
  };
}
const LoginModel: ILoginModelInterface = {
  namespace: 'admin',
  state: {
    adminname: getItem('adminname') || '',
    token: getItem('token') || '',
    role: getItem('role') || '1',
  },
  effects: {
    // 可以看作是 vuex中actions, 必须写成 generator 的写法
    // payload 解构赋值 说明传入过来的参数是以对象形式传递的
    // call 代表调用 异步操作的方法
    // put 代表 类似于之前的 dispatch, 也可以看成vuex中acitons中的
    *loginReq({ payload }: any, { call, put }: any) {
      //异步操作数据，必须通过yield执行
      //call(异步函数，函数需要的参数)
      const res = yield call(login, payload);
      console.log(res, 'admin-res');
      if (res.code === '10003') {
        message.error('密码错误');
      } else if (res.code === '10005') {
        message.error('没有此账号');
      } else {
        yield put({ type: 'changeAdminName', payload: res.data.adminname });
        yield put({ type: 'changeToken', payload: res.data.token });
        yield put({ type: 'changeRole', payload: res.data.role });
        // 保存到本地
        setItem('adminname', res.data.adminname, 7);
        setItem('token', res.data.token, 7);
        setItem('role', res.data.role, 7);
        history.replace('/home');
      }
    },
  },
  reducers: {
    changeAdminName(state: ILoginState, action: any) {
      state.adminname = action.payload;
    },
    changeToken(state: ILoginState, action: any) {
      state.token = action.payload;
    },
    changeRole(state: ILoginState, action: any) {
      state.role = action.payload;
    },
  },
};
export default LoginModel;
