import { IPro } from '../pro';
import { Effect, ImmerReducer } from 'umi';
import {
  getProListReq,
  getRecommendListReq,
  getSeckillListReq,
} from '@/services/pro';
export interface IProState {
  proList: Array<IPro>;
  recommendList: Array<IPro>;
  seckillList: IPro[];
}
export interface IProModelInterface {
  namespace: 'pro';
  state: IProState;
  effects: {
    getProListEffect: Effect;
    getRecommendListEffect: Effect;
    getSeckillListEffect: Effect;
  };
  reducers: {
    changeProList: ImmerReducer<IProState>;
    changeRecommendList: ImmerReducer<IProState>;
    changeSeckillList: ImmerReducer<IProState>;
  };
}
const proModel: IProModelInterface = {
  namespace: 'pro',
  state: {
    proList: [],
    recommendList: [],
    seckillList: [],
  },
  effects: {
    *getProListEffect({ payload }: any, { call, put }: any) {
      const res = yield call(getProListReq, payload);
      yield put({
        type: 'changeProList',
        payload: res.data,
      });
    },
    *getRecommendListEffect({ payload }: any, { call, put }: any) {
      const res = yield call(getRecommendListReq, payload);
      yield put({
        type: 'changeRecommendList',
        payload: res.data,
      });
    },
    *getSeckillListEffect({ payload }: any, { call, put }: any) {
      const res = yield call(getSeckillListReq, payload);
      yield put({
        type: 'changeSeckillList',
        payload: res.data,
      });
    },
  },
  reducers: {
    changeProList(state, action) {
      state.proList = action.payload;
    },
    changeRecommendList(state, action) {
      state.recommendList = action.payload;
    },
    changeSeckillList(state, action) {
      state.seckillList = action.payload;
    },
  },
};
export default proModel;
