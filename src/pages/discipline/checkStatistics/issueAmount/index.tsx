import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';
import moment from 'moment';

import { StateType } from './model';
import { ChartItem } from './data.d';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';
import SearchForm from '@/components/SearchForm';
import { Bar } from '@/components/Charts';

interface Props {
  dispatch: Dispatch;
}

const CheckIssueAmount: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  list,
  departmentList,
  departmentListLoading,
}) => {

  const searchRef = useRef<{
    departmentId?:React.ReactText;
    monthOfYear?: string;
  }>()
  
  useEffect(() => {
    dispatch({type: 'checkIssueAmount/departmentList'});
  }, [])

  useEffect(() => {
    if(!departmentList || departmentList.length === 0) return;
    dispatch({
      type: 'checkIssueAmount/list',
      payload: {
        monthOfYear: moment().format('YYYY-MM'),
        departmentId: departmentList[0]?.value,
      },
    });
  }, [departmentList]);

  const onChange = useCallback((e) => {
  }, [])

  const reset = useCallback(() => {
  }, [])

  const onSearch = useCallback((values) => {
    const { departmentId, monthOfYear } = values;
    const searchParams = {
      departmentId,
      monthOfYear: moment(monthOfYear).format('YYYY-MM')
    }
    dispatch({
      type: 'checkIssueAmount/list',
      payload: searchParams,
    });
    searchRef.current = searchParams;
  }, [])

  const convertColumnsAndDataSource = useCallback(() => {
    const data: ChartItem[] = [];
    const columns: any[] = [];
    const dataSource: {
      problemCategoryName: string;
      [key: string]: string;
    }[] = [];

    list.forEach(({ problemCategoryName, scoreMap }, idx) => {
      if(idx === 0)
        columns.push({
          title: '问题类别',
          dataIndex: 'problemCategoryName',
          align: 'center',
          key: 'problemCategoryName',
        })
      const dataItem = {
        problemCategoryName,
      }
      Object.keys(scoreMap).forEach(id => {
        if(idx === 0)
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
            type: problemCategoryName,
          })
      })
      dataSource.push(dataItem);
    })

    console.log('columns', columns)
    console.log('dataSource', dataSource)
    console.log('data', data)
    
    return {
      columns,
      dataSource,
      data,
    }
  }, [list]);

  return (
    <Main
      search={
        <SearchForm
          items={[
            {
              label: "部门选择",
              name: 'departmentId',
              type: 'select',
              loading: departmentListLoading,
              typeOptions: departmentList,
            },
            {
              label: "月份选择",
              name: 'monthOfYear',
              type: 'datepicker',
              picker: 'month',
            }
          ]}
          initialValues={{
            departmentId: searchRef.current?.departmentId,
            monthOfYear: searchRef.current?.monthOfYear ? moment(searchRef.current?.monthOfYear) : null,
          }}
          onFinish={onSearch}
        />
      }
      extra={<ExportButton />}
    >
      {
        convertColumnsAndDataSource()['data'] 
        && convertColumnsAndDataSource()['data'].length > 0 ?
        <Bar
          title=""
          type="interval"
          color="type"
          data={convertColumnsAndDataSource()['data']}
        /> : null
      }
      <Table
        bordered
        loading={loading}
        size="small"
        pagination={false}
        columns={convertColumnsAndDataSource()['columns']}
        dataSource={convertColumnsAndDataSource()['dataSource']}
        rowKey={({ problemCategoryName }) => problemCategoryName}
      />
    </Main>
  );
};

export default connect(
  ({
    checkIssueAmount: {
      loading,
      list,
      departmentList,
      departmentListLoading,
    },
  }: {
    checkIssueAmount: StateType;
  }) => ({
    loading,
    list,
    departmentList,
    departmentListLoading,
  }),
)(CheckIssueAmount);
