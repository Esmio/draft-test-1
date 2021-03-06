import React, { ReactNode, useCallback, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { FormItemProps } from 'antd/lib/form'

const { Option } = Select;

export interface TypeOption {
  value: string | number;
  name: string;
}

interface WithTypeItemProps extends FormItemProps {
  type: 'input' | 'select' | 'datepicker';
  typeOptions?: TypeOption | any;
  loading?: boolean;
  picker?: "date" | "week" | "month" | "quarter" | "year";
}

interface Props {
  items: WithTypeItemProps[];
  initialValues?: Store;
  name?: string;
  onFinish?: Callbacks['onFinish'];
  onFinishFailed?: Callbacks['onFinishFailed'];
  onReset?: () => void;
}

const SearchForm: React.FC<Props> = ({
  items,
  name,
  initialValues,
  onFinish,
  onFinishFailed,
  onReset,
}) => {

  const [form] = Form.useForm();
  const handleReset = useCallback(
    () => {
      form.resetFields();
      onReset && onReset();
    },
    [],
  )

  useEffect(() => {
    if(!initialValues) return;
    form.setFieldsValue(initialValues)
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout="inline"
      name={name}
      initialValues={initialValues || {}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {items.map(({ type, typeOptions, loading, picker, ...itemProps }, idx) => (
        <Form.Item {...itemProps} key={idx}>
          {getComByType({type, typeOptions, loading, picker})}
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

export interface TypeOptions {
  name: string;
  value: string | number;
}

interface TypeParams {
  type: string;
  typeOptions: TypeOptions[];
  loading?: boolean;
  picker?: "date" | "week" | "month" | "quarter" | "year";
}

function getComByType({type, typeOptions, loading, picker}: TypeParams): ReactNode {
  switch(type) {
    case 'input':
      return <Input />
    case 'select':
      return <Select loading={loading} style={{width: 180}}>
        {typeOptions?.map(({ value, name }: TypeOption) => (
          <Option key={value} value={value}>{name}</Option>
        ))}
      </Select>
    case 'datepicker':
      return <DatePicker
        picker={picker || 'date'}
      />
    default:
      return null;
  }
}

export default SearchForm;