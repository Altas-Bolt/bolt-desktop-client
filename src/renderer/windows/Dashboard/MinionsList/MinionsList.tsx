/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Import Modules

import { green, red } from '@ant-design/colors';

import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
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
  { key: 'ghi', status: 'Requested' },
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

// const dropdownOptions = [
//   {
//     key: '1',
//     label: <div>Accept</div>,
//     icon: <CheckCircleOutlined />,
//   },
//   {
//     key: '2',
//     label: <div>Reject</div>,
//     icon: <CloseCircleOutlined />,
//   },
// ];

const MinionsList: React.FC = ({}) => {
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
              style={{
                padding: '20px',
                margin: '10px',
                // borderRadius: '10px',
                // backgroundColor:
                //   item.status.toLowerCase() === 'requested'
                //     ? 'white'
                //     : getOptionColor(item.status as SelectedMinionListType, {
                //         index: 3,
                //       }),
              }}
              onClick={() => {
                navigate(`minion/${item.email}`);
              }}
              actions={
                item.status.toLowerCase() !== 'requested'
                  ? [
                      <Tag
                        color={getOptionColor(
                          item.status as SelectedMinionListType
                        )}
                        style={{
                          borderRadius: '30px',
                        }}
                      >
                        {item.status}
                      </Tag>,
                    ]
                  : [
                      <div
                        style={{
                          fontSize: '30px',
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          width: '100px',
                        }}
                      >
                        <CheckCircleFilled
                          style={{
                            color: green.primary,
                          }}
                        />

                        <CloseCircleFilled
                          style={{
                            color: red.primary,
                          }}
                        />
                      </div>,
                      // <Dropdown
                      //   overlay={<Menu items={dropdownOptions} />}
                      //   disabled={item.status !== 'Requested'}
                      // >
                      //   <Space>
                      //     <p
                      //       style={{
                      //         color:
                      //           item.status === 'Requested'
                      //             ? blue.primary
                      //             : grey.primary,
                      //         margin: 0,
                      //       }}
                      //       onClick={(e) => e.stopPropagation()}
                      //     >
                      //       Action
                      //     </p>
                      //     <DownOutlined />
                      //   </Space>
                      // </Dropdown>,
                    ]
              }
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
