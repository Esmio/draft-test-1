import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, DatePicker } from 'antd';

import { StateType } from './model';
import { ListItem } from './data.d';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';
import { Bar } from '@/components/Charts';
import moment, { Moment } from 'moment';
import { ColumnType } from 'antd/lib/list';

interface Props {
  dispatch: Dispatch;
}

const ScoreDiagram: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  list,
}) => {

  const [date, setDate] = useState<Moment>(moment(new Date()))

  console.log('loading', loading);
  console.log('list', list);

  useEffect(() => {
    dispatch({
      type: 'scoreDiagram/list',
      payload: {
        monthOfYear: moment(date).format('YYYY-MM')
      }
    });
  }, [])

  const onChange = useCallback((e) => {
  }, [])

  const reset = useCallback(() => {
  }, [])

  const handleDateChange = useCallback((date) => {
    dispatch({
      type: 'scoreDiagram/list',
      payload: {
        monthOfYear: moment(date).format('YYYY-MM')
      }
    })
    setDate(date)
  }, [date])

  const convertColumnsAndDataSource = useCallback(() => {
    console.log('list--', list);

    const columns: any[] = [];
    const dataSource: {
      departmentName: string;
      [key: string]: string;
    }[] = [];

    list.forEach(({ departmentName, scoreMap }) => {
      columns.push({
        title: departmentName,
        dataIndex: 'departmentName',
        key: 'departmentName',
      })
      const dataItem = {
        departmentName,
      }
      Object.keys(scoreMap).forEach(id => {
        columns.push({
          title: id === '10' ? '平均值' : `第${id}周`,
          dataIndex: id,
          key: id,
        })
        dataItem[id] = scoreMap[id]
      })
      dataSource.push(dataItem);
    })

    return {
      columns,
      dataSource,
    }
  }, [list])

  return (
    <Main
      search={<h3>2020年6月得分推移图</h3>}
      extra={
        <>
          <DatePicker
            picker="month"
            style={{
              marginRight: 10,
            }}
            value={date}
            onChange={handleDateChange}
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
        loading={loading}
        size="small"
        pagination={false}
        // columns={[
        //   {
        //     title: '区域',
        //     dataIndex: 'distric',
        //     key: 'district',
        //     align: 'center',
        //   },
        //   {
        //     title: '6月第1周',
        //     dataIndex: 'distric',
        //     key: 'district',
        //     align: 'center',
        //   },
        //   {
        //     title: '6月第2周',
        //     dataIndex: 'distric',
        //     key: 'district',
        //     align: 'center',
        //   },
        //   {
        //     title: '6月第3周',
        //     dataIndex: 'distric',
        //     key: 'district',
        //     align: 'center',
        //   },
        //   {
        //     title: '6月第4周',
        //     dataIndex: 'distric',
        //     key: 'district',
        //     align: 'center',
        //   },
        //   {
        //     title: '平均分',
        //     dataIndex: 'distric',
        //     key: 'district',
        //     align: 'center',
        //   },
        // ]}
        columns={convertColumnsAndDataSource()['columns']}
        dataSource={convertColumnsAndDataSource()['dataSource']}
        rowKey={({ departmentName }) => departmentName}
      />
    </Main>
  );
};

export default connect(
  ({
    scoreDiagram: {
      loading,
      list,
    },
  }: {
    scoreDiagram: StateType;
  }) => ({
    loading,
    list,
  }),
)(ScoreDiagram);
