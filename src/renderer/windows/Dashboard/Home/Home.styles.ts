import { blue, grey } from '@ant-design/colors';
import styled from 'styled-components';

export const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
    overflow-y: auto;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    /* box-shadow: 10px 7px 45px -15px #f5f5f5;
     */
  }

  .heading {
    font-size: 1.8rem;
  }

  .container {
    box-shadow: 4px 9px 17px 0px rgba(0, 0, 0, 0.36);
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
    max-height: 400px;

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
    border: 1px solid #e35959;
    color: #e35959;
    background-color: ${() => '#FFF0EF'};
    /* background-color: #f5f5f5; */

    border-radius: 10px;
    /* min-height: 120px; */
    padding: 0.5rem;

    .tag {
      box-shadow: -6px 21px 74px 4px rgba(0, 0, 0, 0.36);
      background-color: #fff;
      display: flex;
      flex-direction: column;
      width: 80px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

      .icon {
        /* align-self: center; */
        margin: auto 0;
      }

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
      flex-grow: 1;
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

      &:first-child {
        width: 50%;
      }

      &:last-child {
        border-right: none;
      }

      p {
        margin: 0;
        margin-left: 1rem;
      }

      .key {
        /* text-align: center; */
        font-weight: bold;
      }
    }
  }
`;
