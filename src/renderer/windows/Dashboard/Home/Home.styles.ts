import { blue, grey } from '@ant-design/colors';
import styled from 'styled-components';

export const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .header {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-top: 1rem;
  }

  .recents-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
  }

  .heading {
    font-size: 1.8rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 30px;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: fit-content;
    height: 100%;

    .avatar {
      align-self: center;
    }
  }

  .info_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .section {
    margin: 10px 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .alert-card {
    display: flex;
    flex-direction: row;
    background-color: ${() => '#e35959'};
    /* background-color: #f5f5f5; */

    border-radius: 10px;
    min-height: 120px;
    padding: 1rem;

    .tag {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      width: 80px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

      .day {
        color: ${() => grey.primary};
        font-size: 1rem;
        margin: 0;
      }

      .date {
        font-size: 1.6rem;
        color: #000;
        margin: 0;
      }
    }

    .meta {
      display: flex;
      align-items: center;
      margin-left: 2rem;
    }

    .action {
      display: flex;
      align-items: center;
      flex-grow: 1;
      justify-content: flex-end;
    }

    .data {
      border-right: 0.5px solid #fff;
      display: flex;
      flex-direction: column;

      &:last-child {
        border-right: none;
      }

      p {
        margin: 0 1rem;
      }

      /* align-items: center; */

      .key {
        /* text-align: center; */
        font-weight: bold;
      }
    }
  }
`;
