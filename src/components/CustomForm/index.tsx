import React, { ReactNode, useCallback, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker, Upload } from 'antd';
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { FormItemProps } from 'antd/lib/form'
import { ValidateStatus } from 'antd/lib/form/FormItem';

import styles from './index.less';
import { UploadFile } from 'antd/lib/upload/interface';

const { Option } = Select;
const { TextArea } = Input;

export interface TypeOption {
  value: string | number;
  name: string;
}

interface WithTypeItemProps extends FormItemProps {
  type: 'input' | 'select' | 'datepicker' | 'readonly' | 'textarea' | 'uploader';
  typeOptions?: TypeOption[];
  multi?: boolean;
  mode?: "multiple" | "tags" | undefined;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  validateStatus?: ValidateStatus;
  help?: string | undefined;
}

interface Props {
  items: WithTypeItemProps[];
  initialValues?: Store;
  name?: string;
  onFinish?:Callbacks['onFinish'];
  onFinishFailed?:Callbacks['onFinishFailed'];
  onValuesChange?:Callbacks['onValuesChange'];
  onReject?: (values: Store) => void;
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
  onValuesChange,
  onReject,
}) => {
  const [form] = Form.useForm();

  const handleOnFinish = useCallback(
    (values) => {
      onFinish && onFinish(values);
      form.resetFields();
    },
    [onFinish, form],
  )

  const handleReject = useCallback(() => {
    const values = form.getFieldsValue()
    onReject && onReject(values)
    form.resetFields();
  }, [form, onReject])

  return (
    <Form
      {...layout}
      form={form}
      name={name}
      initialValues={initialValues || {}}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      {items.map(({ type, typeOptions, mode, picker, ...itemProps }, idx) => (
        <Form.Item {...itemProps} key={idx}>
          {getComByType({type,typeOptions, mode, picker})}
        </Form.Item>
      ))}
      <Form.Item {...tailLayout}>
        <Button className={styles.button} htmlType="submit" type="primary">确认</Button>
      </Form.Item>
      {
        onReject && 
        <Form.Item {...tailLayout}>
          <Button className={styles.button} onClick={handleReject} >驳回</Button>
        </Form.Item>
      }
    </Form>
  )
}

interface ComPrams {
  type: string;
  typeOptions?: TypeOption[];
  mode?: "multiple" | "tags" | undefined;
  picker?: "date" | "week" | "month" | "quarter" | "year";
}

function getComByType({
  type,
  typeOptions,
  mode,
  picker,
}: ComPrams): ReactNode {
  switch(type) {
    case 'input':
      return <Input className={styles.itemWidth} />
    case 'select':
      return <Select style={{width: 260}} mode={mode}>
        {typeOptions?.map(({ value, name }: TypeOption) => (
          <Option key={value} value={value}>{name}</Option>
        ))}
      </Select>
    case 'datepicker':
      return <DatePicker
        picker={picker || 'date'}
      />
    case 'readonly':
      return <PlainText />
    case 'textarea': 
      return <TextArea className={styles.itemWidth} />
    case 'uploader': 
      return <CustomUpload />
    default:
      return null;
  }
}

interface CustomItemType{
  value?: string | number;
  onChange?: () => void;
}

const PlainText: React.FC<CustomItemType> = ({ value }) => {
  return <span className="ant-form-text">{value}</span>
}

interface CustomUploadType {
  fileList?: UploadFile<any>[] | undefined;
  onChange?: () => void;
}
// 自定义上传组件
const CustomUpload: React.FC<CustomUploadType> = ({ fileList, onChange }) => (
  <Upload
    name="file"
    action="/uapi/attachment/upload"
    listType="picture-card"
    multiple
    fileList={fileList}
    onChange={onChange}
    onPreview={onPreview}
    headers={{
      Authorization: localStorage.getItem('token') || ''
    }}
  >
    {fileList && fileList.length >= 1 ? null : '+ 上传'}
  </Upload>
)

const onPreview = async (file: UploadFile<any> | undefined) => {
  let src = file!.url;
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file!.originFileObj!);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image = new Image();
  image.src = src!;
  const imgWindow = window.open(src);
  imgWindow!.document.write(image.outerHTML);
};

export default CustomForm;