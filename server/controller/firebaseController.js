import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import { printOutput } from "../lib/utils.js";
import { firestore, storage } from "./firebaseInit.js";

export const addNewUserToFirestore = async (req, res) => {
  const { deviceName, deviceType, lastSeen } = req.body;

  const newUserId = v4();

  try {
    await setDoc(doc(firestore, "users", newUserId), {
      userId: newUserId,
      name: "Unknown",
      customPPUrl: false,
      PPUrl: "img/haku.jpeg",
      PPFileName: "",
      deviceName,
      deviceType,
      lastSeen,
      seenHistory: [],
    });

    await setDoc(doc(firestore, "chats", newUserId), {
      owned: newUserId,
      chats: [],
    });

    await setDoc(doc(firestore, "backupChats", newUserId), {
      owned: newUserId,
      backupChats: [],
    });

    await setDoc(doc(firestore, "chatsMemory", newUserId), {
      owned: newUserId,
      chatsMemory: [],
    });

    printOutput(addNewUserToFirestore.name, req.body, {
      status: 201,
      newUserId,
    });

    res.status(201).json({ status: 201, newUserId });
  } catch (error) {
    printOutput(addNewUserToFirestore.name, req.body, { state: 500, error });

    res.status(500).json({ status: 500, error });
  }
};

export const addNewChatsToFirestore = async (req, res) => {
  const { userId, newChatFromUser, newChatFromAi } = req.body;

  const chatsRef = doc(firestore, "chats", userId);
  const backupChatsRef = doc(firestore, "backupChats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    const chatsSnap = await getDoc(chatsRef);
    const backupChatsSnap = await getDoc(backupChatsRef);
    const chatsMemorySnap = await getDoc(chatsMemoryRef);

    if (
      chatsSnap.exists() &&
      backupChatsSnap.exists() &&
      chatsMemorySnap.exists()
    ) {
      updateDoc(chatsRef, {
        chats: arrayUnion(newChatFromUser, newChatFromAi),
      });
      updateDoc(backupChatsRef, {
        backupChats: arrayUnion(newChatFromUser, newChatFromAi),
      });
      updateDoc(chatsMemoryRef, {
        chatsMemory: arrayUnion(
          {
            time: newChatFromUser.time,
            role: "user",
            content: newChatFromUser.message,
          },
          {
            time: newChatFromAi.time,
            role: "assistant",
            content: newChatFromAi.message,
          },
        ),
      });

      printOutput(addNewChatsToFirestore.name, req.body, {
        status: 201,
        message: "Chats added",
      });

      res.status(201).json({ status: 201, message: "Chats added" });
    } else {
      printOutput(addNewChatsToFirestore.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    printOutput(addNewChatsToFirestore.name, req.body, { status: 500, error });

    res.status(500).json({ status: 500, error });
  }
};

export const uploadSeenHistory = async (req, res) => {
  const { userId, lastSeen } = req.body;

  const userRef = doc(firestore, "users", userId);
  try {
    updateDoc(userRef, {
      lastSeen,
      seenHistory: arrayUnion(lastSeen),
    });

    printOutput(uploadSeenHistory.name, req.body, {
      status: 201,
      message: "Seen History Updated",
    });

    res.status(201).json({ status: 201, message: "Seen History Updated" });
  } catch (error) {
    printOutput(uploadSeenHistory.name, req.body, {
      status: 500,
      error,
    });

    res.status(500).json({ status: 500, error });
  }
};

export const addFileToFirebaseStorage = async (file, folderName) => {
  try {
    const metadata = {
      contentType: file.mimetype,
    };

    const filePath = path.join(file.path);
    const fileStream = fs.readFileSync(filePath);

    const uniqueFileName = v4() + path.extname(file.originalname);
    const storageRef = ref(storage, `${folderName}/` + uniqueFileName);
    const uploadTask = await uploadBytes(storageRef, fileStream, metadata);
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    fs.unlink(filePath, (err) => {
      console.log(err);
    });

    return { success: true, uniqueFileName, downloadUrl };
  } catch {
    throw new Error("Failed to add file");
  }
};

export const addNewChatVoiceToFireStorage = async (req, res) => {
  const file = req.file;

  try {
    const { uniqueFileName, downloadUrl } = await addFileToFirebaseStorage(
      file,
      "voices",
    );

    printOutput(addNewChatVoiceToFireStorage.name, req.file, {
      status: 201,
      audioFileName: uniqueFileName,
      downloadUrl,
    });

    res
      .status(201)
      .json({ status: 201, audioFileName: uniqueFileName, downloadUrl });
  } catch (error) {
    printOutput(addNewChatVoiceToFireStorage.name, req.file, {
      status: 500,
      error,
    });

    return { status: 500, error: error.message };
  }
};
