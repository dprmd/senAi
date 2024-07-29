import { config } from "dotenv";
config();
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
} from "firebase/firestore";
import { v4 } from "uuid";
import { comparePassword } from "../lib/utils.js";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const collectionName = "users";

export const addNewUserToFirestore = async (req, res) => {
  const { deviceName, lastSeen } = req.body;
  const newUserId = v4();
  const userRef = doc(firestore, collectionName, newUserId);
  try {
    await setDoc(userRef, {
      userId: newUserId,
      name: "Unknown",
      deviceName,
      chats: [],
      backupChats: [],
      lastSeen,
      seenHistory: [],
    });
    res.status(201).json({ status: 201, newUserId });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const getAllChatsFromFirestore = async (req, res) => {
  const { userId } = req.body;
  const userRef = doc(firestore, collectionName, userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      res.status(200).json({ status: 200, chats: userSnap.data().chats });
    } else {
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const addNewChatsToFirestore = async (req, res) => {
  const { userId, newChatFromUser, newChatFromAi } = req.body;
  const userRef = doc(firestore, collectionName, userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        chats: arrayUnion(newChatFromUser, newChatFromAi),
        backupChats: arrayUnion(newChatFromUser, newChatFromAi),
      });
      res.status(201).json({ status: 201, message: "Chats added" });
    } else {
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const deleteAllChatsInFirestore = async (req, res) => {
  const { userId } = req.body;
  try {
    const userRef = doc(firestore, collectionName, userId);
    await updateDoc(userRef, {
      chats: [],
    });
    res.status(202).json({ status: 202, message: "Delete All Chats" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const deleteSomeChatsInFirestore = async (req, res) => {
  const { userId, someChats } = req.body;

  try {
    const userRef = doc(firestore, collectionName, userId);
    await updateDoc(userRef, {
      chats: someChats,
    });
    res
      .status(201)
      .json({ status: 202, message: "Delete Some Chats You Selected" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const getName = async (req, res) => {
  const { userId } = req.body;
  const userRef = doc(firestore, collectionName, userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      res.status(200).json({ status: 200, name: userSnap.data().name });
    } else {
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const updateName = async (req, res) => {
  const { userId, newName } = req.body;
  const userRef = doc(firestore, collectionName, userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        name: newName,
      });
      res
        .status(202)
        .json({ status: 202, message: `Name update to ${newName}`, newName });
    } else {
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    // TODO benarkan kode
    res.status(500).json({ status: 500, error });
  }
};

export const uploadSeenHistory = async (req, res) => {
  const { userId, lastSeen } = req.body;
  const userRef = doc(firestore, collectionName, userId);
  try {
    await updateDoc(userRef, {
      lastSeen,
      seenHistory: arrayUnion(lastSeen),
    });
    // TODO benarkan kode
    res.status(201).json({ status: 201, message: "Seen History Updated" });
  } catch (error) {
    // TODO benarkan kode
    res.status(500).json({ status: 500, error });
  }
};

export const getPermissionToDeleteAllData = async (req, res) => {
  const { securityCode } = req.body;
  const passwordRef = doc(firestore, "password", "passwordDeleteAllData");
  try {
    const passwordSnap = await getDoc(passwordRef);

    if (passwordSnap.exists()) {
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;
      const compareResult = comparePassword(securityCode, encryptedPassword);
      if (compareResult) {
        res.status(202).json({ status: 202, allow: true });
      } else {
        res.status(405).json({ status: 405, allow: false });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const deleteAllDataInFirestore = async (req, res) => {
  const { userId, securityCode, option } = req.body;
  const passwordRef = doc(firestore, "password", "passwordDeleteAllData");
  const userRef = doc(firestore, collectionName, userId);
  try {
    const passwordSnap = await getDoc(passwordRef);
    const userSnap = await getDoc(userRef);
    const whichDelete = {};

    if (passwordSnap.exists()) {
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;
      const compareResult = comparePassword(securityCode, encryptedPassword);
      if (compareResult) {
        if (userSnap.exists()) {
          if (option.withChats) {
            whichDelete.chats = [];
          }
          if (option.withBackupChats) {
            whichDelete.backupChats = [];
          }
          if (option.withLastSeenHistory) {
            whichDelete.lastSeen = "";
            whichDelete.seenHistory = [];
          }
          await updateDoc(userRef, whichDelete);
          res.status(202).json({
            status: 202,
            whichDelete: {
              chats: option.withChats,
              backupChats: option.withBackupChats,
              lastSeenHistory: option.withLastSeenHistory,
            },
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `No Such Document Match With ${userId}`,
          });
        }
      } else {
        res.status(405).json({ status: 405, message: "Wrong Security Code" });
      }
    } else {
      res.status(404).json({
        state: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};
