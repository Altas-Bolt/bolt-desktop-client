import styled from 'styled-components';

export const MinionProfileWrapper = styled.div`
  margin: 20px;

  .container {
    display: flex;
    margin: 20px;
  }
  .info_container {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f5f5f5;
    margin: 10px 20px;
    padding: 10px 40px;
    border-radius: 30px;
  }
  h1.name {
    font-size: 25px;
    margin: 0px 10px;
  }
  .info {
    /* width: 50%; */
    padding: 10px 0;
    display: flex;

    .section {
      margin: 0px 10px;
    }

    h1 {
      font-size: 15px;
    }

    h1.ip {
      font-style: italic;
    }
  }
`;
