/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const DashboardlayoutWrapper = styled.div`
  height: 100vh;

  .logo-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #001628;
    padding: 1rem 0;

    h1 {
      color: #1990ff;
      font-size: 2rem;
      text-align: center;
      font-weight: bold;
    }
  }

  #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }

  .site-layout-background {
    background: #fff;
    border-radius: 10px;
  }

  .bg {
    background: white;
  }

  .bread-text {
    color: #fff;
  }
`;
