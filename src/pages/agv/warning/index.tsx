import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Select, Button, Table, Tabs } from 'antd';

import { StateType } from './model';

import styles from './style.less';

const { Option } = Select;
const { TabPane } = Tabs;

interface Props {
  dispatch: Dispatch;
}

const Warning: React.FC<Props & StateType> = ({ dispatch, customerList }) => {
  const [company, setCompany] = useState<string>();

  useEffect(() => {
    dispatch({
      type: 'agvWarning/getCustomerList'
    })
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

  return (
    <Card
      title={
        <>
          <Select value={company} className={styles.select} onChange={handleCompanyChange}>
            {customerList.map(({ id, name }) => (
              <Option value={id} key={id}>
                {name}
              </Option>
            ))}
          </Select>
          {/* <Select defaultValue="1" className={styles.select}>
            <Option value="1">传感器错误</Option>
            <Option value="2">错误类型2</Option>
            <Option value="3">错误类型3</Option>
            <Option value="4">错误类型4</Option>
          </Select> */}
        </>
      }
      extra={
        <>
          <Button type="primary">查询</Button>
          <Button style={{marginLeft: 24}}>重置</Button>
        </>
      }
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="正在告警" key="1" className={styles.paneContainer}>
          <Table
            bordered
            size="small"
            columns={[
              {
                title: '故障设备',
                dataIndex: 'machine',
                key: 'machine',
                align: 'center',
              },
              {
                title: '故障原因',
                dataIndex: 'reason',
                key: 'reason',
                align: 'center',
              },
              {
                title: '故障时间',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
              },
            ]}
          />
        </TabPane>
        <TabPane tab="告警解除" key="2">
          <Table
            bordered
            size="small"
            columns={[
              {
                title: '故障设备',
                dataIndex: 'machine',
                key: 'machine',
                align: 'center',
              },
              {
                title: '故障原因',
                dataIndex: 'reason',
                key: 'reason',
                align: 'center',
              },
              {
                title: '故障时间',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
              },
            ]}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default connect(({ agvWarning: { customerList } }: { agvWarning: StateType }) => ({
  customerList,
}))(Warning);
