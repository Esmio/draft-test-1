import React, { useState, useEffect, useCallback, ReactText, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import { ListItem, ProcessDto } from './data.d';
import Main from '@/components/MainContainer';
import SearchForm from '@/components/SearchForm';
import ControlBar from '@/components/ControlBar';
import CustomForm from '@/components/CustomForm';

interface Props {
  dispatch: Dispatch;
}

const BasicList: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  selectLoading,
  list,
  typeList,
  pagination,
  processList,
}) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([]);

  const searchRef = useRef({})

  useEffect(() => {
    dispatch({
      type: 'basicList/list',
      payload: {
        page: 1,
        size: 10
      }
    })
    dispatch({type: 'basicList/getTypeList'});
    dispatch({type: 'basicList/getProcess'});
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
        type: 'basicList/remove',
        payload: {
          id: selectedRows[0].id,
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

  const onSearch = useCallback((values) => {
    searchRef.current = values;
    dispatch({
      type: 'basicList/list',
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
      type: 'basicList/create',
      payload: {...values, useLevel: values.useLevel.join(',')},
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])
  // 编辑弹框提交
  const handleEditConfirm = useCallback((values) => {
    dispatch({
      type: 'basicList/update',
      payload: {
        ...values,
        useLevel: values.useLevel.join(','),
        id: selectedRows[0].id,
      },
      callback: () => {
        setEditModalVisible(false);
      }
    })
  }, [editModalVisible])
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
        type: 'basicList/list',
        payload: {
          page,
          size,
          ...searchRef.current,
        }
      })
    },
    [],
  )

  return (
    <Main
      search={
        <SearchForm
          items={[
            {
              label: "审核类别",
              name: 'auditCategoryId',
              type: 'select',
              loading: selectLoading,
              typeOptions: typeList,
            },
          ]}
          initialValues={{
            auditCategoryId: typeList[0]?.value,
          }}
          onFinish={onSearch}
        />
      }
      control={<ControlBar
        canEdit={selectedRows.length === 1}
        // canDelete={selectedRows.length > 0}
        canDelete={selectedRows.length === 1}
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
      />}
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
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        columns={[
          {
            title: '审核类别',
            dataIndex: 'auditCategoryName',
            key: 'auditCategoryName',
            align: 'center',
          },
          {
            title: '编号',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
          },
          {
            title: '审核内容',
            dataIndex: 'auditComment',
            key: 'auditComment',
            align: 'center',
          },
          {
            title: '适用层级',
            dataIndex: 'useLevel',
            key: 'useLevel',
            align: 'center',
          },
          {
            title: '适用工序',
            dataIndex: 'processCategoryDtoList',
            key: 'processCategoryDtoList',
            align: 'center',
            render: value => value.map(({ processName }: ProcessDto) => processName).join(' ')
          },
          {
            title: '添加时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
          }
        ]}
        dataSource={list}
        rowKey={({ id }) => id}
      />
      <Modal
        visible={createModalVisible}
        title="新增审核内容"
        onCancel={handleCreateCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "审核类别",
              name: 'auditCategoryId',
              type: 'select',
              typeOptions: typeList,
              rules: [
                {
                  required: true,
                  message: '请选择审核类别'
                }
              ]
            },
            {
              label: '编号',
              name: 'no',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写编号'
                }
              ]
            },
            {
              label: '审核内容',
              name: 'auditComment',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写审核内容'
                }
              ]
            },
            {
              label: '适用层级',
              name: 'useLevel',
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
              mode: 'multiple',
              rules: [
                {
                  required: true,
                  message: '请选择适用层级'
                }
              ]
            },
            {
              label: '适用工序',
              name: 'processIds',
              type: 'select',
              typeOptions: processList,
              mode: 'multiple',
              rules: [
                {
                  required: true,
                  message: '请选择适用工序'
                }
              ]
            }
          ]}
          initialValues={{
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title="编辑审核类别"
        onCancel={handleEditModalCancel}
        footer={null}
        destroyOnClose
      >
        <CustomForm
          name="edit"
          items={[
            {
              label: "审核类别",
              name: 'auditCategoryId',
              type: 'select',
              typeOptions: typeList,
              rules: [
                {
                  required: true,
                  message: '请选择审核类别'
                }
              ]
            },
            {
              label: '编号',
              name: 'no',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写编号'
                }
              ]
            },
            {
              label: '审核内容',
              name: 'auditComment',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写审核内容'
                }
              ]
            },
            {
              label: '适用层级',
              name: 'useLevel',
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
              mode: 'multiple',
              rules: [
                {
                  required: true,
                  message: '请选择适用层级'
                }
              ]
            },
            {
              label: '适用工序',
              name: 'processIds',
              type: 'select',
              typeOptions: processList,
              mode: 'multiple',
              rules: [
                {
                  required: true,
                  message: '请选择适用工序'
                }
              ]
            }
          ]}
          initialValues={{
            auditCategoryId: selectedRows[0]?.auditCategoryId.toString(),
            no: selectedRows[0]?.no,
            auditComment: selectedRows[0]?.auditComment,
            processIds: selectedRows[0]?.processCategoryDtoList?.map(({id}) => id),
            useLevel: selectedRows[0]?.useLevel.split(','),
          }}
          onFinish={handleEditConfirm}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    basicList: {
      loading,
      selectLoading,
      list,
      typeList,
      pagination,
      processList,
    },
  }: {
    basicList: StateType;
  }) => ({
    loading,
    selectLoading,
    list,
    typeList,
    pagination,
    processList,
  }),
)(BasicList);
