import React from "react";
import styled from "@emotion/styled";
import StatusBadge from "./StreetStatusBadge";

export default function StreetContent({ street }) {
  return (
    <StreetDescription>
      <StreetName>{street.name}</StreetName>
      <StatusBadge status={street.status} />
      <StreetFrom>{street.from}</StreetFrom>
      <StreetTo>{street.to}</StreetTo>
      <StreetWidth>{street.width}</StreetWidth>
      <StreetLength>{street.length}</StreetLength>
      <StreetDate>{street.date}</StreetDate>
      <StreetNoncity>{street.noncity}</StreetNoncity>
      <StreetArea>{street.area}</StreetArea>
      <StreetCreatedAt>{street.created_at}</StreetCreatedAt>
      <StreetUpdatedAt>{street.updated_at}</StreetUpdatedAt>
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

const StreetFrom = styled.span`
  flex-grow: 1;
`;
const StreetTo = styled.span`
  flex-grow: 1;
`;
const StreetWidth = styled.span`
  flex-grow: 1;
`;
const StreetLength = styled.span`
  flex-grow: 1;
`;
const StreetDate = styled.span`
  flex-grow: 1;
`;
const StreetNoncity = styled.span`
  flex-grow: 1;
`;
const StreetArea = styled.span`
  flex-grow: 1;
`;
const StreetCreatedAt = styled.span`
  flex-grow: 1;
`;
const StreetUpdatedAt = styled.span`
  flex-grow: 1;
`;
