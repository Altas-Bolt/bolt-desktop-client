// Import Modules
import {
  CreditCardOutlined,
  HomeOutlined,
  KeyOutlined,
  LaptopOutlined,
  PieChartOutlined,
  ProfileOutlined,
  ThunderboltOutlined,
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
    key: '/dashboard/scans',
    label: 'Scan Reports',
    icon: <PieChartOutlined />,
  },
  {
    key: '/dashboard/add',
    label: 'Link device',
    icon: <LaptopOutlined />,
  },
];

const Dashboardlayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <DashboardlayoutWrapper>
        <Layout style={{ height: '100vh' }}>
          {/* <Header className="header">
            <div className="logo" />
            {/* <Navbar /> */}
          {/* </Header> */}
          <Layout>
            <Sider width={200} className="site-layout-background">
              <div className="logo-container">
                <h1>Bolt.</h1>
              </div>
              <Menu
                theme="dark"
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
            <Layout className="bg" style={{ padding: '0 24px 24px' }}>
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
                        style={{
                          color: '#1980ff',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
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
