import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ColumnsType } from 'antd/lib/table/Table';
import { getTypeErrors, fakeChartData, getWarnLogList } from './service';

import { FailureDataType, WarnLogData } from './data.d';
import { convertWarLogList } from './utils/utils';

export interface StateType {
  typeErrorList: FailureDataType[];
  warnLogList: WarnLogData[];
  warnLogColumns: ColumnsType<WarnLogData>;
  loading: boolean;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchFake: Effect;
    getWarnLogList: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'failure',

  state: {
    typeErrorList: [],
    warnLogList: [],
    warnLogColumns: [],
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getTypeErrors, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            data: response.data,
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
    *fetchFake(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          typeErrorList: response.list,
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
