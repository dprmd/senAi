import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseInit.js";
import { comparePassword, printOutput } from "../lib/utils.js";

export const checkAUser = async (req, res) => {
  const { userId } = req.body;

  // buat user referensi
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnap = await getDoc(userRef);

    // cek apakah user ada
    if (userSnap.exists()) {
      // kebutuhan logging
      printOutput(checkAUser.name, req.body, { status: 200, userExist: true });

      // HTTP Response
      res.status(200).json({ status: 200, userExist: true });
    } else {
      // kebutuhan logging
      printOutput(checkAUser.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
        exist: false,
      });

      // HTTP Response
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
        exist: false,
      });
    }
  } catch (error) {
    // kebutuhan logging
    printOutput(checkAUser.name, req.body, { status: 500, error });

    // HTTP Reponse
    res.status(500).json({ status: 500, error });
  }
};

export const getAllChatsFromFirestore = async (req, res) => {
  const { userId } = req.body;

  // buat chats referensi
  const chatsRef = doc(firestore, "chats", userId);

  try {
    const chatsSnap = await getDoc(chatsRef);

    // cek apakah chats ada di collection chats
    if (chatsSnap.exists()) {
      // ambil array chats jika ada
      const chats = chatsSnap.data().chats;

      // kebutuhan logging
      printOutput(getAllChatsFromFirestore.name, req.body, {
        status: 200,
        chats,
      });

      // HTTP Response
      res.status(200).json({ status: 200, chats });
    } else {
      // kebutuhan logging
      printOutput(getAllChatsFromFirestore.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      // HTTP Response
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    // kebutuhan logging
    printOutput(getAllChatsFromFirestore.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const getAllChatsMemoryFromFirestore = async (req, res) => {
  const { userId } = req.body;

  // buat chatsMemory referensi
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    const chatsMemorySnap = await getDoc(chatsMemoryRef);

    // cek apakah chatsMemory ada
    if (chatsMemorySnap.exists()) {
      // ambil arrat chatsMemory jika ada
      const chatsMemory = chatsMemorySnap.data().chatsMemory;

      // kebutuhan logging
      printOutput(getAllChatsMemoryFromFirestore.name, req.body, {
        status: 200,
        chatsMemory,
      });

      // HTTP Response
      res.status(200).json({ status: 200, chatsMemory });
    } else {
      // kebutuhan logging
      printOutput(getAllChatsMemoryFromFirestore.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      // HTTP Response
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    // kebutuhan logging
    printOutput(getAllChatsMemoryFromFirestore.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const getNameAndProfilePhotoUrl = async (req, res) => {
  const { userId } = req.body;

  // buat user referensi
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnap = await getDoc(userRef);

    // cek apakah user ada
    if (userSnap.exists()) {
      // ambil beberapa data dari document
      const { name, customPPUrl, PPUrl, PPFileName } = userSnap.data();

      // kebutuhan logging
      printOutput(getNameAndProfilePhotoUrl.name, req.body, {
        status: 200,
        name,
        customPPUrl,
        PPUrl,
        PPFileName,
      });

      // HTTP Response
      res.status(200).json({
        status: 200,
        name,
        customPPUrl,
        PPUrl,
        PPFileName,
      });
    } else {
      // kebutuhan logging
      printOutput(getNameAndProfilePhotoUrl.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      // HTTP Response
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    // kebutuhan logging
    printOutput(getNameAndProfilePhotoUrl.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const getPermissionToDeleteAllData = async (req, res) => {
  const { securityCode } = req.body;

  // buat password referensi
  const passwordRef = doc(firestore, "password", "passwordDeleteAllData");
  try {
    const passwordSnap = await getDoc(passwordRef);

    // cek apakah password document ada ?
    if (passwordSnap.exists()) {
      // jika ada maka kita mengambil password yang terenkripsi di document tersebut
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;

      // lalu kita bandingkan password dari document dengan password yang di inputkan oleh client
      const compareResult = comparePassword(securityCode, encryptedPassword);

      // jika cocok maka izinkan, dan sebaliknya
      if (compareResult) {
        // kebutuhan logging
        printOutput(getPermissionToDeleteAllData.name, req.body, {
          state: 202,
          permits: true,
        });

        // HTTP Response
        res.status(202).json({ status: 202, permits: true });
      } else {
        // kebutuhan logging
        printOutput(getPermissionToDeleteAllData.name, req.body, {
          state: 405,
          permits: false,
        });

        // HTTP Response
        res.status(202).json({ status: 405, permits: false });
      }
    } else {
      // kebutuhan logging
      printOutput(getPermissionToDeleteAllData.name, req.body, {
        status: 404,
        message: `No Such Document Match With`,
      });

      // HTTP Response
      res.status(404).json({
        status: 404,
        message: `No Such Document Match With`,
      });
    }
  } catch (error) {
    // kebutuhan logging
    printOutput(getPermissionToDeleteAllData.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(404).json({
      status: 500,
      error,
    });
  }
};
