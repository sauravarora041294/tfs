import { firebaseApp } from "./Firebase";

import * as DataTypes from "data/types";
const db = firebaseApp.firestore();

const collections: {
  [refName: string]: firebase.firestore.CollectionReference;
} = {
  USERS: db.collection("Users"),
  PLAYLISTS: db.collection("Playlists"),
  MISSIONS: db.collection("Missions"),
  RESOURCES: db.collection("Resources"),
  NOTIFICATIONS: db.collection("Notifications"),
  CONTENT_REQUESTS: db.collection("ContentRequests"),
  ACTIVITY_NOTIFICATIONS: db.collection("ActivityNotifications"),
  VIEWLOGS: db.collection("ActivityNotifications"),
};

interface RealtimeListenerArgs {
  collection: firebase.firestore.CollectionReference;
  documentId: string;
  callback: (object: DataTypes.DataModelObject) => void;
}

interface RealtimeMultiDocListenerArgs {
  query: firebase.firestore.Query;
  callback: (objects: Array<DataTypes.DataModelObject>) => void;
}

type RealtimeListenerUnsubscribeFunc = () => void;

const listenToDocument = (
  args: RealtimeListenerArgs,
): RealtimeListenerUnsubscribeFunc => {
  return args.collection
    .doc(args.documentId)
    .onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
      args.callback(doc.data() as DataTypes.DataModelObject);
    });
};

const listenToMultipleDocuments = (
  args: RealtimeMultiDocListenerArgs,
): RealtimeListenerUnsubscribeFunc => {
  return args.query.onSnapshot((snap: firebase.firestore.QuerySnapshot) => {
    const docs = snap.docs.map(doc => doc.data() as DataTypes.DataModelObject);
    args.callback(docs);
  });
};

export default { collections, listenToDocument, listenToMultipleDocuments };
