import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ColumnsType } from 'antd/lib/table/Table';
import { fetchFakeData, getCustomerList, getWarnLogList } from './service';

import { Customer, WarnLogData } from './data.d';
import { convertWarLogList } from '../failure/utils/utils';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
  warnLogList: WarnLogData[];
  warnLogColumns: ColumnsType<WarnLogData>;
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
    getWarnLogList: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'truckWarning',

  state: {
    loading: false,
    warnLogList: [],
    warnLogColumns: [],
    customerList: [],
  },

  effects: {
    *getCustomerList(_, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 100, linkMan: '叉车' });
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          },
        });
      }
    },
    *getWarnLogList({ payload }, { call, put }) {
      const res = yield call(getWarnLogList, payload);
      if (res.errCode === 0) {
        const { warnLogList, warnLogColumns } = convertWarLogList(res.data.list);
        yield put({
          type: 'save',
          payload: {
            warnLogList,
            warnLogColumns,
          },
        });
      }
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      // eslint-disable-next-line no-empty-pattern
      const {
        // customerList,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
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
