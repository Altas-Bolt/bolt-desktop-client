import styled from 'styled-components';

export const ScanReportLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #000;
  overflow-y: auto;

  .top-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    .heading {
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .pie-chart-container {
    display: flex;
    width: 100%;
    justify-content: center;

    svg {
      width: 300px;
      height: 300px;
    }
  }

  .stats-bar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #000;
  }

  .table {
    width: 100%;
    margin-top: 32px;
  }
`;
