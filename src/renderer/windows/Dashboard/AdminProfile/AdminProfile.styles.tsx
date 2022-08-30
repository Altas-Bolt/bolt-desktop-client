import styled from 'styled-components';

export const AdminProfileWrapper = styled.div`
  margin: 20px;

  .container {
    display: flex;
    margin: 20px;
  }
  .info_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f5f5f5;

    border-radius: 30px;
    padding: 10px 40px;
  }
  .section {
    margin: 10px 20px;
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

  .logoutBtn {
    margin: 10px 40px;
  }
`;
