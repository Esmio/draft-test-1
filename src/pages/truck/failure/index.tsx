import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, DatePicker, Row, Tabs, Button, Table } from 'antd';
import { Bar, Pie } from '@/components/Charts';
import moment, { Moment } from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RangeValue } from 'rc-picker/lib/interface';

import { StateType } from './model';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

interface Props {
  dispatch: Dispatch;
}

const Failure: React.FC<Props & StateType> = ({
  dispatch,
  typeErrorList,
  warnLogList,
  warnLogColumns,
  loading,
}) => {
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(getTimeDistance('month'));

  useEffect(() => {
    if (!dateRange) return;
    const [startDateMoment, endDateMoment] = dateRange;

    const startDate = moment(startDateMoment).format('YYYY-MM-DD');
    const endDate = moment(endDateMoment).format('YYYY-MM-DD');

    dispatch({
      type: 'failure/fetchFake',
      payload: {
        startDate,
        endDate,
      },
    });

    dispatch({
      type: 'failure/getWarnLogList',
      payload: {
        // machineId: '1',
        pageNum: 1,
        pageSize: 10,
        startDate,
        endDate,
      },
    });
  }, [dateRange]);

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

  const checkAll = () => router.push('/truck/warning');

  return (
    <GridContent>
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.card}>
          <Tabs
            tabBarExtraContent={
              <div className={styles.statisticsExtraWrap}>
                <RangePicker
                  value={dateRange}
                  onChange={handleRangePickerChange}
                  style={{ width: 256 }}
                />
              </div>
            }
            size="large"
            tabBarStyle={{ marginBottom: 24, paddingLeft: 24 }}
          >
            <TabPane tab="统计" key="statistics">
              <Row>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.statisticsRank}>
                    <h4 className={styles.rankingTitle}>按错误种类统计(Top5)</h4>
                    <Pie
                      hasLabel
                      padding={[40, 0, 40, 0]}
                      hasLegend
                      height={295}
                      data={typeErrorList?.slice(0, 5)}
                    />
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.statisticsBar}>
                    <Bar
                      type="line"
                      height={295}
                      title="按叉车名称统计(Top5)"
                      data={typeErrorList?.slice(0, 5)}
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Card>
      <Card loading={loading} bordered={false} style={{ marginTop: 24 }} bodyStyle={{ padding: 0 }}>
        <div className={styles.card}>
          <Tabs
            tabBarExtraContent={
              <div className={styles.statisticsExtraWrap}>
                <Button type="link" onClick={checkAll}>
                  查看全部
                </Button>
              </div>
            }
            size="large"
            tabBarStyle={{ marginBottom: 24, paddingLeft: 24 }}
          >
            <TabPane tab="正在告警" key="in">
              <Table
                columns={warnLogColumns}
                dataSource={warnLogList}
                rowKey={r => r.machine}
              />
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </GridContent>
  );
};

export default connect(
  ({
    failure: {
      typeErrorList,
      loading,
      warnLogList,
      warnLogColumns,
    },
  }: {
    failure: StateType
  }) => ({
    typeErrorList,
    loading,
    warnLogList,
    warnLogColumns,
  }),
)(Failure);
