import { ObjectId } from "bson";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function useStreetMutations(project) {
  return {
    addStreet: useAddStreet(project),
    updateStreet: useUpdateStreet(project),
    deleteStreet: useDeleteStreet(project),
  };
}

// name
// from
// to
// width
// length
// date
// noncity
// area
// created_at
// updated_at

// TODO: Add the GraphGL mutation for adding a street.
const AddStreetMutation = gql`
  mutation AddStreet($street: StreetInsertInput!) {
    addedStreet: insertOneStreet(data: $street) {
      _id
      _partition
      name
      from
      to
      width
      length
      date
      noncity
      area
      created_at
      updated_at
      status
    }
  }
`;

// TODO: Add the GraphGL mutation for updating a street.
const UpdateStreetMutation = gql`
  mutation UpdateStreet($streetId: ObjectId!, $updates: StreetUpdateInput!) {
    updatedStreet: updateOneStreet(query: { _id: $streetId }, set: $updates) {
      _id
      _partition
      name
      from
      to
      width
      length
      date
      noncity
      area
      updated_at
      status
    }
  }
`;

// TODO: Add the GraphGL mutation for deleting a street.
const DeleteStreetMutation = gql`
  mutation DeleteStreet($streetId: ObjectId!) {
    deletedStreet: deleteOneStreet(query: { _id: streetId }) {
      _id
      _partition
      name
      status
    }
  }
`;

const StreetFieldsFragment = gql`
  fragment StreetFields on Street {
    _id
    _partition
    name
    from
    to
    width
    length
    date
    noncity
    area
    created_at
    updated_at
    status
  }
`;

function useAddStreet(project) {
  const [addStreetMutation] = useMutation(AddStreetMutation, {
    // Manually save added Streets into the Apollo cache so that Street queries automatically update
    // For details, refer to https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    update: (cache, { data: { addedStreet } }) => {
      cache.modify({
        fields: {
          streets: (existingStreets = []) => [
            ...existingStreets,
            cache.writeFragment({
              data: addedStreet,
              fragment: StreetFieldsFragment,
            }),
          ],
        },
      });
    },
  });

  const addStreet = async (street) => {
    // TODO: Use the functions returned from the addStreetMutation hook to execute the
    // mutation.
    const { addedStreet } = await addStreetMutation({
      variables: {
        street: {
          _id: new ObjectId(),
          _partition: project.partition,
          status: "Open",
          ...street,
        },
      },
    });
    return addedStreet;
  };

  return addStreet;
}

function useUpdateStreet(project) {
  const [updateStreetMutation] = useMutation(UpdateStreetMutation);
  // TODO: Use the functions returned from the updateStreetMutation to execute the
  // mutation.
  const updateStreet = async (street, updates) => {
    const { updatedStreet } = await updateStreetMutation({
      variables: { streetId: street._id, updates },
    });
    return updatedStreet;
  };
  return updateStreet;
}

function useDeleteStreet(project) {
  const [deleteStreetMutation] = useMutation(DeleteStreetMutation);
  // TODO: Use the functions returned from the deleteStreetMutation to execute the
  // mutation.
  const deleteStreet = async (street) => {
    const { deletedStreet } = await deleteStreetMutation({
      variables: { streetId: street._id },
    });
    return deletedStreet;
  };
  return deleteStreet;
}
