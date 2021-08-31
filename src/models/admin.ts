import { Effect, ImmerReducer } from 'umi';
import { login } from '@/services/admin'
export interface ILoginState {
  adminname: string,
  token: string,
  role:number
};
export interface ILoginModelInterface {
  namespace: 'admin',
  state: ILoginState,
  effects: {
    loginReq: Effect
  },
  reducers: {
    changeAdminName: ImmerReducer<ILoginState>,
    changeToken: ImmerReducer<ILoginState>,
    changeRole: ImmerReducer<ILoginState>,
  }
};
const LoginModel:ILoginModelInterface = {
  namespace: 'admin',
  state: {
    adminname: '',
    token: '',
    role: 1
  },
  effects: {
    // 可以看作是 vuex中actions, 必须写成 generator 的写法
    // payload 解构赋值 说明传入过来的参数是以对象形式传递的
    // call 代表调用 异步操作的方法
    // put 代表 类似于之前的 dispatch, 也可以看成vuex中acitons中的
    *loginReq({payload}:any, {call, put}:any){
      console.log('11111111');
      //异步操作数据，必须通过yield执行
      //call(异步函数，函数需要的参数)
      const res = yield call(login, payload);
      console.log(res, "res");
      yield put({type: 'changeAdminName', payload: res.data.adminname});
      yield put({type: 'changeToken', payload: res.data.token});
      yield put({type: 'changeRole', payload: res.data.role});
    }
  },
  reducers: {
    changeAdminName(state:ILoginState, action: any) {
      state.adminname = action.payload;
    },
    changeToken(state:ILoginState, action:any) {
      state.token = action.payload;
    },
    changeRole(state:ILoginState,action:any) {
      state.role = action.payload;
    }
  }
}
export default LoginModel;
