import { Card, Form, Row, Col, Input, Button, Select, Statistic } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Store } from 'antd/lib/form/interface';

import { Bar, Line } from '@/components/Charts';
// @ts-ignore
import numeral from 'numeral';
import ColorBar from './components/ColorBar';
import ColorList from './components/ColorList';

import { FailureDataType } from './data.d';

const { Option } = Select;

const colorData = [
  {
    name: '浙江省',
    value: 14750,
    percent: '55%',
    color: 'red',
  },
  {
    name: '广东省',
    value: 7245,
    percent: '27%',
    color: 'orange',
  },
  {
    name: '江苏省',
    value: 4256,
    percent: '16%',
    color: 'yellow',
  },
  {
    name: '江西省',
    value: 500,
    percent: '2%',
    color: 'green',
  },
  {
    name: '安徽省',
    value: 20,
    percent: '1%',
    color: 'blue',
  },
];

const basicInformationData = [
  {
    title: '放货点',
    value: 40,
  },
  {
    title: '取货点',
    value: 20,
  },
  {
    title: '叉车',
    value: 30,
  },
  {
    title: '充电点',
    value: 20,
  },
  {
    title: '待机点',
    value: 10,
  },
  {
    title: '临时避让点',
    value: 40,
  },
  {
    title: '货物点',
    value: 140,
  },
  {
    title: '路径点',
    value: 50,
  },
];

const renderInformation = (data: { title: string; value: number }[]) =>
  data.map((item, index) => (
    <Statistic
      style={{
        width: '50%',
        margin: '10px 0',
      }}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      {...item}
    />
  ));

interface Props {
  dispatch: Dispatch;
  loading: boolean;
  taskList: FailureDataType[];
}

const Warning: React.FC<Props> = ({ dispatch, taskList }) => {
  const [curCompany, setCurCompany] = useState('0');
  const [form] = Form.useForm();

  useEffect(() => {
    // dispatch({
    //   type: 'information/fetchFake',
    // })
  }, []);

  const handleOwnedCompanyChange = (value: string) => {
    form.setFieldsValue({ company: value });
    setCurCompany(value)
  }

  const onSearch: ((values: Store) => void) | undefined = () => {
  };
  return (
    <>
      <Card bodyStyle={{ paddingBottom: 0 }}>
        <Form form={form} onFinish={onSearch}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item initialValue="0" label="所属公司" name="company">
                <Select onChange={handleOwnedCompanyChange}>
                  <Option value="0">所有公司</Option>
                  <Option value="1">公司1</Option>
                  <Option value="2">公司2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="错误类别" name="faultType">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Row gutter={24} style={{ paddingTop: 24 }}>
        <Col span={6}>
          {
            curCompany === '0' ? (
              <Card title="区域分布Top5">
                <Statistic title="叉车总数" value={numeral(124543233).format('0,0')} />
                <ColorBar data={colorData} />
                <ColorList data={colorData} />
              </Card>
            ) : null
          }
          <Card
            title="基础信息"
            style={{ marginTop: 24 }}
            bodyStyle={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {renderInformation(basicInformationData)}
          </Card>
        </Col>
        <Col span={18}>
          <Card title="任务统计">
            <Bar height={295} title={false} data={taskList} />
          </Card>
          <Card title="时间统计" style={{ marginTop: 24 }}>
            <Line height={295} title={false} data={taskList} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect(
  ({
    information: { loading, taskList },
  }: {
    information: { loading: boolean; taskList: FailureDataType[] };
  }) => ({
    loading,
    taskList,
  }),
)(Warning);
