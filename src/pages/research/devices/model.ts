import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import {
  getMachineStatus,
  fetchFakeData,
  getCustomerList,
  getMachineList,
  getRealTime,
  sendOrder,
  getWheelList,
  getMachinePath,
  getNewRealTime,
} from './service';

import { Customer, Machine, MachineStatus, PathType, ChartItem } from './data.d';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
  machineList: Machine[];
  machineStatus: MachineStatus | null;
  pathList: PathType[];
  powerLine: ChartItem[];
  speedLine: ChartItem[];
  momentLine: ChartItem[];
  wheelList: string[];
  customerLoading: boolean;
  machineLoading: boolean;
  wheelLoading: boolean;
  pathListLoading: boolean;
  sending: boolean;
  newRealTimeLine: ChartItem[];
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
    getMachineList: Effect;
    getMachineStatus: Effect;
    sendOrder: Effect;
    getRealTime: Effect;
    getWheelList: Effect;
    getMachinePath: Effect;
    getNewRealTime: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'devices',

  state: {
    loading: false,
    customerList: [],
    machineList: [],
    machineStatus: null,
    pathList: [],
    powerLine: [],
    speedLine: [],
    momentLine: [],
    wheelList: [],
    customerLoading: false,
    machineLoading: false,
    wheelLoading: false,
    pathListLoading: false,
    sending: false,
    newRealTimeLine: [],
  },

  effects: {
    // 客户列表
    *getCustomerList({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { customerLoading: true } });
      const res = yield call(getCustomerList, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          },
        });
      }
      yield put({ type: 'save', payload: { customerLoading: false } });
    },
    // 设备列表
    *getMachineList({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { machineLoading: true } });
      const res = yield call(getMachineList, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            machineList: res.data.list,
          },
        });
      }
      yield put({ type: 'save', payload: { machineLoading: false } });
    },
    // 设备检测
    *getMachineStatus({ payload }, { call, put }) {
      const res = yield call(getMachineStatus, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            machineStatus: res.data,
          },
        });
      }
    },
    // 发送指令
    *sendOrder({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { sending: true } });
      const { cmdStr, mcheId } = payload
      cmdStr.split('\n')
        .map((cmd: string) => `CMD: ${cmd}`)
        .join('\n');
      const res = yield call(sendOrder, { mcheId, cmdStr });
      if (res.errCode === 0) {
        message.success('指令发送成功！');
      }
      yield put({ type: 'save', payload: { sending: false } });
    },
    // 轮毂型号
    *getWheelList({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { wheelLoading: true } });
      const res = yield call(getWheelList, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            wheelList: res.data,
          },
        });
      }
      yield put({ type: 'save', payload: { wheelLoading: false } });
    },
    // 路径
    *getMachinePath({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { pathListLoading: true } });
      const res = yield call(getMachinePath, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            pathList: res.data[0].paths.map((item: PathType, index: number) => {
              // eslint-disable-next-line no-param-reassign
              item.order = index + 1;
              return item;
            }),
          },
        });
      }
      yield put({ type: 'save', payload: { pathListLoading: false } });
    },
    // 曲线
    *getRealTime({ payload }, { call, put }) {
      const res = yield call(getRealTime, payload);
      if (res.errCode === 0) {
        const map = {
          MOMENT: 'momentLine',
          SPEED: 'speedLine',
          POWER: 'powerLine',
        };
        yield put({
          type: 'save',
          payload: {
            [map[payload.type]]: res.data.values,
          },
        });
      }
    },
    // 关节数据
    *getNewRealTime({ payload }, { call, put }) {
      const res = yield call(getNewRealTime, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            newRealTimeLine: res.data,
          },
        })
      }
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      // eslint-disable-next-line no-empty-pattern
      const {
        // customerList,
        // machineList,
        // machineStatus,
        // pathList,
        // powerLine,
        // speedLine,
        // momentLine,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
          // machineList,
          // machineStatus,
          // pathList,
          // powerLine,
          // speedLine,
          // momentLine,
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
