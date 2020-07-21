import React from 'react';

import { Input } from 'antd';

import styles from './index.less';

// const { ChangeEvent } = Input;

interface Props {
  label?: string;
  value: string | number | readonly string[] | undefined;
  onChange:((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

const InputWithLabel: React.FC<Props> = ({label, value, onChange}) => (
  <>
    { label ? 
      <span className={styles.label}>{label}</span> : null
    }
    <span>
      <Input value={value} onChange={onChange} />
    </span>
  </>
)

export default InputWithLabel;