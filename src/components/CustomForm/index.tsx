import React, { ReactNode, useCallback } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { FormItemProps } from 'antd/lib/form'

import styles from './index.less';

const { Option } = Select;

interface TypeOption {
  value: string | number;
  name: string;
}

interface WithTypeItemProps extends FormItemProps {
  type: 'input' | 'select';
  typeOptions?: TypeOption[];
  multi?: boolean;
  mode?: "multiple" | "tags" | undefined;
} 

interface Props {
  items: WithTypeItemProps[];
  initialValues?: Store;
  name?: string;
  onFinish?:Callbacks['onFinish'];
  onFinishFailed?:Callbacks['onFinishFailed'];
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const CustomForm: React.FC<Props> = ({
  items,
  name,
  initialValues,
  onFinish,
  onFinishFailed,
}) => {
  const [form] = Form.useForm();

  const handleOnFinish = useCallback(
    (values) => {
      onFinish && onFinish(values);
      form.resetFields();
    },
    [onFinish],
  )

  return (
    <Form
      {...layout}
      form={form}
      name={name}
      initialValues={initialValues || {}}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
    >
      {items.map(({ type, typeOptions, mode, ...itemProps }, idx) => (
        <Form.Item {...itemProps} key={idx}>
          {getComByType({type,typeOptions, mode})}
        </Form.Item>
      ))}
      <Form.Item {...tailLayout}>
        <Button className={styles.button} htmlType="submit" type="primary">确认</Button>
      </Form.Item>
    </Form>
  )
}

interface ComPrams {
  type: string;
  typeOptions?: TypeOption[];
  mode?: "multiple" | "tags" | undefined;
}

function getComByType({
  type,
  typeOptions,
  mode,
}: ComPrams): ReactNode {
  switch(type) {
    case 'input':
      return <Input className={styles.itemWidth} />
    case 'select':
      return <Select style={{width: 220}} mode={mode}>
        {typeOptions?.map(({ value, name }: TypeOption) => (
          <Option key={value} value={value}>{name}</Option>
        ))}
      </Select>
    default:
      return null;
  }
}

export default CustomForm;