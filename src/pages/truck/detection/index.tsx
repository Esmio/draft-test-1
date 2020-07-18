import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Select, Row, Col, Button, Switch, Table, Divider } from 'antd';

import { StateType } from './model';

import styles from './style.less';
import { TablePaginationConfig } from 'antd/lib/table';

const { Option } = Select;

interface Props {
  dispatch: Dispatch;
}

const Detection: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  machineList,
  taskList,
  realTime,
  pagination,
  realTimeLoading,
  taskListLoading,
}) => {
  const [company, setCompany] = useState<string>();
  const [machineId, setMachineId] = useState<string>();

  const { pageNum, pageSize, total } = pagination;

  useEffect(() => {
    dispatch({
      type: 'truckDetection/getCustomerList',
    });
  }, [dispatch]);
  // 选取默认客户
  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) {
      return;
    }
    const customerId = customerList[0].id;
    dispatch({
      type: 'truckDetection/getMachineList',
      payload: {
        customerId,
      },
    });
    setCompany(customerId);
  }, [customerList]);
  // 选取默认设备
  useEffect(() => {
    if (!machineList || !(machineList.length > 0)) return;
    setMachineId(machineList[0].id);
  }, [machineList]);
  // 获取实时检测
  useEffect(() => {
    if (!machineId) return;
    dispatch({
      type: 'truckDetection/getRealTime',
      payload: {
        machineId,
      },
    });
    dispatch({
      type: 'truckDetection/getTaskList',
      payload: {
        machineId,
        pageNum,
        pageSize,
      },
    });
  }, [machineId]);

  const handleCompanyChange = (value: string) => {
    setCompany(value);
  };

  const handleMachineChange = (value: string) => {
    setMachineId(value);
  };

  const handlePaginationChange = (curPagination: TablePaginationConfig) => {
    // eslint-disable-next-line no-shadow
    const { current, pageSize } = curPagination;
    dispatch({
      type: 'truckDetection/getTaskList',
      payload: {
        machineId,
        pageNum: current,
        pageSize,
      },
    });
  };
  return (
    <>
      <Card
        title="地图轨迹"
        extra={
          <>
            <Select value={company} className={styles.select} onChange={handleCompanyChange}>
              {customerList.map(({ id, name }) => (
                <Option value={id} key={id}>
                  {name}
                </Option>
              ))}
            </Select>
            <Select value={machineId} className={styles.selectR} onChange={handleMachineChange}>
              {machineList?.map(({ name, id }) => (
                <Option value={id} key={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </>
        }
      >
        <div className={styles.line}>
          <span className={styles.label}>路径显示</span>
          <Switch />
        </div>
      </Card>
      <Card title="实时检测" className={styles.rowContainer}>
        <Table
          bordered
          loading={realTimeLoading}
          size="small"
          dataSource={realTime ? [realTime] : []}
          pagination={false}
          rowKey={record => record.id}
          columns={[
            {
              title: '位姿x',
              dataIndex: 'positionX',
              key: 'positionX',
              align: 'center',
            },
            {
              title: '位姿y',
              dataIndex: 'positionY',
              key: 'positionY',
              align: 'center',
            },
            {
              title: '位姿-角度',
              dataIndex: 'angle',
              key: 'angle',
              align: 'center',
            },
            {
              title: '额定速度',
              dataIndex: 'lgvMaxSpeed',
              key: 'lgvMaxSpeed',
              align: 'center',
            },
            {
              title: '空载速度',
              dataIndex: 'lgvUnloadSpeed',
              key: 'lgvUnloadSpeed',
              align: 'center',
            },
            {
              title: '额定负载',
              dataIndex: 'lgvLoad',
              key: 'lgvLoad',
              align: 'center',
            },
            {
              title: '当前负载',
              dataIndex: 'lgvLoading',
              key: 'lgvLoading',
              align: 'center',
            },
            {
              title: '操作',
              dataIndex: 'id',
              key: 'action',
              align: 'center',
              render: () => (
                <>
                  <Button type="link">数据反写</Button>
                  <Divider type="vertical" />
                  <Button type="link">参数修改</Button>
                </>
              ),
            },
          ]}
        />
      </Card>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={14}>
          <Card title="历史任务">
            <Table
              bordered
              loading={taskListLoading}
              pagination={{
                current: pageNum,
                pageSize,
                total,
              }}
              scroll={{ y: 320 }}
              onChange={handlePaginationChange}
              dataSource={taskList}
              rowKey={record => record.id}
              size="small"
              columns={[
                {
                  title: '任务编号',
                  dataIndex: 'id',
                  key: 'id',
                },
                {
                  title: '起始站点',
                  dataIndex: 'startSite',
                  key: 'startSite',
                },
                {
                  title: '起始动作',
                  dataIndex: 'startAction',
                  key: 'startAction',
                },
                {
                  title: '目标站点',
                  dataIndex: 'targetSite',
                  key: 'targetSite',
                },
                {
                  title: '目标动作',
                  dataIndex: 'targetAction',
                  key: 'targetAction',
                },
                {
                  title: '任务状态',
                  dataIndex: 'taskStatus',
                  key: 'taskStatus',
                },
                {
                  title: '任务时间',
                  dataIndex: 'taskTime',
                  key: 'taskTime',
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card style={{ height: '100%' }}></Card>
        </Col>
      </Row>
    </>
  );
};

export default connect(
  ({
    truckDetection: {
      customerList,
      machineList,
      taskList,
      realTime,
      pagination,
      realTimeLoading,
      taskListLoading,
    },
  }: {
    truckDetection: StateType;
  }) => ({
    customerList,
    machineList,
    taskList,
    realTime,
    pagination,
    realTimeLoading,
    taskListLoading,
  }),
)(Detection);
