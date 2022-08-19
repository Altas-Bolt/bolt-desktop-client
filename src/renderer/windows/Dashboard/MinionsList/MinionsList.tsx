/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Import Modules
import { blue } from '@ant-design/colors';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Dropdown, List, Menu, Space, Spin, Tag } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMinionListHelper from 'renderer/hooks/useMinionListHelper';

// Import Styles
import { FilterText, getOptionColor } from './MinionsList.styles';

export const fake = [
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

const DropdownMenu: React.FC<{
  onClickViewProfile: () => void;
  status: SelectedMinionListType;
}> = ({ onClickViewProfile, status }) => {
  return (
    <Menu style={{ width: 150 }}>
      <Menu.Item
        icon={<CheckCircleOutlined />}
        disabled={status !== 'Requested'}
      >
        Accept
      </Menu.Item>
      <Menu.Item
        icon={<CloseCircleOutlined />}
        disabled={status !== 'Requested'}
      >
        Reject
      </Menu.Item>
      <Menu.Item icon={<ProfileOutlined />} onClick={onClickViewProfile}>
        View Profile
      </Menu.Item>
    </Menu>
  );
};
const MinionsList: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<SelectedMinionListType>(
    SelectedMinionListEnum.All
  );
  const navigate = useNavigate();

  const { filterData, saltKeys, status } = useMinionListHelper();

  if (status === 'loading') {
    return <Spin size="large" />;
  }

  if (status === 'error') {
    return <div>Error</div>;
  }

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
              onClick={() => {}}
              actions={[
                <Tag
                  color={getOptionColor(item.status as SelectedMinionListType)}
                >
                  {item.status}
                </Tag>,
                <Dropdown
                  overlay={
                    <DropdownMenu
                      status={item.status as SelectedMinionListType}
                      onClickViewProfile={() =>
                        navigate(`minion/${item.email}`)
                      }
                    />
                  }
                >
                  <Space>
                    <p style={{ margin: 0, color: blue.primary }}>Action</p>
                    <DownOutlined />
                  </Space>
                </Dropdown>,
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
