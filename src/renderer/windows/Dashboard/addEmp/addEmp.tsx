import { LoadingOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, PageHeader, Select } from 'antd';
import { api } from 'utils/api';
import { AddEmpWrapper } from './addEmp.styles';

const AddEmp = () => {
  const { data } = useQuery(['minions'], () => {
    return api.get('/bolt/minions/all');
  });
  const addEmp = useMutation(
    ({ id, email }: { email: string; id: string }) =>
      api
        .put(`/bolt/minions/add-user/${id}`, {
          email,
        })
        .then((res) => res.data),
    {
      onError: (err) => {
        console.error('[add emp tp minion]', err);
        message.error('Some error occured');
      },
      onSuccess: ({ data }) => {
        console.log(data);
        message.success(`minion added`);
      },
    }
  );

  return (
    <AddEmpWrapper>
      <div className="card">
        <div>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Link/Relink a minion"
            backIcon={null}
          />
        </div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          layout="vertical"
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
          onFinish={({ email, id }) => {
            console.log('data', email, id);
            addEmp.mutate({ email, id });
          }}
        >
          <Form.Item
            rules={[{ type: 'email', required: true }]}
            name="email"
            label="Email"
            // style={{ width: '200px' }}
          >
            <Input style={{minWidth:"100%"}} />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="id" label="Device Id">
            <Select
              showSearch
              optionFilterProp="children"
              style={{ width: 400 }}
              filterOption={(input, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
              }
            >
              {(data?.data?.data || ['loading']).map((label: any) => {
                if (label === 'loading') {
                  return (
                    <Select.Option key={label} value={label}>
                      <LoadingOutlined />
                    </Select.Option>
                  );
                }

                if (!label.saltId) {
                  console.info(
                    '[addEmp minion list] no label.salt => ',
                    label.salt
                  );
                  return null;
                }

                return (
                  <Select.Option key={label.id}>{label.saltId}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AddEmpWrapper>
  );
};

export default AddEmp;
