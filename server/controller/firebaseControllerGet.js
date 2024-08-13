import { doc, getDoc } from "firebase/firestore";
import { comparePassword, printOutput } from "../lib/utils.js";
import { firestore } from "./firebaseInit.js";

export const checkAUser = async (req, res) => {
  const { userId } = req.query;
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      printOutput(checkAUser.name, req.body, { status: 200, userExist: true });
      res.status(200).json({ status: 200, userExist: true });
    } else {
      printOutput(checkAUser.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
        exist: false,
      });
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
        exist: false,
      });
    }
  } catch (error) {
    printOutput(checkAUser.name, req.body, { status: 500, error });
    res.status(500).json({ status: 500, error });
  }
};

export const getAllChatsFromFirestore = async (req, res) => {
  const { userId } = req.query;
  const chatsRef = doc(firestore, "chats", userId);

  try {
    const chatsSnap = await getDoc(chatsRef);

    if (chatsSnap.exists()) {
      const chats = chatsSnap.data().chats;
      printOutput(getAllChatsFromFirestore.name, req.body, {
        status: 200,
        chats,
      });
      res.status(200).json({ status: 200, chats });
    } else {
      printOutput(getAllChatsFromFirestore.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    printOutput(getAllChatsFromFirestore.name, req.body, {
      status: 500,
      error,
    });
    res.status(500).json({ status: 500, error });
  }
};

export const getAllChatsMemoryFromFirestore = async (req, res) => {
  const { userId } = req.query;
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    const chatsMemorySnap = await getDoc(chatsMemoryRef);

    if (chatsMemorySnap.exists()) {
      const chatsMemory = chatsMemorySnap.data().chatsMemory;
      printOutput(getAllChatsMemoryFromFirestore.name, req.body, {
        status: 200,
        chatsMemory,
      });

      res.status(200).json({ status: 200, chatsMemory });
    } else {
      printOutput(getAllChatsMemoryFromFirestore.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    printOutput(getAllChatsMemoryFromFirestore.name, req.body, {
      status: 500,
      error,
    });

    res.status(500).json({ status: 500, error });
  }
};

export const getNameAndProfilePhotoUrl = async (req, res) => {
  const { userId } = req.query;
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const { name, customPPUrl, PPUrl, PPFileName } = userSnap.data();
      printOutput(getNameAndProfilePhotoUrl.name, req.body, {
        status: 200,
        name,
        customPPUrl,
        PPUrl,
        PPFileName,
      });
      res.status(200).json({
        status: 200,
        name,
        customPPUrl,
        PPUrl,
        PPFileName,
      });
    } else {
      printOutput(getNameAndProfilePhotoUrl.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    printOutput(getNameAndProfilePhotoUrl.name, req.body, {
      status: 500,
      error,
    });
    res.status(500).json({ status: 500, error });
  }
};

export const getPermissionToDeleteAllData = async (req, res) => {
  const { securityCode } = req.query;

  const passwordRef = doc(firestore, "password", "passwordDeleteAllData");
  try {
    const passwordSnap = await getDoc(passwordRef);
    if (passwordSnap.exists()) {
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;
      const compareResult = comparePassword(securityCode, encryptedPassword);
      if (compareResult) {
        printOutput(getPermissionToDeleteAllData.name, req.body, {
          state: 202,
          permits: true,
        });
        res.status(202).json({ status: 202, permits: true });
      } else {
        // if security code not match
        printOutput(getPermissionToDeleteAllData.name, req.body, {
          state: 405,
          permits: false,
        });
        res.status(405).json({ status: 405, permits: false });
      }
    } else {
      // if password document not exist
      printOutput(getPermissionToDeleteAllData.name, req.body, {
        status: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });
    }
  } catch (error) {
    printOutput(getPermissionToDeleteAllData.name, req.body, {
      status: 500,
      error,
    });
    res.status(404).json({
      status: 500,
      error,
    });
  }
};
