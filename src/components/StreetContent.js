import React from "react";
import styled from "@emotion/styled";
import StatusBadge from "./StreetStatusBadge";

export default function StreetContent({ street }) {
  return (
    <StreetDescription>
      <StreetName>{street.name}</StreetName>
      <StatusBadge status={street.status} />
    </StreetDescription>
  );
}

const StreetDescription = styled.div`
  display: flex;
  width: 100%;
`;
const StreetName = styled.span`
  flex-grow: 1;
`;
