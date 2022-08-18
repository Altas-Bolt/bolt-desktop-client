/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Import Modules
import { blue, grey } from '@ant-design/colors';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Dropdown, List, Menu, Space, Tag } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Styles
import { FilterText, getOptionColor } from './MinionsList.styles';

const fake = [
  { key: 'abc', status: 'Accepted' },
  { key: 'def', status: 'Rejected' },
  { key: 'ghi', status: 'Requested' },
].map(({ key, status }) => ({
  name: `name_${key}`,
  email: `email_${key}`,
  ip: `ip_${key}`,
  status,
}));

export enum SelectedMinionListEnum {
  All = 'All',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Requested = 'Requested',
}
export type SelectedMinionListType = keyof typeof SelectedMinionListEnum;

const dropdownOptions = [
  {
    key: '1',
    label: <div>Accept</div>,
    icon: <CheckCircleOutlined />,
  },
  {
    key: '2',
    label: <div>Reject</div>,
    icon: <CloseCircleOutlined />,
  },
];

const MinionsList: React.FC = ({}) => {
  const [selectedFilter, setSelectedFilter] = useState<SelectedMinionListType>(
    SelectedMinionListEnum.All
  );
  const navigate = useNavigate();

  const filterData = (
    data: typeof fake,
    status: SelectedMinionListType = 'All'
  ) => {
    if (status === 'All') return data;

    return data.filter((item) => item.status === status);
  };

  return (
    <div>
      <div>
        <Dropdown
          overlay={() => {
            return (
              <Menu
                items={Object.keys(SelectedMinionListEnum).map((item, i) => ({
                  label: (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedFilter(item as SelectedMinionListType);
                      }}
                    >
                      {item}
                    </a>
                  ),
                  key: i.toString(),
                }))}
              />
            );
          }}
        >
          <FilterText
            selectedOption={selectedFilter}
            className="menuText"
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              {selectedFilter}
              <DownOutlined />
            </Space>
          </FilterText>
        </Dropdown>
      </div>
      <div>
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={filterData(fake, selectedFilter)}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                navigate(`minion/${item.email}`);
              }}
              actions={[
                // <a key="list-loadmore-edit">edit</a>,
                <Tag
                  color={getOptionColor(item.status as SelectedMinionListType)}
                >
                  {item.status}
                </Tag>,
                <Dropdown
                  overlay={<Menu items={dropdownOptions} />}
                  disabled={item.status !== 'Requested'}
                >
                  <Space>
                    <p
                      style={{
                        color:
                          item.status === 'Requested'
                            ? blue.primary
                            : grey.primary,
                        margin: 0,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Action
                    </p>
                    <DownOutlined />
                  </Space>
                </Dropdown>,
                // <a key="list-loadmore-more">more</a>,
              ]}
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={item.name}
                description={item.ip}
              />
              <div>{item.email}</div>
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MinionsList;
