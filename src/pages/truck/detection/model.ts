import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  getCustomerList,
  getMachineList,
  getTaskList,
  getRealTime,
} from './service';

import { 
  Customer,
  Machine,
  TaskType,
  RealTime,
  PagiType,
} from './data.d';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
  machineList: Machine[];
  taskList: TaskType[];
  realTime: RealTime | null;
  pagination: PagiType;
  realTimeLoading: boolean;
  taskListLoading: boolean;
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
    getTaskList: Effect;
    getMachineList: Effect;
    getRealTime: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'truckDetection',

  state: {
    loading: false,
    customerList: [],
    machineList: [],
    taskList: [],
    realTime: null,
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
    realTimeLoading: false,
    taskListLoading: false,
  },

  effects: {
    // 客户列表
    *getCustomerList({}, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 10, linkMan: '叉车' });
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          }
        })  
      }
    },
    // 设备列表
    *getMachineList({ payload }, { call, put }) {
      const res = yield call(getMachineList, payload);
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            machineList: res.data.list,
          }
        })
      }
    },
    // 实时检测
    *getRealTime({ payload }, { call, put }) {
      yield put({type: 'save', payload: { realTimeLoading: true }});
      const res = yield call(getRealTime, payload);
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            realTime: res.data,
          }
        })
      }
      yield put({type: 'save', payload: { realTimeLoading: false }});
    },
    // 任务列表
    *getTaskList({payload}, { call, put }) {
      yield put({type: 'save', payload: { taskListLoading: true }});
      const res = yield call(getTaskList, payload);
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            taskList: res.data.list,
            pagination: {
              total: res.data.total,
              pageNum: res.data.pageNum,
              pageSize: res.data.pageSize,
            }
          }
        })
      }
      yield put({type: 'save', payload: { taskListLoading: false }});
    },
    // mock 数据
    *fetchFake({ payload }, { call, put }) {
      const data = yield call(fetchFakeData);
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
