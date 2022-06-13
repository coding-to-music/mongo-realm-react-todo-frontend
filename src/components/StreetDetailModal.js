import React from "react";
import StreetContent from "./StreetContent";
import Modal from "@leafygreen-ui/modal";
import ButtonGroup from "./ButtonGroup";
import useChangeStreetStatusButton from "./useChangeStreetStatusButton";

export default function StreetDetailModal({ project, street, unselectStreet }) {
  const ChangeStreetStatusButton = useChangeStreetStatusButton(project);
  return (
    <Modal
      open={Boolean(street)} // Show the modal if we passed a Street into the street prop.
      setOpen={unselectStreet} // When the user tries to close the modal, unset the Street to stop showing the modal
    >
      {street && (
        <>
          <StreetContent street={street} />
          <ButtonGroup direction="row">
            {street.status === "Open" && (
              <ChangeStreetStatusButton
                street={street}
                fromStatus="Open"
                toStatus="InProgress"
              >
                Start Progress
              </ChangeStreetStatusButton>
            )}
            {street.status === "InProgress" && (
              <>
                <ChangeStreetStatusButton
                  street={street}
                  fromStatus="InProgress"
                  toStatus="Open"
                >
                  Stop Progress
                </ChangeStreetStatusButton>
                <ChangeStreetStatusButton
                  street={street}
                  fromStatus="InProgress"
                  toStatus="Complete"
                >
                  Complete Street
                </ChangeStreetStatusButton>
              </>
            )}
            {street.status === "Complete" && (
              <ChangeStreetStatusButton
                street={street}
                fromStatus="Complete"
                toStatus="InProgress"
              >
                Resume Street
              </ChangeStreetStatusButton>
            )}
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
}
