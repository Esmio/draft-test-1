import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  fetchFakeData,
  getCustomerList,
  getSites,
  getBaseInfo,
  getMachineList,
  getMachineAll,
  getRoutes,
} from './service';

import { PagiType, Customer, BaseInfo, MachineType, Site, Route, RealTime } from './data.d';

export interface StateType {
  loading: boolean;
  pagination: PagiType;
  customerList: Customer[];
  baseInfo: BaseInfo | null;
  machineList: MachineType[];
  baseInfoLoading: boolean;
  sites: Site[];
  routes: Route[];
  realTimeList: RealTime[];
  realTimeLoading: boolean;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    // fetch: Effect;
    getCustomerList: Effect;
    fetchFake: Effect;
    getBaseInfo: Effect;
    getMachineList: Effect;
    getSites: Effect;
    getMachineAll: Effect;
    getRoutes: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'panorama',

  state: {
    loading: false,
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
    customerList: [],
    baseInfo: null,
    machineList: [],
    baseInfoLoading: false,
    sites: [],
    routes: [],
    realTimeList: [],
    realTimeLoading: false,
  },

  effects: {
    *getCustomerList(_, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 10, linkMan: '叉车' });
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          },
        });
      }
    },
    // 站点
    *getBaseInfo({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { baseInfoLoading: true } });
      const resBaseInfo = yield call(getBaseInfo, payload);
      if (resBaseInfo.errCode === 0) {
        yield put({ type: 'save', payload: { baseInfo: resBaseInfo.data } });
      }
      yield put({ type: 'save', payload: { baseInfoLoading: false } });
    },
    // 设备列表
    *getMachineList({ payload }, { call, put }) {
      const res = yield call(getMachineList, payload);
      if (res.errCode === 0) {
        const { total, pageNum, pageSize, list } = res.data;
        yield put({
          type: 'save',
          payload: {
            machineList: list,
            pagination: {
              total,
              pageNum,
              pageSize,
            },
          },
        });
      }
    },
    // 站点列表
    *getSites(_, { call, put }) {
      const res = yield call(getSites);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            sites: res.data,
          },
        });
      }
    },
    // 路线
    *getRoutes(_, { call, put }) {
      const res = yield call(getRoutes);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            routes: res.data,
          },
        })
      }
    },
    // 轨迹显示
    *getMachineAll({ payload }, { call, put }) {
      yield put({ type: 'save', paylaod: { realTimeLoading: true } });
      const res = yield call(getMachineAll, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            realTimeList: res.data.list,
          },
        });
      }
      yield put({ type: 'save', paylaod: { realTimeLoading: false } });
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      const {
        // customerList,
        sites,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
          sites,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
