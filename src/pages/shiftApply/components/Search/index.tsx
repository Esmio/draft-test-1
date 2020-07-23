import React from 'react';
import { Select } from 'antd';

import styles from './index.less';
const { Option } = Select;

interface Props {
  value: string;
  onChange: (value: string) => void
}

const Search: React.FC<Props> = ({ onChange, value }) => (
  <>
    <span>调班状态：</span>
    <Select
      value={value}
      onChange={onChange}
      className={styles.select}
    >
      <Option value="0">全部</Option>
      <Option value="1">待提交</Option>
      <Option value="2">待审批</Option>
      <Option value="3">已通过</Option>
      <Option value="4">待提交</Option>
    </Select>
  </>
)

export default Search;