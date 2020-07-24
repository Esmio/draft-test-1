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
              label: "月份选择",
              name: 'month',
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
            month: 1
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
            title: '问题类别',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
          {
            title: '6月第1周',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
          {
            title: '6月第2周',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
          {
            title: '6月第3周',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
          {
            title: '6月第4周',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
          {
            title: '合计',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
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
