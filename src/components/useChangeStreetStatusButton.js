import React from "react";
import styled from "@emotion/styled";
import LGButton from "@leafygreen-ui/button";
import StatusChange from "./StreetStatusChange";
import useStreetMutations from "../graphql/useStreetMutations";

// Use a hook to dynamically create status update buttons for the specified project
export default function useChangeStreetStatusButton(project) {
  const { updateStreet } = useStreetMutations(project);
  const ChangeStreetStatusButton = ({ Street, fromStatus, toStatus, children }) => {
    return (
      <Button onClick={() => updateStreet(street, { status: toStatus })}>
        <ButtonContent>
          {children}
          <StatusChange from={fromStatus} to={toStatus} />
        </ButtonContent>
      </Button>
    );
  };
  return ChangeStreetStatusButton;
}

const Button = styled(LGButton)`
  height: 100%;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 8px;
`;
