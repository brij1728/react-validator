import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  max-width: 800px;
  margin: 40px auto;
`;

export const StyledWarningContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffdd;
  border: 1px solid #ffff88;
  border-radius: 5px;
`;

export const StyledErrorContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #ffdddd;
  border: 1px solid #ff8888;
  border-radius: 5px;
`;
export const StyledResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #ddffdd;
  border: 1px solid #88ff88;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  &.valid {
    background-color: #28a745;
    &:hover {
      background-color: #1e7e34;
    }
  }
`;
