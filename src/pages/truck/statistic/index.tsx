import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import classnames from 'classnames';
import { Card, Select, DatePicker, Row, Col, Button } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import moment, { Moment } from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RangeValue } from 'rc-picker/lib/interface';

import { getTimeDistance } from './utils/utils';
import { StateType } from './model';
import styles from './style.less';
import { OeeType } from './data.d';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
  dispatch: Dispatch;
}

const Detection: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  machineList,
  oeeData,
}) => {
  const [customerId, setCustomerId] = useState<string>();
  const [machineId, setMachineId] = useState<string>();
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(getTimeDistance('month'));

  useEffect(() => {
    dispatch({
      type: 'truckStatistic/fetchFake',
    });
    dispatch({
      type: 'truckStatistic/getCustomerList',
    });
  }, []);

  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) return;
    const curCustomerId = customerList[0].id;
    dispatch({
      type: 'truckStatistic/getMachineList',
      payload: {
        pageNum: 1,
        pageSize: 10,
        customerId: curCustomerId,
      },
    });
    setCustomerId(curCustomerId);
  }, [customerList]);

  useEffect(() => {
    if (!machineList || !(machineList.length > 0)) return;
    setMachineId(machineList[0].id);
  }, [machineList]);

  useEffect(() => {
    if (!machineId || !dateRange) return;
    const [startDateMoment, endDateMoment] = dateRange;
    const startDate = moment(startDateMoment).format('YYYY-MM-DD');
    const endDate = moment(endDateMoment).format('YYYY-MM-DD');
    dispatch({
      type: 'truckStatistic/getLgvTime',
      payload: {
        lgvName: machineList.find(item => item.id === machineId)?.name,
        startDate,
        endDate,
        scaleType: 'day',
      },
    });
  }, [machineId, dateRange]);

  useEffect(() => {
    if (!machineId || !customerId || !dateRange) return;
    const [startDateMoment, endDateMoment] = dateRange;
    const startDate = moment(startDateMoment).format('YYYY-MM-DD');
    const endDate = moment(endDateMoment).format('YYYY-MM-DD');
    dispatch({
      type: 'truckStatistic/getOee',
      payload: {
        lgvName: `LGV${machineId}`,
        startDate,
        endDate,
      },
    });
  }, [machineId, customerId, dateRange]);

  const handleCompanyChange = (value: string) => {
    setCustomerId(value);
  };

  const handleMachineChange = (value: string) => {
    setMachineId(value);
  };

  const handleRangePickerChange: (
    dates: RangeValue<Moment>,
    values: [String, String],
  ) => void = dates => {
    setDateRange(dates);
  };

  const o1 = oeeData.map((d: OeeType) => {
    const total = ['runDuration', 'chargeDuration', 'idleDuration'].reduce((pre, f) => {
      // eslint-disable-next-line no-param-reassign
      pre += d[f];
      return pre;
    }, 0);
    // eslint-disable-next-line no-param-reassign
    d.Total = total;
    return d;
  });
  const o2 = oeeData.map((d: OeeType) => {
    const total = ['runDuration', 'chargeDuration'].reduce((pre, f) => {
      // eslint-disable-next-line no-param-reassign
      pre += d[f];
      return pre;
    }, 0);
    // eslint-disable-next-line no-param-reassign
    d.Total = total;
    return d;
  });
  const o3 = oeeData.map((d: OeeType) => {
    const total = ['chargeDuration'].reduce((pre, f) => {
      // eslint-disable-next-line no-param-reassign
      pre += d[f];
      return pre;
    }, 0);
    // eslint-disable-next-line no-param-reassign
    d.Total = total;
    return d;
  });
  const ds = new DataSet();
  const dv = ds.createView().source(o1);
  dv.transform({
    type: 'fold',
    fields: ['runDuration', 'chargeDuration', 'idleDuration'],
    key: '小车动态',
    value: '时长',
    retains: ['dataDay', 'Total'],
  });

  const ls = new DataSet();
  const lv = ls.createView().source(o2);
  lv.transform({
    type: 'fold',
    fields: ['runDuration', 'chargeDuration'],
    key: '小车动态',
    value: '时长',
    retains: ['dataDay', 'Total'],
  });

  const cs = new DataSet();
  const cc = cs.createView().source(o3);
  cc.transform({
    type: 'fold',
    fields: ['chargeDuration'],
    key: '小车动态',
    value: '时长',
    retains: ['dataDay', 'Total'],
  });

  const legendMap = {
    runDuration: '运行时长',
    chargeDuration: '充电时长',
    idleDuration: '空闲时长',
  }

  return (
    <>
      <Card
        title="统计分析"
        extra={
          <>
            <Select value={customerId} className={styles.select} onChange={handleCompanyChange}>
              {customerList?.map(({ id, name }) => (
                <Option value={id} key={id}>
                  {name}
                </Option>
              ))}
            </Select>
            <Select value={machineId} className={styles.select} onChange={handleMachineChange}>
              {machineList?.map(({ id, name }) => (
                <Option value={id} key={id}>
                  {name}
                </Option>
              ))}
            </Select>
            <RangePicker
              value={dateRange}
              className={classnames(styles.ranger, styles.marginLeft)}
              onChange={handleRangePickerChange}
            />
            <Button type="primary" className={styles.marginLeft}>
              导出
            </Button>
          </>
        }
      >
        <Row gutter={24}>
          <Col span={12}>
            <Chart
              height={400}
              width={300}
              padding={[100, 100, 100, 100]}
              data={dv}
              forceFit
              scale={{
                dataDay: {
                  type: 'timeCat',
                },
              }}
            >
              <Legend
                itemFormatter={item => legendMap[item]}
              />
              <Coord />
              <Axis
                name="dataDay"
                label={{
                  offset: 12,
                }}
              />
              <Axis name="时长" />
              <Tooltip />
              <Geom type="intervalStack" position="dataDay*时长" color="小车动态">
                {/* <Label content={['Total*小车动态',(t,n)=>{
                    if(n==='runDuration'){
                        return t;
                    }
                }]}/> */}
              </Geom>
            </Chart>
          </Col>
          <Col span={12}>
            <Chart
              height={400}
              width={300}
              padding={[100, 100, 100, 100]}
              data={lv}
              forceFit
              scale={{
                dataDay: {
                  type: 'timeCat',
                },
              }}
            >
              <Legend
                itemFormatter={item => legendMap[item]}
              />
              <Coord />
              <Axis
                name="dataDay"
                label={{
                  offset: 12,
                }}
              />
              <Axis name="时长" />
              <Tooltip />
              <Geom type="intervalStack" position="dataDay*时长" color="小车动态">
                {/* <Label content={['Total*小车动态',(t,n)=>{
                    if(n==='runDuration'){
                        return t;
                    }
                }]}/> */}
              </Geom>
            </Chart>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Chart
              height={400}
              width={300}
              padding={[100, 100, 100, 100]}
              data={cc}
              forceFit
              scale={{
                dataDay: {
                  type: 'timeCat',
                },
              }}
            >
              <Legend
                itemFormatter={item => legendMap[item]}
              />
              <Coord />
              <Axis
                name="dataDay"
                label={{
                  offset: 12,
                }}
              />
              <Axis name="时长" />
              <Tooltip />
              <Geom type="intervalStack" position="dataDay*时长" color="小车动态">
                {/* <Label content={['Total*小车动态',(t,n)=>{
                    if(n==='runDuration'){
                        return t;
                    }
                }]}/> */}
              </Geom>
            </Chart>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Card>
    </>
  );
};

export default connect(
  ({ truckStatistic: { customerList, machineList, oeeData } }: { truckStatistic: StateType }) => ({
    customerList,
    machineList,
    oeeData,
  }),
)(Detection);
