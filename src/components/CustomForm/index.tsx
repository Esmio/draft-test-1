import React, { ReactNode, useCallback, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Callbacks, Store } from 'rc-field-form/lib/interface';
import { FormItemProps } from 'antd/lib/form'

import styles from './index.less';
import { UploadFile } from 'antd/lib/upload/interface';
import { FieldProps } from '../Charts/Field';

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

  useEffect(() => {
    if(!initialValues) return;
    form.setFieldsValue(initialValues)
  }, [initialValues])

  return (
    <Form
      {...layout}
      form={form}
      name={name}
      initialValues={initialValues || {}}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
    >
      {items.map(({ type, typeOptions, mode, picker, ...itemProps }, idx) => (
        <Form.Item {...itemProps} key={idx}>
          {getComByType({type,typeOptions, mode, picker})}
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
      return <PlanText />
    case 'textarea': 
      return <TextArea className={styles.itemWidth} />
    // case 'uploader':
    //   return <Upload
    //     name="file"
    //     action="/uapi/attachment/upload"
    //     listType="picture-card"
    //     multiple
    //     headers={{
    //       Authorization: localStorage.getItem('token') || ''
    //     }}
    //   >
    //     {(fileList: FileList) => fileList.length < 1 && '+ 上传'}
    //   </Upload>
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

const PlanText: React.FC<CustomItemType> = ({ value }) => {
  return <span className="ant-form-text">{value}</span>
}

interface CustomUploadType {
  fileList?: UploadFile<any>[] | undefined;
  onChange?: () => void;
}

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
      {fileList && fileList.length < 1 && '+ 上传'}
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