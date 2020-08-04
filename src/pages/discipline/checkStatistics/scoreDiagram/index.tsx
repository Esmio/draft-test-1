import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, DatePicker } from 'antd';

import { StateType } from './model';
import { ChartItem } from './data.d';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';
import { Bar } from '@/components/Charts';
import moment, { Moment } from 'moment';

interface Props {
  dispatch: Dispatch;
}

const ScoreDiagram: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  list,
}) => {

  const [date, setDate] = useState<Moment>(moment(new Date()))

  useEffect(() => {
    dispatch({
      type: 'scoreDiagram/list',
      payload: {
        monthOfYear: moment(date).format('YYYY-MM')
      }
    });
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
    const data: ChartItem[] = [];
    const columns: any[] = [];
    const dataSource: {
      departmentName: string;
      [key: string]: string;
    }[] = [];

    list.forEach(({ departmentName, scoreMap }) => {
      columns.push({
        title: '区域',
        dataIndex: 'departmentName',
        align: 'center',
        key: 'departmentName',
      })
      const dataItem = {
        departmentName,
      }
      Object.keys(scoreMap).forEach(id => {
        columns.push({
          title: id === '10' ? '平均值' : `第${id}周`,
          dataIndex: id,
          align: 'center',
          key: id,
        })
        dataItem[id] = scoreMap[id];
        if(id !== '10')
          data.push({
            x: id,
            y: parseFloat(scoreMap[id]),
          })
      })
      dataSource.push(dataItem);
    })

    return {
      columns,
      dataSource,
      data,
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
      {
        convertColumnsAndDataSource()['data'] 
        && convertColumnsAndDataSource()['data'].length > 0 ? 
          <Bar
            title=""
            data={convertColumnsAndDataSource()['data']}
          />
          : null
      }
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
