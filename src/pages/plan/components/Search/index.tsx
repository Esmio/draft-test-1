import React from 'react';

import { Button } from 'antd';

import Input from '../Input';
import styles from './index.less';

interface Props {
  value: string | number | readonly string[] | undefined;
  onChange:((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onSearch: () => void;
  reset: () => void;
}

const Search: React.FC<Props> = ({ value, onChange, onSearch, reset }) => {
  return (
    <>
      <Input label="人员姓名：" value={value} onChange={onChange} />
      <Button type="primary" onClick={onSearch} className={styles.mgL}>查询</Button>
      <Button onClick={reset} className={styles.mgL}>重置</Button>
    </>
  )
}

export default Search;