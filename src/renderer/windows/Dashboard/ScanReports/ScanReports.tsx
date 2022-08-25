import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  InfoCircleOutlined,
  VerticalAlignBottomOutlined,
  SyncOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { blue, grey, red } from '@ant-design/colors';

import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  InputRef,
  Menu,
  Popover,
  Radio,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
} from 'antd';
import { ColumnsType, ColumnType } from 'antd/lib/table';
import { PieChart } from 'react-minimal-pie-chart';
import { useRef, useState } from 'react';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'utils/api';
import { useNavigate } from 'react-router-dom';
import { ScanReportLayout } from './ScanReports.styles';

const { TabPane } = Tabs;

enum DashboardViews {
  DEFAULT = 'Default',
  BY_EMPLOYEE = 'By Employee',
}

enum SoftwareFlag {
  blacklisted = 'blacklisted',
  whitelisted = 'whitelisted',
  undecided = 'undecided',
}

const colorCodeMap = {
  whitelisted: blue.primary!,
  blacklisted: red.primary!,
  undecided: grey.primary!,
};

const scanItems = [
  {
    name: 'Scan 1',
  },
  {
    name: 'Scan 2',
  },
  {
    name: 'Scan 3',
  },
];

const ScanReports = () => {
  const [selectedScan, setSelectedScan] = useState(null);
  const [view, setView] = useState<DashboardViews>(DashboardViews.DEFAULT);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [visible, setVisible] = useState(false);
  const [currentScanFilter, setCurrentScanFilterTab] = useState<
    'chronological' | 'date'
  >('chronological');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const {
    mutateAsync: getScanInfo,
    status: getScanInfoStatus,
    data: scanData,
  } = useMutation((body) =>
    api.post('/bolt/scans/info', body, {
      baseURL: 'http://localhost:3000',
    })
  );

  const { status: latestScanStatus } = useQuery(
    ['getLatestScanMeta', view],
    () =>
      api.get('/bolt/scans/latest', {
        baseURL: 'http://localhost:3000',
      }),
    {
      onSuccess: async (res) => {
        if (res.data.data?.id) {
          const config = {
            scanId: res.data.data.id,
            groupBy: view === DashboardViews.BY_EMPLOYEE ? 'employee' : null,
          };
          setSelectedScan(config.scanId);
          await getScanInfo(config as any);
        }
      },
    }
  );

  const { data: scanMeta, status: scanMetaStatus } = useQuery(
    ['getScanMeta'],
    () =>
      api.get('/bolt/scans/latest?limit=6', {
        baseURL: 'http://localhost:3000',
      })
  );

  //   const {} = useMutation(())

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: any) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleTabChange = (key: string) => {
    setCurrentScanFilterTab(key as 'chronological' | 'date');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const ViewsDropdownMenu = () => {
    return (
      <Menu
        selectable
        items={Object.keys(DashboardViews).map((item, index) => ({
          key: index,
          label: (
            <div key={item} onClick={() => setView(DashboardViews[item])}>
              {DashboardViews[item]}
            </div>
          ),
        }))}
      />
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Minion ID',
      dataIndex: 'minion_saltId',
      key: 'minion_saltId',
      ...getColumnSearchProps('minion_saltId'),
      render: (text: any, row: any) => (
        <p
          onClick={() => navigate(`/dashboard/minion/${row.minion_id}`)}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          {text}
        </p>
      ),
    },
    {
      title: 'Software Name',
      dataIndex: 'software_name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Flag',
      dataIndex: 'flag',
      key: 'flag',
      filterSearch: true,
      onFilter: (value, record) => record.flag === value,
      filters: Object.keys(SoftwareFlag).map((i) => ({
        text: <span>{i}</span>,
        value: i,
      })),
    },
    {
      title: 'Operating System',
      dataIndex: 'minion_os',
      key: 'os',
      filterSearch: true,
      onFilter: (value, record) => record.os === value,
      filters: ['Windows', 'Linux'].map((i) => ({
        text: <span>{i}</span>,
        value: i,
      })),
    },
    {
      title: 'Employee Email',
      dataIndex: 'user_email',
      key: 'email',
      ...getColumnSearchProps('employeeEmail'),
    },
  ];

  const byEmployeesViewColumn: ColumnsType<any> = [
    {
      title: 'Employee Email',
      dataIndex: 'user_email',
      key: 'email',
      ...getColumnSearchProps('user_email'),
    },
    {
      title: 'Minion ID',
      dataIndex: 'minion_saltId',
      key: 'minion_saltId',
      ...getColumnSearchProps('minion_saltId'),
      render: (text: any) => <a href="/dashboard">{text}</a>,
    },
    {
      title: 'Operating System',
      dataIndex: 'os',
      key: 'os',
      filterSearch: true,
      onFilter: (value, record) => record.flag === value,
      filters: Object.keys(SoftwareFlag).map((i) => ({
        text: <span>{i}</span>,
        value: i,
      })),
    },
    {
      title: 'Total Apps',
      dataIndex: 'softwareCount_total',
      key: 'total',
      sorter: (a, b) => a.softwareCount_total - b.softwareCount_total,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Whitelisted Apps',
      dataIndex: 'softwareCount_whitelisted',
      key: 'whitelisted',
      sorter: (a, b) =>
        a.softwareCount_whitelisted - b.softwareCount_whitelisted,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Blacklisted Apps',
      dataIndex: 'softwareCount_blacklisted',
      key: 'blacklisted',
      sorter: (a, b) =>
        a.softwareCount_blacklisted - b.softwareCount_blacklisted,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Undecided Apps',
      dataIndex: 'softwareCount_undecided',
      key: 'undecided',
      sorter: (a, b) => a.softwareCount_undecided - b.softwareCount_undecided,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  if (latestScanStatus === 'loading' || scanMetaStatus === 'loading')
    return <Spin size="large" />;

  return (
    <ScanReportLayout>
      <div className="top-bar">
        <div className="row">
          <h1 className="heading">Scan Reports</h1>
          <Button
            type="primary"
            className="refresh-button"
            onClick={() => {
              getScanInfo({
                scanId: selectedScan,
                groupBy:
                  view === DashboardViews.BY_EMPLOYEE ? 'employee' : null,
              } as any);
            }}
          >
            <SyncOutlined />
          </Button>
        </div>
        <Popover
          placement="left"
          content={
            <Tabs
              onChange={handleTabChange}
              defaultValue={currentScanFilter}
              type="card"
            >
              <TabPane
                tab="chronological"
                key="1"
                style={{ maxWidth: '300px' }}
              >
                <Radio.Group
                  value={selectedScan}
                  onChange={(e) => {
                    setSelectedScan(e.target.value);
                    getScanInfo({
                      scanId: e.target.value,
                      groupBy:
                        view === DashboardViews.BY_EMPLOYEE ? 'employee' : null,
                    } as any);
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  {scanMeta?.data.data.length > 0 ? (
                    scanMeta?.data.data.map((item) => (
                      <Radio.Button
                        type="primary"
                        value={item.id}
                        style={{ marginTop: '8px' }}
                      >
                        {moment(item.ran_at).fromNow()}
                      </Radio.Button>
                    ))
                  ) : (
                    <p>No recent scans found</p>
                  )}
                </Radio.Group>
              </TabPane>
              <TabPane tab="date" key="2">
                <DatePicker.RangePicker
                  onChange={(dates) => {
                    // TODO: ADD fetching logic
                  }}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                      moment('00:00:00', 'HH:mm:ss'),
                      moment('11:59:59', 'HH:mm:ss'),
                    ],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
                <Radio.Group
                  value={selectedScan}
                  onChange={(e) => setSelectedScan(e.target.value)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '6px',
                    marginTop: '12px',
                  }}
                >
                  {scanItems.map((item) => (
                    <Radio.Button type="primary" value={item.name}>
                      {item.name}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </TabPane>
            </Tabs>
          }
          onVisibleChange={() => setVisible(!visible)}
          visible={visible}
          title="Select Filters"
          trigger="click"
        >
          <Button>Select Scan Filters</Button>
        </Popover>
      </div>
      {getScanInfoStatus === 'success' ? (
        <>
          {scanData.data.data.data.length > 0 ? (
            <>
              <div className="pie-chart-container">
                <PieChart
                  totalValue={scanData?.data.data.count.total}
                  viewBoxSize={[100, 100]}
                  radius={42}
                  animate
                  data={[
                    {
                      title: 'Blacklisted',
                      color: red.primary!,
                      value: scanData?.data.data.count.blacklisted,
                    },
                    {
                      title: 'Whitelisted',
                      color: blue.primary!,
                      value: scanData?.data.data.count.whitelisted,
                    },
                    {
                      title: 'Undecided',
                      color: grey.primary!,
                      value: scanData?.data.data.count.undecided,
                    },
                  ]}
                />
              </div>
              <div className="stats-bar">
                <Tag icon={<CloseCircleOutlined />} color="red">
                  Blacklisted: {scanData?.data.data.count.blacklisted}
                </Tag>
                <Tag icon={<CheckCircleOutlined />} color="blue">
                  Whitelisted: {scanData?.data.data.count.whitelisted}
                </Tag>
                <Tag icon={<InfoCircleOutlined />} color="grey">
                  Undecided: {scanData?.data.data.count.undecided}
                </Tag>
                <Tag icon={<VerticalAlignBottomOutlined />} color="green">
                  Total: {scanData?.data.data.count.total}
                </Tag>
              </div>
            </>
          ) : (
            <h2 style={{ margin: 'auto' }}>No data available</h2>
          )}

          <div className="table">
            <div className="dropdown">
              <Dropdown overlay={ViewsDropdownMenu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {view}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <Table
              dataSource={
                view === DashboardViews.DEFAULT
                  ? scanData?.data.data.data
                  : scanData?.data.data.data
              }
              columns={
                view === DashboardViews.DEFAULT
                  ? columns
                  : byEmployeesViewColumn
              }
              expandable={
                DashboardViews.BY_EMPLOYEE && {
                  expandedRowRender: (record) => (
                    <>
                      <h3>Softwares</h3>
                      {record.softwares.map((item: any) => (
                        <Tag color={colorCodeMap[item.flag]} key={item.id}>
                          {item.name}
                        </Tag>
                      ))}
                    </>
                  ),
                  rowExpandable: (record) => record.softwares?.length > 0,
                }
              }
              sticky
            />
          </div>
        </>
      ) : (
        <Spin size="large" />
      )}
    </ScanReportLayout>
  );
};

export default ScanReports;
