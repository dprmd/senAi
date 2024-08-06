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
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { comparePassword } from "../lib/utils.js";
import fs from "fs";
import path from "path";

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
const storage = getStorage();

export const addNewUserToFirestore = async (req, res) => {
  const { deviceName, lastSeen } = req.body;
  const newUserId = v4();
  const userRef = doc(firestore, "users", newUserId);
  try {
    // create default document in users collection
    await setDoc(doc(firestore, "users", newUserId), {
      userId: newUserId,
      name: "Unknown",
      deviceName,
      lastSeen,
      seenHistory: [],
    });
    // create chats document in chats collection
    await setDoc(doc(firestore, "chats", newUserId), {
      owned: newUserId,
      chats: [],
    });
    // create backupChats document in backupChats collection
    await setDoc(doc(firestore, "backupChats", newUserId), {
      owned: newUserId,
      backupChats: [],
    });
    res.status(201).json({ status: 201, newUserId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const getAllChatsFromFirestore = async (req, res) => {
  const { userId } = req.body;
  const chatsRef = doc(firestore, "chats", userId);
  try {
    const userSnap = await getDoc(chatsRef);

    if (userSnap.exists()) {
      res.status(200).json({ status: 200, chats: userSnap.data().chats });
    } else {
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const addNewChatsToFirestore = async (req, res) => {
  const { userId, newChatFromUser, newChatFromAi } = req.body;
  const chatsRef = doc(firestore, "chats", userId);
  const backupChatsRef = doc(firestore, "backupChats", userId);
  try {
    const chatsSnap = await getDoc(chatsRef);
    const backupChatsSnap = await getDoc(backupChatsRef);

    if (chatsSnap.exists() && backupChatsSnap.exists()) {
      await updateDoc(chatsRef, {
        chats: arrayUnion(newChatFromUser, newChatFromAi),
      });
      await updateDoc(backupChatsRef, {
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
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const deleteAllChatsInFirestore = async (req, res) => {
  const { userId } = req.body;
  try {
    const chatsRef = doc(firestore, "chats", userId);
    await updateDoc(chatsRef, {
      chats: [],
    });
    res.status(202).json({ status: 202, message: "Delete All Chats" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const deleteSomeChatsInFirestore = async (req, res) => {
  const { userId, someChats } = req.body;

  try {
    const chatsRef = doc(firestore, "chats", userId);
    await updateDoc(chatsRef, {
      chats: someChats,
    });
    res
      .status(201)
      .json({ status: 202, message: "Delete Some Chats You Selected" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const getName = async (req, res) => {
  const { userId } = req.body;
  const userRef = doc(firestore, "users", userId);
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
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const updateName = async (req, res) => {
  const { userId, newName } = req.body;
  const userRef = doc(firestore, "users", userId);
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
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const uploadSeenHistory = async (req, res) => {
  const { userId, lastSeen } = req.body;
  const userRef = doc(firestore, "users", userId);
  try {
    await updateDoc(userRef, {
      lastSeen,
      seenHistory: arrayUnion(lastSeen),
    });
    res.status(201).json({ status: 201, message: "Seen History Updated" });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const deleteAllDataInFirestore = async (req, res) => {
  const { userId, securityCode, option } = req.body;
  const passwordRef = doc(firestore, "password", "passwordDeleteAllData");
  const userRef = doc(firestore, "users", userId);
  const chatsRef = doc(firestore, "chats", userId);
  const backupChatsRef = doc(firestore, "backupChats", userId);
  try {
    const passwordSnap = await getDoc(passwordRef);
    const userSnap = await getDoc(userRef);
    const chatsSnap = await getDoc(chatsRef);
    const backupChatsSnap = await getDoc(backupChatsRef);

    if (passwordSnap.exists()) {
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;
      const compareResult = comparePassword(securityCode, encryptedPassword);
      if (compareResult) {
        if (
          userSnap.exists() &&
          chatsSnap.exists() &&
          backupChatsSnap.exists()
        ) {
          if (option.withLastSeenHistory) {
            await updateDoc(userRef, { lastSeen: "", seenHistory: [] });
          }
          if (option.withChats) {
            await updateDoc(chatsRef, { chats: [] });
          }
          if (option.withBackupChats) {
            await updateDoc(backupChatsRef, { backupChats: [] });
          }
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
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const addNewChatVoiceToFireStorage = async (req, res) => {
  const file = req.file;
  try {
    const metadata = {
      contentType: file.mimetype,
    };

    const filePath = path.join(file.path);
    const fileStream = fs.readFileSync(filePath);

    const uniqueFileName = v4() + path.extname(file.originalname);
    const voiceRef = ref(storage, "voices/" + uniqueFileName);
    const uploadTask = await uploadBytes(voiceRef, fileStream, metadata);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    // fs.unlink(filePath);
    res.status(201).json({ status: 201, downloadURL });
  } catch (error) {
    console.log(error);
    return { status: 500, error };
  }
};
