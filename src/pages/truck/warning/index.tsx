import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import router from 'umi/router';
import { Card, Select, Button, Table, Tabs, DatePicker } from 'antd';
import moment, { Moment } from 'moment';

// eslint-disable-next-line import/no-extraneous-dependencies
import { RangeValue } from 'rc-picker/lib/interface';
import { getTimeDistance } from './utils/utils';
import { StateType } from './model';

import styles from './style.less';

const { RangePicker } = DatePicker;

const { Option } = Select;
const { TabPane } = Tabs;

interface Props {
  dispatch: Dispatch;
}

const Warning: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  warnLogList,
  warnLogColumns,
}) => {
  const [company, setCompany] = useState<string>();
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(getTimeDistance('month'));

  useEffect(() => {
    if (!dateRange) return;
    const [startDateMoment, endDateMoment] = dateRange;

    const startDate = moment(startDateMoment).format('YYYY-MM-DD');
    const endDate = moment(endDateMoment).format('YYYY-MM-DD');
    dispatch({
      type: 'truckWarning/getCustomerList',
    });
    dispatch({
      type: 'truckWarning/getWarnLogList',
      payload: {
        // machineId: '1',
        pageNum: 1,
        pageSize: 10,
        startDate,
        endDate,
      },
    });
  }, [dateRange]);

  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) {
      return;
    }
    setCompany(customerList[0].id);
  }, [customerList]);

  const handleCompanyChange = (value: string) => {
    setCompany(value);
  };

  const goBack = () => {
    router.goBack();
  };

  const handleRangePickerChange: (dates: RangeValue<Moment>, values: [String, String]) => void = (
    dates,
    values,
  ) => {
    setDateRange(dates);
    const [startDate, endDate] = values;
    dispatch({
      type: 'failure/fetchFake',
      payload: {
        startDate,
        endDate,
      },
    });
  };

  return (
    <Card
      title={
        <>
          <Button onClick={goBack} style={{ marginRight: 24 }}>
            返回
          </Button>
          <Select value={company} className={styles.select} onChange={handleCompanyChange}>
            {customerList.map(({ id, name }) => (
              <Option value={id} key={id}>
                {name}
              </Option>
            ))}
          </Select>
          <Select defaultValue="1" className={styles.select}>
            <Option value="1">传感器错误</Option>
            <Option value="2">错误类型2</Option>
            <Option value="3">错误类型3</Option>
            <Option value="4">错误类型4</Option>
          </Select>
          <RangePicker
            value={dateRange}
            onChange={handleRangePickerChange}
          />
        </>
      }
      extra={
        <>
          <Button type="primary">查询</Button>
          <Button style={{ marginLeft: 24 }}>重置</Button>
        </>
      }
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="正在告警" key="1" className={styles.paneContainer}>
          <Table columns={warnLogColumns} dataSource={warnLogList} rowKey={r => r.machine} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default connect(
  ({
    truckWarning: { customerList, warnLogList, warnLogColumns },
  }: {
    truckWarning: StateType;
  }) => ({
    customerList,
    warnLogList,
    warnLogColumns,
  }),
)(Warning);
