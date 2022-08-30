import styled from 'styled-components';

export const AddEmpWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80vh;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    box-shadow: -6px 21px 70px -42px rgba(0, 0, 0, 0.36);

    border-radius: 10px;
    /* border: 1px solid grey; */
    width: fit-content;
    width: 450px;
    /* height: 400px; */

    .formSection {
      display: flex;
    }
  }

  .input {
    input {
      width: 100%;
    }
  }

  .ant-row {
    &.ant-form-item-row {
      width: 400px;
    }
  }
  .ant-input {
    &.input {
      width: 400px;
    }
  }
`;
