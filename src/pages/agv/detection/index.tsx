import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Select, DatePicker, Row, Col, Table } from 'antd';

import { StateType } from './model';

import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
  dispatch: Dispatch;
}

const Detection: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  agvInfoList,
  taskList,
}) => {
  const [customerId, setCustomerId] = useState<string>();
  const [agvInfo, setAgvInfo] = useState<string>();

  useEffect(() => {
    dispatch({
      type: 'agvDetection/getCustomerList',
    });
    // mock
    dispatch({
      type: 'agvDetection/getCustomerList',
    });
  }, [dispatch]);
  // 设置默认customerId
  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) return;
    setCustomerId(customerList[0].id);
  }, [customerList]);
  // 获取 agvInfo
  useEffect(() => {
    if (!customerId) return;
    dispatch({
      type: 'agvDetection/getAGVInfo',
      payload: {
        pageNum: 1,
        pageSize: 10,
        customerId,
      },
    });
  }, [customerId]);
  useEffect(() => {
    if (!agvInfoList || !(agvInfoList.length > 0)) return;
    setAgvInfo(agvInfoList[0].agvNum);
  }, [agvInfoList]);
  // 充电时间
  useEffect(() => {
    if (!agvInfo) return;
    dispatch({
      type: 'agvDetection/getChargingTime',
      payload: {
        agvNum: agvInfo,
      },
    });
  }, [agvInfo]);

  const handleCompanyChange = (value: string) => {
    setCustomerId(value);
  };

  const handleAgvInfoChange = (value: string) => {
    setAgvInfo(value);
  };

  return (
    <>
      <Card
        title="地图轨迹"
        extra={
          <>
            <Select value={customerId} className={styles.select} onChange={handleCompanyChange}>
              {customerList.map(({ id, name }) => (
                <Option value={id} key={id}>
                  {name}
                </Option>
              ))}
            </Select>
            <RangePicker />
            <Select value={agvInfo} className={styles.selectR} onChange={handleAgvInfoChange}>
              {agvInfoList.map(({ agvNum }) => (
                <Option value={agvNum} key={agvNum}>
                  AGV{agvNum}
                </Option>
              ))}
            </Select>
          </>
        }
      ></Card>
      <Card title="小车状态信息+当前任务" className={styles.rowContainer}>
        <Table
          bordered
          size="small"
          dataSource={agvInfoList}
          pagination={false}
          columns={[
            {
              title: '小车速度',
              dataIndex: 'agvSpeed',
              key: 'agvSpeed',
              align: 'center',
            },
            {
              title: '小车状态',
              dataIndex: 'agvState',
              key: 'agvState',
              align: 'center',
            },
            {
              title: '行驶方向',
              dataIndex: 'agvDirection',
              key: 'agvDirection',
              align: 'center',
            },
            {
              title: '行驶距离',
              dataIndex: 'agvDistance',
              key: 'agvDistance',
              align: 'center',
            },
            {
              title: '小车当前站点',
              dataIndex: 'agvCurrentStationNum',
              key: 'agvCurrentStationNum',
              align: 'center',
            },
            {
              title: '小车目标站点',
              dataIndex: 'agvTargetStationNum',
              key: 'agvTargetStationNum',
              align: 'center',
            },
            {
              title: 'IP地址',
              dataIndex: 'agvIpAddress',
              key: 'agvIpAddress',
              align: 'center',
            },
            {
              title: '接受报文时间',
              dataIndex: 'agvReceiveTime',
              key: 'agvReceiveTime',
              align: 'center',
            },
            {
              title: '当前电压',
              dataIndex: 'agvVoltage',
              key: 'agvVoltage',
              align: 'center',
            },
            {
              title: '错误信息',
              dataIndex: 'agvErrorMessageText',
              key: 'agvErrorMessageText',
              align: 'center',
            },
          ]}
          rowKey={({ agvNum }) => agvNum}
        />
      </Card>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={14}>
          <Card title="历史任务">
            <Table
              dataSource={taskList}
              columns={[
                {
                  title: '任务编号',
                  dataIndex: 'id',
                  key: 'id',
                  align: 'center',
                },
                {
                  title: '起始站点',
                  dataIndex: 'startStation',
                  key: 'startStation',
                  align: 'center',
                },
                {
                  title: '目标站点',
                  dataIndex: 'targetStation',
                  key: 'targetStation',
                  align: 'center',
                },
                {
                  title: '任务类型',
                  dataIndex: 'taskModel',
                  key: 'taskModel',
                  align: 'center',
                },
                {
                  title: '任务状态',
                  dataIndex: 'taskState',
                  key: 'taskState',
                  align: 'center',
                },
                {
                  title: '派遣时间',
                  dataIndex: 'updateTime',
                  key: 'updateTime',
                  align: 'center',
                },
              ]}
              rowKey={({ id }) => id}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card style={{ height: '100%' }}></Card>
        </Col>
      </Row>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="运行情况" extra={<RangePicker />}></Card>
        </Col>
        <Col span={12}>
          <Card title="充电时间" extra={<RangePicker />}></Card>
        </Col>
      </Row>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="任务量" extra={<RangePicker />}></Card>
        </Col>
      </Row>
    </>
  );
};

export default connect(
  ({ agvDetection: { customerList, agvInfoList, taskList } }: { agvDetection: StateType }) => ({
    customerList,
    agvInfoList,
    taskList,
  }),
)(Detection);
