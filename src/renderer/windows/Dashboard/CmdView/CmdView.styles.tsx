/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const CmdViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  .upper > * {
    flex: 1 1 auto;
    border: 1px red solid;
    text-align: center;

    margin: 5px;
  }
`;
