import styled from "styled-components";

export const WarningContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 20px;

  align-items: flex-start;
  justify-content: center;
  width: fit-content;
`;

export const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-bottom: 10px;
  color: red;
  font-size: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  height: 40px;
  background-color: #fff;
  color: red;
  border: 1px solid red;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
  padding: 15px;

  border: 1px solid red;
`;

export const AddressListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
`;
export const AddressList = styled.p`
  margin: 0;
  color: red;
`;

export const ErrorIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;
