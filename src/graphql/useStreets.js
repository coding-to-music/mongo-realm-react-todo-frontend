import { useRealmApp } from "../RealmApp";
import React from "react";

// TODO: Retrieve the current user's streets and assign it to `streets`
// with refresh when their street list is updated.

function setStreetsFromChange(change, setStreets) {
  const {
    fullDocument: { memberOf },
  } = change;
  setStreets(memberOf);
}

export default function useStreets() {
  const app = useRealmApp();
  const [streets, setStreets] = React.useState(
    app.currentUser.customData.memberOf
  );
  if (!app.currentUser) {
    throw new Error("Cannot list streets if there is no logged in user.");
  }
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  // const users = mongodb.db("tracker").collection("User");
  const streets = mongodb.db("blogr-nextjs-prisma-postgres").collection("street");
  
  // set asynchronous event watcher to react to any changes in the users collection
  React.useEffect(() => {
    let changeWatcher;
    (async () => {
      changeWatcher = streets.watch();
      for await (const change of changeWatcher) {
        setStreetsFromChange(change, setStreets);
      }
    })();

    // close connection when component unmounts
    return () => changeWatcher.return();
  });

  return streets;
}
