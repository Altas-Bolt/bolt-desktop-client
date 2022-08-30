import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, message, Select, Upload } from 'antd';
import { useState } from 'react';
import { api } from 'utils/api';
import { v4 as uuidv4 } from 'uuid';

const CreateEmp = () => {
  const [genPassword, setGenPassword] = useState<string>('');
  const submit = useMutation(
    ({
      email,
      password,
      id,
    }: {
      email: string;
      password: string;
      id: string;
    }) =>
      api
        .post('/bolt/users/create', {
          email,
          password,
          id,
        })
        .then((res) => res.data),
    {
      onError: (err) => {
        console.error('[CREATE EMP]', err);
        message.error('Some error occured');
      },
      onSuccess: ({ data }) => {
        console.log(data);
        message.success(`employee Registered`);
      },
    }
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', textAlign: 'center' }}>
        Create an Employee
      </h1>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={(data) => {
          const pass = uuidv4();
          console.log('data', data);
          //!FIX
          submit.mutate({
            email: data.email,
            password: pass,
            id: 'id - ' + data.email,
          });
          console.log(pass);
          setGenPassword(pass);
        }}
      >
        <Form.Item
          rules={[{ required: true, message: 'Please input your firstname!' }]}
          label="Firstname"
          name="firstname"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Please input your lastname!' }]}
          label="Lastname"
          name="lastname"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ type: 'email', required: true }]}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
          initialValue="+91"
        >
          <Input
            // addonBefore={
            //   <Form.Item initialValue={'+91'} name="prefix" noStyle>
            //     {/* <Select style={{ width: 70 }}>
            //       <Select.Option value="86">+86</Select.Option>
            //       <Select.Option value="87">+87</Select.Option>
            //     </Select> */}
            //     <Input style={{ width: 70 }} />
            //   </Form.Item>
            // }
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select your gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            { required: true },
            () => ({
              validator(_, value) {
                if (value <= Date.now()) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Invalid date'));
              },
            }),
          ]}
          name="dob"
          label="DOB"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="department"
          label="Department"
        >
          <Select>
            {['Dev', 'Acc'].map((label) => (
              <Select.Option key={label} value="demo">
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: '300px' }}>
            Submit
          </Button>
        </div>
        {/* </Form.Item> */}
      </Form>

      <h1>{genPassword}</h1>
    </div>
  );
};

export default CreateEmp;
