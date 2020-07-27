import React, { ReactNode, useCallback } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { FormItemProps } from 'antd/lib/form'

const { Option } = Select;

interface TypeOption {
  value: string | number;
  name: string;
}

interface WithTypeItemProps extends FormItemProps {
  type: 'input' | 'select';
  typeOptions?: TypeOption | any;
} 

interface Props {
  items: WithTypeItemProps[];
  initialValues?: Store;
  name?: string;
  onFinish?:Callbacks['onFinish'];
  onFinishFailed?:Callbacks['onFinishFailed'];
}

const SearchForm: React.FC<Props> = ({
  items,
  name,
  initialValues,
  onFinish,
  onFinishFailed,
}) => {
  const [form] = Form.useForm();
  const handleReset = useCallback(
    () => {
      form.resetFields();
    },
    [],
  )
  return (
    <Form
      form={form}
      layout="inline"
      name={name}
      initialValues={initialValues || {}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {items.map(({ type, typeOptions, ...itemProps }, idx) => (
        <Form.Item {...itemProps} key={idx}>
          {getComByType(type, typeOptions)}
        </Form.Item>
      ))}
      <Form.Item>
        <Button htmlType="submit" type="primary">查询</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleReset}>重置</Button>
      </Form.Item>
    </Form>
  )
}

function getComByType(type: string, typeOptions?: any): ReactNode {
  switch(type) {
    case 'input':
      return <Input />
    case 'select':
      return <Select style={{width: 180}}>
        {typeOptions?.map(({ value, name }: TypeOption) => (
          <Option key={value} value={value}>{name}</Option>
        ))}
      </Select>
    default:
      return null;
  }
}

export default SearchForm;