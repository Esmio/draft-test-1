import React, { useCallback } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  url?: string;
}

const ExportButton: React.FC<Props> = ({ url }) => {
  const handleExport = useCallback(() => {
    if(!url) return;
    window.location.href = url;
  }, [url])
  return (
    <Button
      type="primary"
      disabled={!url}
      icon={<UploadOutlined />}
      onClick={handleExport}
    >导出</Button>
  )
}

export default ExportButton;