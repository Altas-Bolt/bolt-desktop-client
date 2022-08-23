import { Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  {
    key: '/dashboard',
    label: 'dashboard',
  },
  {
    key: '/dashboard/minion',
    label: 'minion',
  },
  {
    key: '/dashboard/cmd',
    label: 'cmd',
  },
  {
    key: '/dashboard/minion/register',
    label: 'register',
  },
  {
    key: '/dashboard/profile',
    label: 'profile',
  },
  {
    key: '/dashboard/create_emp',
    label: 'new emp',
  },
];

const Navbar: React.FC = ({}) => {
  const navigate = useNavigate();

  return (
    <Menu
      onClick={(item) => {
        navigate(item.key);
      }}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={navItems}
    />
  );
};

export default Navbar;
