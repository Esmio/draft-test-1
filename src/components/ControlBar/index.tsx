import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import styles from './index.less';

interface Props {
  canEdit?: boolean;
  canDelete?: boolean;
  onCreate: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const ControlBar: React.FC<Props> = ({
  canEdit,
  canDelete,
  onCreate,
  onEdit,
  onRemove,
}) => (
  <>
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => {
        onCreate();
      }}
    >
      新建
    </Button>
    <Button
      disabled={!canEdit}
      icon={<EditOutlined />}
      className={styles.buttonLeft}
      onChange={() => {
        onEdit()
      }}
    >
      编辑
    </Button>
    <Button
      disabled={!canDelete}
      icon={<DeleteOutlined />}
      className={styles.buttonLeft}
      onClick={() => {
        onRemove()
      }}
    >
      删除
    </Button>
  </>
)


export default ControlBar;