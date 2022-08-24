import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  InfoCircleOutlined,
  TagFilled,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { blue, grey, red } from '@ant-design/colors';

import { Button, Dropdown, Menu, Space, Table, Tag } from 'antd';
import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';
import { ScanReportLayout } from './ScanReports.styles';

const scanItems = [
  {
    name: 'Scan 1',
  },
  {
    name: 'Scan 2',
  },
];

const scanData = {
  total: 100,
  blacklisted: 20,
  whitelisted: 40,
  undecided: 40,
  meta: [
    {
      id: 1,
      flag: 'blacklisted',
      software: {
        id: 1,
        name: 'PUBG',
        flag: 'blacklisted',
      },
      minion: {
        id: 1,
        saltId: 'aniketMac',
      },
    },
  ],
};

const dataSource = [
  {
    key: '1',
    name: 'PUBG',
    flag: 'blacklisted',
    minionId: '1',
    employeeEmail: 'aniket.biswas75@gmail.com',
  },
  {
    key: '2',
    name: 'John',
    flag: 'whitelisted',
    minionId: '2',
    employeeEmail: 'aniket.biswas75@gmail.com',
  },
];

const columns = [
  {
    title: 'Software Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Flag',
    dataIndex: 'flag',
    key: 'flag',
  },
  {
    title: 'Employee Email',
    dataIndex: 'employeeEmail',
    key: 'email',
  },
  {
    title: 'Minion',
    dataIndex: 'minionId',
    key: 'minionId',
    render: (_text: any, row: any) => (
      <Button onClick={() => console.log(row)}>View Minion</Button>
    ),
  },
];

const ScanReports = () => {
  const [selectedScan, setSelectedScan] = useState(null);

  const DropdownMenu = () => {
    return (
      <Menu
        selectable
        items={scanItems.map((item, index) => ({
          key: index,
          label: (
            <div key={item.name} onClick={() => setSelectedScan(item.name)}>
              {item.name}
            </div>
          ),
        }))}
      />
    );
  };
  return (
    <ScanReportLayout>
      <div className="top-bar">
        <h1 className="heading">Scan Reports</h1>
        <Dropdown overlay={DropdownMenu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {selectedScan || 'Select Scan'}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="pie-chart-container">
        <PieChart
          totalValue={scanData.total}
          viewBoxSize={[100, 100]}
          radius={42}
          animate
          labelPosition={50}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={() => ({
            fill: 'white',
            fontSize: '5px',
            fontFamily: 'sans-serif',
          })}
          data={[
            {
              title: 'Blacklisted',
              color: red.primary!,
              value: scanData.blacklisted,
            },
            {
              title: 'Whitelisted',
              color: blue.primary!,
              value: scanData.whitelisted,
            },
            {
              title: 'Undecided',
              color: grey.primary!,
              value: scanData.undecided,
            },
          ]}
        />
      </div>
      <div className="stats-bar">
        <Tag icon={<CloseCircleOutlined />} color="red">
          Blacklisted: {scanData.blacklisted}
        </Tag>
        <Tag icon={<CheckCircleOutlined />} color="blue">
          Whitelisted: {scanData.whitelisted}
        </Tag>
        <Tag icon={<InfoCircleOutlined />} color="grey">
          Undecided: {scanData.undecided}
        </Tag>
        <Tag icon={<VerticalAlignBottomOutlined />} color="green">
          Total: {scanData.total}
        </Tag>
      </div>
      <div className="table">
        <Table dataSource={dataSource} columns={columns} sticky />
      </div>
    </ScanReportLayout>
  );
};

export default ScanReports;
