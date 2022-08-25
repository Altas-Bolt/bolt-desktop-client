// Import Modules
import {
  CreditCardOutlined,
  HomeOutlined,
  KeyOutlined,
  LaptopOutlined,
  PieChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import Navbar from 'renderer/components/Navbar/navbar';
import { ProtectedRoute } from 'renderer/components/ProtectedRoute';
import { api } from 'utils/api';

// Import Styles
import { DashboardlayoutWrapper } from './Dashboardlayout.styles';

const { Header, Content, Sider } = Layout;

const items2 = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    key: '/dashboard/keys',
    label: 'Keys',
    icon: <KeyOutlined />,
  },
  // {
  //   key: '/dashboard/minion',
  //   label: 'minion',
  //   icon:
  // },
  {
    key: '/dashboard/cmd',
    label: 'cmd',
    icon: <CreditCardOutlined />,
  },
  {
    key: '/dashboard/minion/register',
    label: 'register',
    icon: <LaptopOutlined />,
    children: [
      {
        key: '/dashboard/minion/register',
        label: 'Add minion',
        icon: <LaptopOutlined />,
      },
      {
        key: '/dashboard/create_emp',
        label: 'Add employee',
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: '/dashboard/profile',
    label: 'profile',
    icon: <ProfileOutlined />,
  },
  {
    key: '/dashboard/scans',
    label: 'Scan Reports',
    icon: <PieChartOutlined />,
  },
];

// const items2: MenuProps['items'] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const Dashboardlayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scan = useQuery(
    ['scanss'],
    () => api.post('/api/salt/linux-scan', {}),
    { refetchInterval: 30000 }
  );
  return (
    <ProtectedRoute>
      <DashboardlayoutWrapper>
        <Layout style={{ height: '100vh' }}>
          <Header className="header">
            <div className="logo" />
            {/* <Navbar /> */}
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items2}
                onClick={({ item, key }) => {
                  navigate(key);
                }}
              />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {location.pathname
                  .split('/')
                  .splice(1)
                  .reduce<
                    {
                      pathname: string;
                      label: string;
                    }[]
                  >((prev, curr) => {
                    const n = [...prev];
                    n.push({
                      pathname:
                        prev.length > 0
                          ? prev[prev.length - 1].pathname + `/${curr}`
                          : `/${curr}`,
                      label: curr,
                    });
                    return n;
                  }, [])
                  .map(({ pathname, label }) => (
                    <Breadcrumb.Item key={label}>
                      <a
                        href={pathname}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(pathname);
                        }}
                      >
                        {label}
                      </a>
                    </Breadcrumb.Item>
                  ))}
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  overflowY: 'auto',
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </DashboardlayoutWrapper>
    </ProtectedRoute>
  );
};

export default Dashboardlayout;
