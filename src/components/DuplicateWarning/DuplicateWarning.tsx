import {
  AddressContainer,
  AddressList,
  AddressListContainer,
  Button,
  ButtonGroup,
  ErrorIcon,
  Header,
  WarningContainer,
} from "./DuplicateWarningStyles";

import { DuplicateAddressWarning } from "../../types";

interface Props {
  warnings: DuplicateAddressWarning;
  onKeepFirstOne: () => void;
  onCombineBalances: () => void;
}

export const DuplicateWarning: React.FC<Props> = ({
  warnings,
  onKeepFirstOne,
  onCombineBalances,
}) => (
  <WarningContainer>
    <Header>
      <p>Duplicate</p>
      <ButtonGroup>
        <Button onClick={onKeepFirstOne}>Keep First One</Button>
        <Button onClick={onCombineBalances}>Combine Balance</Button>
      </ButtonGroup>
    </Header>
    <AddressContainer>
      <ErrorIcon>!</ErrorIcon>
      <AddressListContainer>
        {Object.entries(warnings).map(([address, lineNumbers]) => (
          <AddressList key={address}>
            Address {address} encountered duplicate in line:{" "}
            {lineNumbers.join(", ")}
          </AddressList>
        ))}
      </AddressListContainer>
    </AddressContainer>
  </WarningContainer>
);
