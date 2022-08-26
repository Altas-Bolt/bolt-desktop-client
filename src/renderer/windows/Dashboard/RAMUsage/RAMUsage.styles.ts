import styled from 'styled-components';

export const RAMUsageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .heading {
    font-size: 1.8rem;
  }

  .terminal {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: green;
    background-color: black;
    padding: 1rem;
  }
`;
