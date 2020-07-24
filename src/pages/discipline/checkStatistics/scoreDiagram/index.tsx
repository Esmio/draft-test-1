import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, DatePicker } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';
import { Bar } from '@/components/Charts';

interface Props {
  dispatch: Dispatch;
}

const ScoreDiagram: React.FC<Props & StateType> = ({
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
      search={<h3>2020年6月得分推移图</h3>}
      extra={
        <>
          <DatePicker
            style={{
              marginRight: 10,
            }}
          />
          <ExportButton />
        </>
      }
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
            title: '区域',
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
            title: '平均分',
            dataIndex: 'distric',
            key: 'district',
            align: 'center',
          },
        ]}
        dataSource={[]}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    scoreDiagram: {
    },
  }: {
    scoreDiagram: StateType;
  }) => ({
  }),
)(ScoreDiagram);
