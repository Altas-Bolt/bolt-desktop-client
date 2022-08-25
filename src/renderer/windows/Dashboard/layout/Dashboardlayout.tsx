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
import { Breadcrumb, Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import Navbar from 'renderer/components/Navbar/navbar';
import { ProtectedRoute } from 'renderer/components/ProtectedRoute';

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

  {
    key: '/dashboard/cmd',
    label: 'cmd',
    icon: <CreditCardOutlined />,
  },
  {
    key: '',
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
  {
    key: '/dashboard/add',
    label: 'Add device',
    icon: <PieChartOutlined />,
  },
];

const Dashboardlayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const scan = useQuery(
  //   ['scanss'],
  //   () => api.post('/api/salt/linux-scan', {}),
  //   { refetchInterval: 30000 }
  // );
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
                onClick={({ key }) => {
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
