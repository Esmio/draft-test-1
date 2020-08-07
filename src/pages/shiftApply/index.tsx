import React, { useState, useEffect, useCallback, useRef, ReactText } from 'react'
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal, Button } from 'antd';
import moment from 'moment';

import { StateType } from './model';
import { ListItem } from './data.d';
import Main from '@/components/MainContainer';
import ControlBar from '@/components/ControlBar';
import Search from './components/Search';
import CustomForm from '@/components/CustomForm';

// import styles from './style.less'

interface Props {
  dispatch: Dispatch;
}

const ShiftApply: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  list,
  validate,
  pagination,
}) => {
  const [ status, setStatus ] = useState('-1')
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([]);

  useEffect(() => {
    dispatch({type: 'shiftApply/list', payload: {
      page: 1,
      size: 10,
      flowStatus: parseInt(status)
    }})
  }, [])

  // 增
  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible]);
  // 改
  const onEdit = useCallback(() => {
    setEditModalVisible(true);
  }, [editModalVisible]);

  // 删除提交
  const onRemove = useCallback(() => {
    Modal.confirm({
      title: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'shiftApply/remove',
          payload: {
            id: selectedRows[0].id,
          },
          callback: () => {
            setSelectedRows([]);
          },
          listQuery: {
            ...pagination,
            flowStatus: parseInt(status),
          }
        })
      }
    })
  }, [selectedRows, status, pagination])
  // 状态切换
  const onChange = useCallback((status) => {
    dispatch({
      type: 'shiftApply/list',
      payload: {
        page: 1,
        size: 10,
        flowStatus: status,
      }
    })
    setStatus(status);
  }, [status]);

  // 创建取消
  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible]);
  // 创建弹框提交
  const handleCreateOk = useCallback((values) => {
    console.log('values', values);
    const { originalDate, currDate } = values;
    const { page, size } = pagination;
    dispatch({
      type: 'shiftApply/create',
      payload: {
        ...values,
        originalDate: moment(originalDate).format('YYYY-MM-DD'),
        currDate: moment(currDate).format('YYYY-MM-DD'),
      },
      callback: () => {
        setCreateModalVisible(false);
      },
      listQuery: {
        page,
        size,
        flowStatus: parseInt(status)
      }
    })
  }, [pagination, status])
  // 创建弹框修改
  const handleValuesChange = useCallback((value) => {
    const { originalDate, currDate } = value;
    dispatch({
      type: 'shiftApply/check',
      payload: {
        date: moment(originalDate || currDate).format('YYYY-MM-DD'),
        key: Object.keys(value)[0],
      }
    })
  }, []);
  // select rows
  const handleRowSelected: 
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined = 
    (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectedRows', selectedRows)
    }
  // 编辑弹框取消
  const handleEditModalCancel = useCallback(() => {
    setEditModalVisible(false)
  }, [editModalVisible])

  // 编辑弹框提交
  const handleEditOk = useCallback((values) => {
    console.log('values', values);
    const { originalDate, currDate } = values;
    const { page, size } = pagination;
    dispatch({
      type: 'shiftApply/update',
      payload: {
        ...values,
        originalDate: moment(originalDate).format('YYYY-MM-DD'),
        currDate: moment(currDate).format('YYYY-MM-DD'),
        id: selectedRows[0].id,
      },
      callback: () => {
        setEditModalVisible(false);
      },
      listQuery: {
        page,
        size,
        flowStatus: parseInt(status),
      }
    })
  }, [pagination, status, selectedRows])

  // 分页
  const handlePageChange = useCallback(
    (page, size) => {
      dispatch({
        type: 'shiftApply/list',
        payload: {
          page,
          size,
          flowStatus: parseInt(status),
        }
      })
    },
    [selectedRows, status],
  )
  // 提交
  const handleCommit = useCallback(() => {
    dispatch({
      type: 'shiftApply/commit',
      payload: {
        id: selectedRows[0].id
      },
      listQuery: {
        ...pagination,
        flowStatus: parseInt(status),
      }
    })
  }, [selectedRows, status]);
  // 审核按钮点击
  const handleAuthClicked = useCallback(() => {
    setAuthVisible(true)
  }, [authVisible])
  // 审核
  const handleAuth = useCallback((values) => {
    dispatch({
      type: 'shiftApply/auth',
      payload: {
        ...values,
        auditResult: 0,
        id: selectedRows[0].id
      },
      callback: () => {
        setAuthVisible(false);
        setSelectedRows([]);
      },
      listQuery: {
        ...pagination,
        flowStatus: parseInt(status),
      }
    })
  }, [selectedRows, status]); 
  // 驳回
  const handleReject = useCallback((values) => {
    dispatch({
      type: 'shiftApply/auth',
      payload: {
        ...values,
        auditResult: -1,
        id: selectedRows[0].id
      },
      callback: () => {
        setAuthVisible(false);
        setSelectedRows([]);
      },
      listQuery: {
        ...pagination,
        flowStatus: parseInt(status),
      }
    })
  }, [selectedRows, status])
  // 审核Modal取消
  const handleAuthCancel = useCallback(() => {
    setAuthVisible(false)
  }, [authVisible])
  console.log('selectedRows', selectedRows); 
  return (
    <Main
      search={
        <Search
          value={status}
          onChange={onChange}
        />
      }
      control={parseInt(status) <= 0 ? <ControlBar
        canEdit={selectedRows.length === 1}
        // canDelete={selectedRows.length > 0}
        canDelete={selectedRows.length === 1}
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
      /> : null}
      extra={
        <>
          {
            status === '-1' && <Button
              disabled={selectedRows.length !== 1}
              type="primary"
              onClick={handleCommit}
            >提交</Button>
          }
          {
            status === '0' && <Button
              disabled={selectedRows.length !== 1}
              type="primary"
              onClick={handleAuthClicked}
            >审核</Button>
          }
        </>
      }
    >
      <Table
        bordered
        loading={loading}
        size="small"
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          onChange: handlePageChange
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        columns={[
          {
            title: '排班工序',
            dataIndex: 'departmentName',
            key: 'departmentName',
            align: 'center',
          },
          {
            title: '原排班日期',
            dataIndex: 'originalDate',
            key: 'originalDate',
            align: 'center',
          },
          {
            title: '现排班日期',
            dataIndex: 'currDate',
            align: 'center',
            key: 'currDate'
          },
          {
            title: '申请人',
            dataIndex: 'createUserName',
            align: 'center',
            key: 'createUserName'
          },
          {
            title: '申请时间',
            dataIndex: 'createAt',
            align: 'center',
            key: 'createAt'
          },
        ]}
        dataSource={list}
        rowKey={({ id }) => id}
      />
      <Modal
        visible={createModalVisible}
        title="新增排班"
        onCancel={handleCreateCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "原排版日期",
              name: 'originalDate',
              type: 'datepicker',
              validateStatus: validate['originalDate'].status,
              help: validate['originalDate'].msg,
              rules: [
                {
                  required: true,
                  message: '请选择员工'
                }
              ]
            },
            {
              label: '现排版日期',
              name: 'currDate',
              type: 'datepicker',
              validateStatus: validate['currDate'].status,
              help: validate['currDate'].msg,
              rules: [
                {
                  required: true,
                  message: '请选择员工'
                }
              ]
            },
          ]}
          initialValues={{
          }}
          onFinish={handleCreateOk}
          onValuesChange={handleValuesChange}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title="编辑排班"
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "原排版日期",
              name: 'originalDate',
              type: 'datepicker',
              validateStatus: validate['originalDate'].status,
              help: validate['originalDate'].msg,
              rules: [
                {
                  required: true,
                  message: '请选择员工'
                }
              ]
            },
            {
              label: '现排版日期',
              name: 'currDate',
              type: 'datepicker',
              validateStatus: validate['currDate'].status,
              help: validate['currDate'].msg,
              rules: [
                {
                  required: true,
                  message: '请选择员工'
                }
              ]
            },
          ]}
          initialValues={{
            originalDate: selectedRows[0] && moment(selectedRows[0].originalDate),
            currDate: selectedRows[0] && moment(selectedRows[0].currDate),
          }}
          onFinish={handleEditOk}
          onValuesChange={handleValuesChange}
        />
      </Modal>
      <Modal
        title="审核"
        visible={authVisible}
        onCancel={handleAuthCancel}
        footer={null}
      >
        <CustomForm
          name="auth"
          items={[
            {
              label: '审批意见',
              name: 'auditComment',
              type: 'textarea',
            }
          ]}
          onFinish={handleAuth}
          onReject={handleReject}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    shiftApply: {
      loading,
      list,
      validate,
      pagination,
    },
  }: {
    shiftApply: StateType;
  }) => ({
    loading,
    list,
    validate,
    pagination,
  }),
)(ShiftApply);
