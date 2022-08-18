import { DownOutlined } from '@ant-design/icons';
import { Dropdown, List, Menu, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterText } from './MinionsList.styles';

const fake = [{ key: 'abc' }, { key: 'def' }, { key: 'ghi' }].map(
  ({ key }) => ({
    name: `name_${key}`,
    email: `emiil_${key}`,
    ip: `ip_${key}`,
  })
);

export enum SelectedMinionListEnum {
  All = 'All',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Requested = 'Requested',
}
export type SelectedMinionListType = keyof typeof SelectedMinionListEnum;

const MinionsList: React.FC = ({}) => {
  const [seletctedFilter, setSeletctedFilter] =
    useState<SelectedMinionListType>(SelectedMinionListEnum.All);
  const navigate = useNavigate();

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
                        setSeletctedFilter(item as SelectedMinionListType);
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
            selectedOption={seletctedFilter}
            className="menuText"
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              {seletctedFilter}
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
          dataSource={fake}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                navigate(`minion/${item.email}`);
              }}
              actions={[
                <a key="list-loadmore-edit">edit</a>,
                <a key="list-loadmore-more">more</a>,
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
