import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { v4 } from "uuid";
import { getDeviceName } from "@/lib/utils";

// const collectionName = "users_prod";
const collectionName = "users";

export const addNewUserToFirestoreIfNotExists = async () => {
  if (localStorage.getItem("senAi-userId2")) {
    const userIdFromLocalStorage = localStorage.getItem("senAi-userId2");
    return userIdFromLocalStorage;
  } else {
    const newUserId = v4();
    const device = getDeviceName();
    localStorage.setItem("senAi-userId2", newUserId);
    try {
      await setDoc(doc(firestore, collectionName, newUserId), {
        userId: newUserId,
        device,
        messages: [],
        backupMessages: [],
        lastSeen: "",
        seenHistory: [],
      });
      return newUserId;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getAllMessagesFromFirestore = async (userId) => {
  try {
    const userRef = doc(firestore, collectionName, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      localStorage.removeItem("senAi-userId2");
      const newUserId = await addNewUserToFirestoreIfNotExists();
      return await getAllMessagesFromFirestore(newUserId);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addNewMessagesToFirestore = async (
  userId,
  newMessageFromUser,
  newMessageFromAi,
) => {
  try {
    const userRef = doc(firestore, collectionName, userId);
    const userSnap = await getDoc(userRef);
    const { messages, backupMessages } = userSnap.data();
    await updateDoc(userRef, {
      messages: [...messages, newMessageFromUser, newMessageFromAi],
      backupMessages: [...backupMessages, newMessageFromUser, newMessageFromAi],
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAllMessagesInFirestore = async (
  userId,
  deleteWithBackup,
) => {
  try {
    const userRef = doc(firestore, collectionName, userId);
    if (deleteWithBackup) {
      await updateDoc(userRef, {
        backupMessages: [],
        messages: [],
        seenHistory: [],
        lastSeen: "",
      });
    } else {
      await updateDoc(userRef, {
        messages: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadSeenHistory = async (userId) => {
  try {
    const seen = new Date();
    const day = seen.getDate();
    const month = seen.toLocaleString("default", { month: "long" });
    const year = seen.getFullYear();
    const hours = seen.getHours();
    const minutes = seen.getMinutes();
    const seconds = seen.getSeconds();
    const seenFormat = `${day} ${month} ${year} , ${hours}:${minutes}:${seconds}`;
    const userRef = doc(firestore, collectionName, userId);
    await updateDoc(userRef, {
      lastSeen: seenFormat,
      seenHistory: arrayUnion(seenFormat),
    });
  } catch (error) {
    console.log(error);
  }
};
