import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Select, Row, Col, Input, Button, Form } from 'antd';

import { Line } from '@/components/Charts';
import Table from './components/VirtualTable';

import { StateType } from './model';

import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

interface Props {
  dispatch: Dispatch;
}

interface MSItemType {
  title: string;
  color: string;
  // eslint-disable-next-line react/require-default-props
  value?: string;
}

const MSItem = ({ title, value, color }: MSItemType) => (
  <Col className={styles.machineStatusItem} span={6}>
    <span className={styles.label}>{title}：</span>
    <span style={{ color }}>{value || '无'}</span>
  </Col>
);

interface MSComType {
  title: string;
  children: ReactNode;
}

const MSCom = ({ title, children }: MSComType) => (
  <Row className={styles.machineStatusCom} gutter={24}>
    <Col className={styles.title} span={6}>
      <div className={styles.text}>{title}</div>
    </Col>
    {children}
  </Row>
);

const Devices: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  machineList,
  machineStatus: ms,
  pathList,
  powerLine,
  speedLine,
  wheelList,
  customerLoading,
  machineLoading,
  wheelLoading,
  pathListLoading,
  sending,
  newRealTimeLine,
}) => {
  const [customerId, setCustomerId] = useState<string>();
  const [machineId, setMachineId] = useState<string>();
  const [wheel, setWheel] = useState<string>();

  // 客户列表
  useEffect(() => {
    // dispatch({
    //   type: 'devices/fetchFake',
    // });
    dispatch({
      type: 'devices/getCustomerList',
      payload: {
        pageNum: 1,
        pageSize: 10,
        // linkMan: '智研',
      },
    });
  }, [dispatch]);
  // 设置默认客户id
  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) return;
    setCustomerId(customerList[0].id);
  }, [customerList]);
  // 设备列表
  useEffect(() => {
    if (!customerId) return;
    dispatch({
      type: 'devices/getMachineList',
      payload: {
        pageNum: 1,
        pageSize: 10,
        customerId,
      },
    });
  }, [customerId]);
  // 设置默认设备id
  useEffect(() => {
    if (!machineList || !(machineList.length > 0)) return;
    setMachineId(machineList[0].id);
  }, [machineList]);
  // 默认获取轮毂型号
  useEffect(() => {
    if (!machineId) return;
    dispatch({
      type: 'devices/getWheelList',
      payload: {
        machineId,
      },
    });
    dispatch({
      type: 'devices/getMachineStatus',
      payload: {
        machineId,
      },
    });
    dispatch({
      type: 'devices/getRealTime',
      payload: {
        type: 'POWER',
        machineId,
        total: 10,
      },
    });
    dispatch({
      type: 'devices/getRealTime',
      payload: {
        type: 'MOMENT',
        machineId,
        total: 10,
      },
    });
    dispatch({
      type: 'devices/getRealTime',
      payload: {
        type: 'SPEED',
        machineId,
        total: 10,
      },
    });
    dispatch({
      type: 'devices/getNewRealTime',
      payload: {
        machineId,
        total: 10,
      },
    })
  }, [machineId]);

  useEffect(() => {
    if (!wheelList || !(wheelList.length > 0)) return;
    setWheel(wheelList[0]);
  }, [wheelList]);

  // pathList
  useEffect(() => {
    if (!machineId || !wheel) return;
    dispatch({
      type: 'devices/getMachinePath',
      payload: {
        machineId,
        wheel,
      },
    });
  }, [machineId, wheel]);

  const handleCompanyChange = useCallback((value: string) => {
    setCustomerId(value);
  }, [setCustomerId]);

  const handleMachineChange = useCallback((value: string) => {
    setMachineId(value);
  }, [setMachineId])

  const handleWheelChange = useCallback((value: string) => {
    setWheel(value);
  }, [setWheel]);

  const handleOrderSent = useCallback(values => {
    const { cmdStr } = values;
    dispatch({
      type: 'devices/sendOrder',
      payload: {
        cmdStr,
        mcheId: machineId,
      },
    });
  }, [dispatch, machineId]);

  const mArr = newRealTimeLine?.reduce((prev: {x: string; y: number; type: string}[], d) => {
    const arr = Object.keys(d).filter(item => item !== 'time').map(j => ({ y: d[j], x: d.time, type: j }));
    return [...arr, ...prev]
  }, [])

  return (
    <>
      <Card>
        <Select
          className={styles.select}
          value={customerId}
          onChange={handleCompanyChange}
          loading={customerLoading}
        >
          {customerList?.map(({ id, name }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
        </Select>
        <Select
          className={styles.select}
          value={machineId}
          onChange={handleMachineChange}
          loading={machineLoading}
        >
          {machineList?.map(({ id, name }) => (
            <Option value={id} key={id}>
              {name}
            </Option>
          ))}
        </Select>
      </Card>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="机器人状态" headStyle={{ fontWeight: 'bold' }}>
            <MSCom title="末端坐标">
              <MSItem title="X" value={ms?.x} color="blue" />
              <MSItem title="Y" value={ms?.y} color="blue" />
              <MSItem title="Z" value={ms?.z} color="blue" />
            </MSCom>
            <MSCom title="末端姿态">
              <MSItem title="RX" value={ms?.rx} color="green" />
              <MSItem title="RY" value={ms?.ry} color="green" />
              <MSItem title="RZ" value={ms?.rz} color="green" />
            </MSCom>
            <MSCom title="手臂关节">
              <MSItem title="J1" value={ms?.j1} color="green" />
              <MSItem title="J2" value={ms?.j2} color="green" />
              <MSItem title="J3" value={ms?.j3} color="green" />
            </MSCom>
            <MSCom title="手腕关节">
              <MSItem title="J4" value={ms?.j4} color="green" />
              <MSItem title="J5" value={ms?.j5} color="green" />
              <MSItem title="J6" value={ms?.j6} color="green" />
            </MSCom>
            <MSCom
              title="速度"
            >
              <div
                style={{
                  width: 40,
                  textAlign: 'right',
                }}
              >{ms?.speed}</div>
            </MSCom>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="指令下发"
            headStyle={{ fontWeight: 'bold' }}
            className={styles.order}
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'calc(100% - 54px)',
            }}
          >
            <Form
              wrapperCol={{ span: 24 }}
              onFinish={handleOrderSent}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Form.Item name="cmdStr">
                <TextArea rows={6} cols={100} />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                <Button loading={sending} disabled={sending} type="primary" htmlType="submit">
                  发送指令
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Card
        className={styles.xCard}
        title={
          <Select
            value={wheel}
            className={styles.xTitle}
            onChange={handleWheelChange}
            loading={wheelLoading}
          >
            {wheelList.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        }
      >
        <Table
          columns={[
            {
              title: '编号',
              dataIndex: 'order',
              key: 'order',
            },
            {
              title: '路径1',
              dataIndex: 'x',
              key: 'x',
            },
            {
              title: '路径2',
              dataIndex: 'y',
              key: 'y',
            },
            {
              title: '路径3',
              dataIndex: 'z',
              key: 'z',
            },
            {
              title: '路径4',
              dataIndex: 'q0',
              key: 'q0',
            },
            {
              title: '路径5',
              dataIndex: 'q1',
              key: 'q1',
            },
            {
              title: '路径6',
              dataIndex: 'q2',
              key: 'q2',
            },
            {
              title: '路径7',
              dataIndex: 'q3',
              key: 'q3',
            },
          ]}
          dataSource={pathList}
          scroll={{ y: 300 }}
          loading={pathListLoading}
        />
      </Card>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="关节数据">
            <Line
              height={257}
              title=""
              legend
              data={mArr}
              color="type"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="速度">
            <Line
              height={257}
              title=""
              data={speedLine?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="力">
            <Line
              height={257}
              title=""
              data={powerLine?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="力矩">
            <Line
              height={257}
              title=""
              data={powerLine?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect(
  ({
    devices: {
      customerList,
      machineList,
      machineStatus,
      pathList,
      powerLine,
      speedLine,
      momentLine,
      wheelList,
      customerLoading,
      machineLoading,
      wheelLoading,
      pathListLoading,
      sending,
      newRealTimeLine,
    },
  }: {
    devices: StateType;
  }) => ({
    customerList,
    machineList,
    machineStatus,
    pathList,
    powerLine,
    speedLine,
    momentLine,
    wheelList,
    customerLoading,
    machineLoading,
    wheelLoading,
    pathListLoading,
    sending,
    newRealTimeLine,
  }),
)(Devices);
