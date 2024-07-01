import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { v4 } from "uuid";

export const addNewUserToFirestoreIfNotExists = async () => {
  if (localStorage.getItem("senAi-userId")) {
    const userIdFromLocalStorage = localStorage.getItem("senAi-userId");
    return userIdFromLocalStorage;
  } else {
    const newUserId = v4();
    localStorage.setItem("senAi-userId", newUserId);
    try {
      await setDoc(doc(firestore, "users", newUserId), {
        userId: newUserId,
        messages: [],
      });
      return newUserId;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getAllMessagesFromFirestore = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log(userSnap.data());
      return userSnap.data();
    } else {
      console.log("No such document!");
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
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      messages: arrayUnion(newMessageFromUser, newMessageFromAi),
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAllMessagesInFirestore = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      messages: [],
    });
  } catch (error) {
    console.log(error);
  }
};
