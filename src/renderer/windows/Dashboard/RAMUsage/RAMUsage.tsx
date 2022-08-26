import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { useState } from 'react';
import { api } from 'utils/api';
import { RAMUsageWrapper } from './RAMUsage.styles';

const RAMUsage = () => {
  const [minionId, setMinionId] = useState(null);
  const { data } = useQuery(['minions'], () => {
    return api.get('/bolt/minions/all');
  });

  const { data: cmdData, status: cmdStatus } = useQuery(
    ['cpu-usage', minionId],
    () => api.post('/api/salt/run-cmd', { saltIds: [minionId], cmd: 'ps aux' }),
    { enabled: !!minionId, staleTime: 2 * 1000 }
  );

  const renderTerminalData = () => {
    if (!minionId) return 'Enter a minion id to check RAM Usage';

    if (cmdStatus === 'loading') return 'Fetching RAM Usage...';

    return cmdData?.data.data ? Object.values(cmdData?.data.data) : '';
  };

  return (
    <RAMUsageWrapper>
      <div className="header">
        <h1 className="heading">RAM Usage</h1>
        <Select
          showSearch
          size="large"
          placeholder="Search for a minion id"
          optionFilterProp="children"
          style={{ width: 400 }}
          filterOption={(input, option: any) =>
            option.props.children
              ?.toLowerCase()
              .indexOf(input?.toLowerCase()) >= 0 ||
            option.props.value?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
          }
          onChange={(val) => setMinionId(val)}
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

            return <Select.Option key={label.id}>{label.saltId}</Select.Option>;
          })}
        </Select>
      </div>
      <div className="terminal">{renderTerminalData()}</div>
      {/* <div className='terminal'></div> */}
    </RAMUsageWrapper>
  );
};

export default RAMUsage;
