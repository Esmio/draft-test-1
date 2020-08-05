import React, { useState, useEffect, useCallback, ReactText, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import { ListItem } from './data.d';
import Main from '@/components/MainContainer';
import ControlBar from "@/components/ControlBar";
import SearchForm from '@/components/SearchForm';
import CustomForm from '@/components/CustomForm';

interface Props {
  dispatch: Dispatch;
}

const StaffLevel: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  userNameList,
  userNameListLoading,
  departmentList,
  departmentListLoading,
  processList,
  list,
  pagination,
}) => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([]);
  const [update, setUpdate] = useState<number>(+ new Date());

  const searchRef = useRef<{ departmentId?: string; searchUserName?: string; }>({})

  // didMount
  useEffect(() => {
    dispatch({ type: 'staffLevel/userNameList' });
    dispatch({ type: 'staffLevel/departmentList' });
    dispatch({ type: 'staffLevel/processList' });
    dispatch({
      type: 'staffLevel/list', payload: {
        page: 1,
        size: 10,
      }
    });
  }, []);

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
          type: 'staffLevel/remove',
          payload: {
            userId: selectedRows[0].userId,
            ...searchRef.current,
            ...pagination,
          },
          callback: () => {
            setSelectedRows([]);
          }
        })
      }
    })
  }, [selectedRows])
  // 搜索
  const onSearch = useCallback((values) => {
    searchRef.current = values;
    dispatch({
      type: 'staffLevel/list',
      payload: {
        ...values,
        page: 1,
        size: 10,
      },
    })
  }, [])

  // select rows
  const handleRowSelected:
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined =
    (_, selectedRows) => {
      setSelectedRows(selectedRows);
    }

  // 创建弹框提交
  const handleCreateOk = useCallback((values) => {
    dispatch({
      type: 'staffLevel/create',
      payload: values,
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])

  // 编辑弹框提交
  const handleEditConfirm = useCallback((values) => {
    dispatch({
      type: 'staffLevel/update',
      payload: {
        ...values,
        userId: selectedRows[0].userId,
      },
      callback: () => {
        setEditModalVisible(false);
      }
    })
  }, [editModalVisible, selectedRows])
  // 编辑弹框取消
  const handleEditModalCancel = useCallback(() => {
    setEditModalVisible(false)
  }, [editModalVisible])

  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])

  // 分页
  const handlePageChange = useCallback(
    (page, size) => {
      dispatch({
        type: 'staffLevel/list',
        payload: {
          page,
          size,
          ...searchRef.current,
        }
      })
    },
    [],
  )
  // 搜索重置
  const handleSearchReset = useCallback(() => {
    searchRef.current = {}
    setUpdate(+ new Date())
  }, [update])

  return (
    <Main
      search={
        <SearchForm
          items={[
            {
              label: "姓名",
              name: 'searchUserName',
              type: 'select',
              loading: userNameListLoading,
              typeOptions: userNameList,
            },
            {
              label: "所属部门/车间",
              name: 'departmentId',
              type: 'select',
              loading: departmentListLoading,
              typeOptions: departmentList,
            }
          ]}
          initialValues={{
            searchUserName: searchRef.current?.searchUserName,
            departmentId: searchRef.current?.departmentId,
          }}
          onFinish={onSearch}
          onReset={handleSearchReset}
        />
      }
      control={
        <ControlBar
          canEdit={selectedRows.length === 1}
          // canDelete={selectedRows.length > 0}
          canDelete={selectedRows.length === 1}
          onCreate={onCreate}
          onEdit={onEdit}
          onRemove={onRemove}
        />
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
          onChange: handlePageChange,
        }}
        columns={[
          {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
            align: 'center',
          },
          // {
          //   title: '职位',
          //   dataIndex: 'auditType',
          //   key: 'auditType',
          //   align: 'center',
          // },
          {
            title: '所属部门/车间',
            dataIndex: 'departName',
            key: 'departName',
            align: 'center',
          },
          {
            title: '工序',
            dataIndex: 'processName',
            key: 'processName',
            align: 'center',
          },
          {
            title: '层级',
            dataIndex: 'jobLevel',
            key: 'jobLevel',
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'createAt',
            key: 'createAt',
            align: 'center',
          },
        ]}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        dataSource={list}
        rowKey={({ userId }) => userId}
      />
      <Modal
        visible={createModalVisible}
        title="新增层级信息"
        onCancel={handleCreateCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "姓名",
              name: 'userId',
              type: 'select',
              typeOptions: userNameList,
              rules: [
                {
                  required: true,
                  message: '请选择员工'
                }
              ]
            },
            {
              label: '所属部门/车间',
              name: 'departmentId',
              type: 'select',
              typeOptions: departmentList,
            },
            {
              label: '工序',
              name: 'processId',
              type: 'select',
              typeOptions: processList,
            },
            {
              label: '层级',
              name: 'jobLevel',
              type: 'select',
              typeOptions: [
                {
                  name: 'L1',
                  value: 'L1',
                },
                {
                  name: 'L2',
                  value: 'L2',
                },
                {
                  name: 'L3',
                  value: 'L3',
                },
              ],
            }
          ]}
          initialValues={{
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title="编辑层级信息"
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <CustomForm
          name="edit"
          items={[
            {
              label: '所属部门/车间',
              name: 'departId',
              type: 'select',
              typeOptions: departmentList,
            },
            {
              label: '工序',
              name: 'processId',
              type: 'select',
              typeOptions: processList,
              rules: [
                {
                  required: true,
                  message: '请选择工序'
                }
              ]
            },
            {
              label: '层级',
              name: 'jobLevel',
              type: 'select',
              typeOptions: [
                {
                  name: 'L1',
                  value: 'L1',
                },
                {
                  name: 'L2',
                  value: 'L2',
                },
                {
                  name: 'L3',
                  value: 'L3',
                },
              ],
            }
          ]}
          initialValues={{
            departId: selectedRows[0]?.departId,
            jobLevel: selectedRows[0]?.jobLevel,
            processId: selectedRows[0]?.processId,

          }}
          onFinish={handleEditConfirm}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    staffLevel: {
      loading,
      userNameList,
      userNameListLoading,
      departmentList,
      departmentListLoading,
      processList,
      list,
      pagination,
    },
  }: {
    staffLevel: StateType;
  }) => ({
    loading,
    userNameList,
    userNameListLoading,
    departmentList,
    departmentListLoading,
    processList,
    list,
    pagination,
  }),
)(StaffLevel);
