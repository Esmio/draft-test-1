import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';
import SearchForm from '@/components/SearchForm';
import { Bar } from '@/components/Charts';

interface Props {
  dispatch: Dispatch;
}

const Amount: React.FC<Props & StateType> = ({
  dispatch,
}) => {

  const onChange = useCallback((e) => {
  }, [])

  const reset = useCallback(() => {
  }, [])

  const onSearch = useCallback(() => {
  }, [])

  return (
    <Main
      search={
        <SearchForm
          items={[
            {
              label: "部门选择",
              name: 'department',
              type: 'select',
              typeOptions: [
                {
                  name: 'value1',
                  value: 1,
                },
                {
                  name: 'value2',
                  value: 2,
                },
                {
                  name: 'value3',
                  value: 3,
                },
                {
                  name: 'value4',
                  value: 4,
                }
              ],
            },
            {
              label: "年份选择",
              name: 'year',
              type: 'select',
              typeOptions: [
                {
                  name: 'value1',
                  value: 1,
                },
                {
                  name: 'value2',
                  value: 2,
                },
                {
                  name: 'value3',
                  value: 3,
                },
                {
                  name: 'value4',
                  value: 4,
                }
              ],
            }
          ]}
          initialValues={{
            department: 1,
            year: 1
          }}
          onFinish={onSearch}
        />
      }
      extra={<ExportButton />}
    >
      <Bar
        title=""
        data={[
          {
            x: '1',
            y: 10,
          },
          {
            x: '2',
            y: 20,
          },
          {
            x: '3',
            y: 30,
          },
          {
            x: '4',
            y: 40,
          },
          {
            x: '5',
            y: 50,
          }
        ]}
      />
      <Table
        bordered
        size="small"
        pagination={false}
        columns={[
          {
            title: '不符合项目',
            align: 'center',
            children: [
              {
                title: '问题数量',
                dataIndex: 'title',
                key: 'title',
                align: 'center',
              }
            ]
          },
          {
            title: '不符合的项目数',
            children: [
              {
                title: '1月',
                align: 'center',
                dataIndex: 'month1',
                key: 'month1'
              },
              {
                title: '2月',
                align: 'center',
                dataIndex: 'month2',
                key: 'month1'
              },
              {
                title: '3月',
                align: 'center',
                dataIndex: 'month3',
                key: 'month1'
              },
              {
                title: '4月',
                align: 'center',
                dataIndex: 'month4',
                key: 'month1'
              },
              {
                title: '5月',
                align: 'center',
                dataIndex: 'month5',
                key: 'month1'
              },
              {
                title: '6月',
                align: 'center',
                dataIndex: 'month6',
                key: 'month1'
              },
              {
                title: '7月',
                align: 'center',
                dataIndex: 'month7',
                key: 'month1'
              },
              {
                title: '8月',
                align: 'center',
                dataIndex: 'month8',
                key: 'month1'
              },
              {
                title: '9月',
                align: 'center',
                dataIndex: 'month9',
                key: 'month1'
              },
              {
                title: '10月',
                align: 'center',
                dataIndex: 'month10',
                key: 'month1'
              },
              {
                title: '11月',
                align: 'center',
                dataIndex: 'month11',
                key: 'month1'
              },
              {
                title: '12月',
                align: 'center',
                dataIndex: 'month12',
                key: 'month1'
              },
            ]
          }
        ]}
        dataSource={[]}
      />
    </Main>
  );
};

export default connect(
  ({
    amount: {
    },
  }: {
    amount: StateType;
  }) => ({
  }),
)(Amount);
