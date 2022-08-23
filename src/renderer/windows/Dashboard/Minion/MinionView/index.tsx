import { Button, List } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { MinionProfile } from 'renderer/components/MinionProfile';

const fake = [{ key: 'abc' }, { key: 'def' }, { key: 'ghi' }].map(
  ({ key }) => ({
    name: `app lis tname_${key}`,
    email: `app lis emiil_${key}`,
    ip: `app lis ip_${key}`,
  })
);
const MinionView: React.FC = () => {
  let { minionId } = useParams();

  return (
    <div>
      <MinionProfile />
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={fake}
        renderItem={(item) => (
          <List.Item actions={[<Button>Remove</Button>]}>
            {/* <Skeleton avatar title={false} loading={item.loading} active> */}
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={`${minionId}--${item.name}`}
              description={item.ip}
            />
            <div>{item.email}</div>
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
    </div>
  );
};
export default MinionView;
