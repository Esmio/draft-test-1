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
      <Option value="-1">待提交</Option>
      <Option value="0">待审批</Option>
      <Option value="1">未通过</Option>
      <Option value="2">已完成</Option>
    </Select>
  </>
)

export default Search;