import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';
import { ColumnType, ColumnGroupType } from 'antd/lib/table';
import moment from 'moment';

import { PlanWithDate, Plan, UserPlan } from './data.d';
import { StateType } from './model';
import Main from '@/components/MainContainer';
import Search from './components/Search';
import ExportButton from './components/ExportButton';

const mockData: PlanWithDate[] = [
  {
    date: '2020-07-20T04:02:56.824Z',
    plan: [
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '1',
        processName: '夹层预处理',
        userPlan: [
          {
            userId: '1',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '2',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '3',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '2',
        processName: '夹层烘弯',
        userPlan: [
          {
            userId: '4',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '5',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '6',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '3',
        processName: '夹层合片',
        userPlan: [
          {
            userId: '7',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '8',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '9',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '4',
        processName: '夹层终检',
        userPlan: [
          {
            userId: '10',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '11',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '12',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
    ]
  },
  {
    date: '2020-07-21T04:02:56.824Z',
    plan: [
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '1',
        processName: '夹层预处理',
        userPlan: [
          {
            userId: '1',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '2',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '3',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '2',
        processName: '夹层洪弯',
        userPlan: [
          {
            userId: '4',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '5',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '6',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '3',
        processName: '夹层合片',
        userPlan: [
          {
            userId: '7',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '8',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '9',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '4',
        processName: '夹层终检',
        userPlan: [
          {
            userId: '10',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '11',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '12',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
    ]
  },
  {
    date: '2020-07-22T04:02:56.824Z',
    plan: [
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '1',
        processName: '夹层预处理',
        userPlan: [
          {
            userId: '1',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '2',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '3',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '2',
        processName: '夹层洪弯',
        userPlan: [
          {
            userId: '4',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '5',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '6',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '3',
        processName: '夹层合片',
        userPlan: [
          {
            userId: '7',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '8',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '9',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '4',
        processName: '夹层终检',
        userPlan: [
          {
            userId: '10',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '11',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '12',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
    ]
  },
  {
    date: '2020-07-23T04:02:56.824Z',
    plan: [
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '1',
        processName: '夹层预处理',
        userPlan: [
          {
            userId: '1',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '2',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '3',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '2',
        processName: '夹层洪弯',
        userPlan: [
          {
            userId: '4',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '5',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '6',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '3',
        processName: '夹层合片',
        userPlan: [
          {
            userId: '7',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '8',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '9',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
      {
        departmentId: '1',
        departmentName: '夹层',
        processId: '4',
        processName: '夹层终检',
        userPlan: [
          {
            userId: '10',
            userLevel: 'L1',
            userName: '王某某'
          },
          {
            userId: '11',
            userLevel: 'L2',
            userName: '李某某'
          },
          {
            userId: '12',
            userLevel: 'L3',
            userName: '杨某某'
          },
        ]
      },
    ]
  },
];

const processes = ['夹层预处理', '夹层烘弯', '夹层合片', '夹层终检'];
const departmentMap = {
  '夹层预处理': 4,
  '钢化车间': 1,
  '总成前后挡': 2,
  '注塑车间': 2,
  'GP12': 2,
  '物流改切': 3,
}

interface Props {
  dispatch: Dispatch;
}

const Detection: React.FC<Props & StateType> = ({
  dispatch,
}) => {
  const [userName, setUserName] = useState('');
  const dataRef = useRef<{columns: any; dataSource: any}>({columns: [], dataSource: []});

  const convertData = (data: PlanWithDate[]) => {
    const columns: ColumnType<any>[] = [
      {
        title: '部门/车间',
        dataIndex: 'departmentName',
        align: 'center',
        key: 'departmentName',
        render: (text, { processName }, index) => {
          console.log(index)
          return {
            children: text,
            props: {
              rowSpan: Object.keys(departmentMap).indexOf(processName) > -1 ? departmentMap[processName] : 0,
            }
          }
        }
      },
      {
        title: '工序',
        dataIndex: 'processName',
        align: 'center',
        key: 'processName',
      }
    ];
    const columnsWithDate: ColumnGroupType<any>[] = [];
    const dataSource = new Array(processes.length);
    data.forEach(({ date, plan }) => {
      const columnWithDateItem = {
        title: moment(date).format('MM月DD日'),
        children: [
          {
            title: 'L1',
            dataIndex: `${moment(date).format('MM年DD月')}:L1`,
            key: 'l1'
          },
          {
            title: 'L2',
            dataIndex: `${moment(date).format('MM年DD月')}:L2`,
            key: 'l2'
          },
          {
            title: 'L3',
            dataIndex: `${moment(date).format('MM年DD月')}:L3`,
            key: 'l3'
          }
        ]
      }
      columnsWithDate.push(columnWithDateItem)
      // dataSource = [...dataSource, ...plan ]
      plan.forEach(({departmentId, departmentName, processId, processName, userPlan}) => {
        const index = processes.indexOf(processName);
        if(index > -1) {
          if(!dataSource[index]) {
            dataSource[index] = {
              departmentId,
              departmentName,
              processId,
              processName,
            }
          } 
          userPlan.forEach(({ userLevel, userName }) => {
            dataSource[index][`${moment(date).format('MM年DD月')}:${userLevel}`] = userName;
          })
        }
      })
    })
    return {
      columns: [...columns, ...columnsWithDate],
      dataSource
    }
  }

  // useEffect(() => {
  //   // 请求列表数据
  //   // dispatch({
  //   //   type: 'plan/getPlanBoard',
  //   //   payload: {
  //   //     userName,
  //   //   }
  //   // });
  // }, [userName]);

  useEffect(() => {
    const {columns, dataSource} = convertData(mockData)
    dataRef.current = {columns, dataSource}
  }, [])

  const onChange = useCallback((e) => {
    setUserName(e.target.value)
  }, [])

  const reset = useCallback(() => {
    setUserName('');
  }, [])

  const onSearch = useCallback(() => {
    return false;
    dispatch({
      type: 'plan/getPlanBoard',
      payload: {
        userName: userName,
      }
    })
  }, [userName])

  return (
    <Main
      search={
        <Search
          value={userName}
          onChange={onChange}
          reset={reset}
          onSearch={onSearch}
        />
      }
      extra={<ExportButton />}
    >
      <Table
        bordered
        size="small"
        pagination={false}
        columns={dataRef.current.columns}
        dataSource={dataRef.current.dataSource}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    plan: {
    },
  }: {
    plan: StateType;
  }) => ({
  }),
)(Detection);
