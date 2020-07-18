import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Select, Row, Col, Table, Tabs } from 'antd';

import { Pie, Bar } from '@/components/Charts';
import { StateType } from './model';
import styles from './style.less';

const { Option } = Select;
const { TabPane } = Tabs;

interface Props {
  dispatch: Dispatch;
}

const Warning: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  warnTypeList,
  warnMachineList,
  warnRobotList,
  warnSensorList,
  warnLogList,
  warnLogColumns,
}) => {
  const [company, setCompany] = useState<string>();
  const [tabValue, setTabValue ] = useState<string>('1');

  useEffect(() => {
    dispatch({
      type: 'devicesWarning/fetchFake',
    });
    dispatch({
      type: 'devicesWarning/getCustomerList',
    });
    dispatch({
      type: 'devicesWarning/getWarnLogList',
      payload: {
        // machineId: '1',
        pageNum: 1,
        pageSize: 10,
        exceptionType: 1,
        // startDate,
        // endDate,
      },
    });
    // dispatch({
    //   type: 'devicesWarning/getDevelopmentStatistics',
    //   payload: {
    //     type: 'warnType',
    //   }
    // })
    // dispatch({
    //   type: 'devicesWarning/getDevelopmentStatistics',
    //   payload: {
    //     type: 'machineType',
    //   }
    // })
    // dispatch({
    //   type: 'devicesWarning/getDevelopmentStatistics',
    //   payload: {
    //     type: 'robot',
    //   }
    // })
    // dispatch({
    //   type: 'devicesWarning/getDevelopmentStatistics',
    //   payload: {
    //     type: 'sensor',
    //   }
    // })
  }, [dispatch]);

  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) {
      return;
    }
    setCompany(customerList[0].id);
  }, [customerList]);

  const handleCompanyChange = (value: string) => {
    setCompany(value);
  };

  const handleTabsChange = useCallback(
    (value) => {
      setTabValue(value);
    },
    [tabValue],
  )

  return (
    <>
      <Card>
        <Select value={company} className={styles.select} onChange={handleCompanyChange}>
          {customerList?.map(({ id, name }) => (
            <Option value={id} key={id}>
              {name}
            </Option>
          ))}
        </Select>
      </Card>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="告警种类" bodyStyle={{ padding: '50px 100px' }}>
            <Pie
              tooltip
              hasLegend
              height={257}
              title=""
              data={warnTypeList?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="设备类型" bodyStyle={{ padding: '50px 100px' }}>
            <Pie
              tooltip
              hasLegend
              height={257}
              title=""
              data={warnMachineList?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={12}>
          <Card title="机器人故障告警" bodyStyle={{ padding: '50px 100px' }}>
            <Bar
              type=""
              height={257}
              title=""
              data={warnRobotList?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="传感器故障告警" bodyStyle={{ padding: '50px 100px' }}>
            <Bar
              type=""
              height={257}
              title=""
              data={warnSensorList?.map(d => ({ x: d.time, y: parseFloat(d.value) }))}
            />
          </Card>
        </Col>
      </Row>
      <Card className={styles.rowContainer}>
        <Tabs activeKey={tabValue} onChange={handleTabsChange}>
          <TabPane tab="故障" key="1" className={styles.paneContainer}>
            <Table columns={warnLogColumns} dataSource={warnLogList} rowKey={r => r.machine} />
          </TabPane>
          <TabPane tab="错误" key="2" className={styles.paneContainer}>
            <Table columns={warnLogColumns} dataSource={warnLogList} rowKey={r => r.machine} />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default connect(
  ({
    devicesWarning: {
      customerList,
      warnTypeList,
      warnMachineList,
      warnRobotList,
      warnSensorList,
      warnLogList,
      warnLogColumns,
    },
  }: {
    devicesWarning: StateType;
  }) => ({
    customerList,
    warnTypeList,
    warnMachineList,
    warnRobotList,
    warnSensorList,
    warnLogList,
    warnLogColumns,
  }),
)(Warning);
