import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Select, Row, Col, Input, Button, Table } from 'antd';

import { StateType } from './model';

import styles from './style.less';

const { Option } = Select;

interface Props {
  dispatch: Dispatch;
}

const Panaroma: React.FC<Props & StateType> = ({ dispatch, customerList }) => {
  const [company, setCompany] = useState<string>();

  useEffect(() => {
    // dispatch({
    //   type: 'agvPanaroma/fetchFake',
    // });
    dispatch({
      type: 'agvPanaroma/getCustomerList',
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
    <>
      <Card
        title="叉车全景图"
        extra={
          <Select value={company} className={styles.select} onChange={handleCompanyChange}>
            {customerList.map(({ id, name }) => (
              <Option value={id} key={id}>
                {name}
              </Option>
            ))}
          </Select>
        }
      >
        
      </Card>
      <Card title="小车列表" className={styles.rowContainer}>
        <Table
          bordered
          size="small"
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
              key: 'name',
              align: 'center',
            },
            {
              title: '任务编号',
              dataIndex: 'taskNum',
              key: 'taskNum',
              align: 'center',
            },
            {
              title: '任务类型',
              dataIndex: 'taskType',
              key: 'taskType',
              align: 'center',
            },
            {
              title: '起始站点',
              dataIndex: 'start',
              key: 'start',
              align: 'center',
            },
            {
              title: '目标站点',
              dataIndex: 'end',
              key: 'end',
              align: 'center',
            },
            {
              title: '任务状态',
              dataIndex: 'taskStatus',
              key: 'taskStatus',
              align: 'center',
            },
            {
              title: '设备状态',
              dataIndex: 'machineStatus',
              key: 'machineStatus',
              align: 'center',
            },
            {
              title: '派遣时间',
              dataIndex: 'time',
              key: 'time',
              align: 'center',
            },
          ]}
        />
      </Card>
    </>
  );
};

export default connect(
  ({
    agvPanaroma: { customerList },
  }: {
    agvPanaroma: StateType;
  }) => ({
    customerList,
  }),
)(Panaroma);
