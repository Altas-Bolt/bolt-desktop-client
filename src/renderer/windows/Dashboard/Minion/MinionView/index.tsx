import { useQuery } from '@tanstack/react-query';
import { Button, Input, List, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MinionProfile } from 'renderer/components/MinionProfile';
import { IMinionAppListItem } from 'types/types';
import { api } from 'utils/api';

const MinionView: React.FC = () => {
  const [appList, setAppList] = useState<IMinionAppListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  let { minion_key } = useParams();

  const { data, error, isLoading } = useQuery(['minion', minion_key], () =>
    api
      .get(`/bolt/softwares/minion?saltId=${minion_key}`)
      .then((res) => res.data)
  );

  const handleChange = (e: string) => {
    console.log('e', e);
    // setSearchQuery(e)
  };

  // const onSearchDebounced = useMemo(() => {
  //   return debounce(handleChange, 300);
  // }, []);

  useEffect(() => {
    if (error) {
      console.error('[GET MINION BY ID], no data field sent by server ');
    }
  }, [error]);

  useEffect(() => {
    console.log('getScanData', data?.data.data);
    if (!data) return;
    setAppList(data?.data.data);
  }, [data]);

  if (isLoading) {
    return <Spin size="large" />;
  }
  if (!data) return null;

  return (
    <div>
      <MinionProfile />
      <Input.Search
        placeholder="input search text"
        onSearch={handleChange}
        style={{ width: 200 }}
      />
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={appList.filter((app: IMinionAppListItem) => {
          if (!searchQuery) return true;

          return (
            app.software_name
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) >= 0
          );
          // app.software_name.toLowerCase().indexOf(input.toLowerCase()) >= 0
        })}
        renderItem={(item: IMinionAppListItem) => (
          <List.Item actions={[<Button>Remove</Button>]}>
            {/* <Skeleton avatar title={false} loading={item.loading} active> */}
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={item.software_name}
              description={item.software_flag}
            />
            {/* <div>{item.email}</div> */}
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
    </div>
  );
};
export default MinionView;
