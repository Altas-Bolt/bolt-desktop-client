// Import Modules

import { green, red } from '@ant-design/colors';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dropdown, List, Menu, message, Space, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'utils/api';

// Import Styles
import { FilterText, getOptionColor } from './MinionsList.styles';

export enum SelectedMinionListEnum {
  All = 'All',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Requested = 'Requested',
}

const remapAndFilterKeys = (
  filter: SelectedMinionListType,
  dataSource: {
    acceptedKeys: string[];
    deniedKeys: string[];
    unacceptedKeys: string[];
    rejectedKeys: string[];
  }
): {
  key: string;
  status: SelectedMinionListEnum;
}[] => {
  const mappedSource = {
    acceptedKeys: dataSource.acceptedKeys.map((key) => ({
      key,
      status: SelectedMinionListEnum.Accepted,
    })),
    rejectedKeys: dataSource.rejectedKeys.map((key) => ({
      key,
      status: SelectedMinionListEnum.Rejected,
    })),
    deniedKeys: dataSource.rejectedKeys.map((key) => ({
      key,
      status: SelectedMinionListEnum.Rejected,
    })),
    unacceptedKeys: dataSource.unacceptedKeys.map((key) => ({
      key,
      status: SelectedMinionListEnum.Requested,
    })),
  };
  console.log('mappedSource', mappedSource);
  let data: {
    key: string;
    status: SelectedMinionListEnum;
  }[] = [];

  switch (filter) {
    case SelectedMinionListEnum.All:
      data = [...Object.values(mappedSource).flat()];
      break;
    case SelectedMinionListEnum.Accepted:
      data = [...mappedSource['acceptedKeys']];
      break;
    case SelectedMinionListEnum.Rejected:
      data = [...mappedSource['deniedKeys'], ...mappedSource['rejectedKeys']];
      break;
    case SelectedMinionListEnum.Requested:
      data = [...mappedSource['unacceptedKeys']];
      break;
  }
  return data;
};

export type SelectedMinionListType = keyof typeof SelectedMinionListEnum;

const MinionsList: React.FC = ({}) => {
  const [selectedFilter, setSelectedFilter] = useState<SelectedMinionListType>(
    SelectedMinionListEnum.All
  );

  const {
    isLoading,
    isError,
    error,
    data,
    refetch: refetchKeys,
  } = useQuery(['keys'], () =>
    api.get('/api/salt/keys').then((res) => res.data)
  );

  const acceptKeyApi = useMutation(
    ({ keys }: { keys: string[] | 'All' }) =>
      api.post('/api/salt/keys/accept', { keys }).then((res) => res.data),
    {
      onSuccess: () => {
        message.success('Key accepted');
        refetchKeys();
      },
      onError: (err) => {
        message.success('Failed to accept keys');
        console.error('[Accept keys]', err);
      },
    }
  );
  const navigate = useNavigate();
  const rejectKeyApi = useMutation(
    ({ keys }: { keys: string[] | 'All' }) =>
      api.post('/api/salt/keys/reject', { keys }).then((res) => res.data),
    {
      onSuccess: () => {
        message.info('Key Rejected');
        refetchKeys();
      },
      onError: (err) => {
        message.success('Failed to accept keys');
        console.error('[Reject keys]', err);
      },
    }
  );

  useEffect(() => {
    if (!error) return;
    console.error('[GET ALL KEYS]', error);
  }, [error]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
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
          dataSource={remapAndFilterKeys(selectedFilter, data.data)}
          renderItem={(item) => (
            <List.Item
              style={{
                cursor: 'pointer',
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
                navigate(`/dashboard/minion/${item.key}`);
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
                          onClick={(e) => {
                            e.stopPropagation();
                            acceptKeyApi.mutate({
                              keys: [item.key],
                            });
                          }}
                          style={{
                            color: green.primary,
                          }}
                        />

                        <CloseCircleFilled
                          onClick={(e) => {
                            e.stopPropagation();
                            rejectKeyApi.mutate({
                              keys: [item.key],
                            });
                          }}
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
              <List.Item.Meta title={item.key} description={item.key} />
              {/* <div>{item.email}</div> */}
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MinionsList;
{
  /* <List
className="demo-loadmore-list"
// loading={initLoading}
itemLayout="horizontal"
// loadMore={loadMore}
dataSource={getFilteredData(selectedFilter, data)}
renderItem={(item) => (
  <List.Item
    style={{
      cursor: 'pointer',
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{
                  color: green.primary,
                }}
              />

              <CloseCircleFilled
                onClick={(e) => {
                  e.stopPropagation();
                }}
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
    {/* <Skeleton avatar title={false} loading={item.loading} active> */
}
//     <List.Item.Meta
//       // avatar={<Avatar src={item.picture.large} />}
//       title={item.name}
//       description={item.ip}
//     />
//     <div>{item.email}</div>
//     {/* </Skeleton> */}
//   </List.Item>
// )}
// /> */}
