import { firestore, storage } from "./firebaseInit.js";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { printOutput } from "../lib/utils.js";
import fs from "fs";
import path from "path";

export const addNewUserToFirestore = async (req, res) => {
  const { deviceName, deviceType, lastSeen } = req.body;

  // buat random userId
  const newUserId = v4();

  try {
    // buat document default di collection users
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

    // buat document default di collection chats
    await setDoc(doc(firestore, "chats", newUserId), {
      owned: newUserId,
      chats: [],
    });

    // buat document default di collection backupChats
    await setDoc(doc(firestore, "backupChats", newUserId), {
      owned: newUserId,
      backupChats: [],
    });

    // buat document default di collection chatsMemory
    await setDoc(doc(firestore, "chatsMemory", newUserId), {
      owned: newUserId,
      chatsMemory: [],
    });

    // kebutuhan logging
    printOutput(addNewUserToFirestore.name, req.body, {
      status: 201,
      newUserId,
    });

    // HTTP Response
    res.status(201).json({ status: 201, newUserId });
  } catch (error) {
    // kebutuhan logging
    printOutput(addNewUserToFirestore.name, req.body, { state: 500, error });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const addNewChatsToFirestore = async (req, res) => {
  const { userId, newChatFromUser, newChatFromAi } = req.body;

  // buat referensi chats, backupChats, dan chatsMemory
  const chatsRef = doc(firestore, "chats", userId);
  const backupChatsRef = doc(firestore, "backupChats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    const chatsSnap = await getDoc(chatsRef);
    const backupChatsSnap = await getDoc(backupChatsRef);
    const chatsMemorySnap = await getDoc(chatsMemoryRef);

    // cek apakah ketiga referensi ada
    if (
      chatsSnap.exists() &&
      backupChatsSnap.exists() &&
      chatsMemorySnap.exists()
    ) {
      // jika tiga referensi ada maka tambahkan data chat yaitu = newChatFromUser dan newChatFromAi
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
          }
        ),
      });

      // kebutuhan logging
      printOutput(addNewChatsToFirestore.name, req.body, {
        status: 201,
        message: "Chats added",
      });

      // HTTP Response
      res.status(201).json({ status: 201, message: "Chats added" });
    } else {
      // kebutuhan logging
      printOutput(addNewChatsToFirestore.name, req.body, {
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
    printOutput(addNewChatsToFirestore.name, req.body, { status: 500, error });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const uploadSeenHistory = async (req, res) => {
  const { userId, lastSeen } = req.body;

  // buat user referensi
  const userRef = doc(firestore, "users", userId);
  try {
    // jika user ada maka tambahkan lastSeen dan seenHistory
    updateDoc(userRef, {
      lastSeen,
      seenHistory: arrayUnion(lastSeen),
    });

    // kebutuhan logging
    printOutput(uploadSeenHistory.name, req.body, {
      status: 201,
      message: "Seen History Updated",
    });

    // HTTP Response
    res.status(201).json({ status: 201, message: "Seen History Updated" });
  } catch (error) {
    // kebutuhan logging
    printOutput(uploadSeenHistory.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const addFileToFirebaseStorage = async (file, folderName) => {
  try {
    // set metadata
    const metadata = {
      contentType: file.mimetype,
    };

    // tentukan filePath dan buat file tersebut menjadi streamable
    const filePath = path.join(file.path);
    const fileStream = fs.readFileSync(filePath);

    // buat unique file agar tidak ada duplikat di firebase storage
    const uniqueFileName = v4() + path.extname(file.originalname);

    // buat referensi yang mengarah ke folderName
    const storageRef = ref(storage, `${folderName}/` + uniqueFileName);

    // mulai mengupload file audio
    const uploadTask = await uploadBytes(storageRef, fileStream, metadata);

    // jika sudah tersimpan di firebase storage maka ambil url nya
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    // hapus file sementara
    fs.unlink(filePath, (err) => {
      console.log(err);
    });

    return { success: true, uniqueFileName, downloadUrl };
  } catch {
    throw new Error("Failed to add file");
  }
};

export const addNewChatVoiceToFireStorage = async (req, res) => {
  // ambil file dengan type audio
  const file = req.file;

  try {
    // proses file
    const { uniqueFileName, downloadUrl } = await addFileToFirebaseStorage(
      file,
      "voices"
    );

    // kebutuhan logging
    printOutput(addNewChatVoiceToFireStorage.name, req.file, {
      status: 201,
      audioFileName: uniqueFileName,
      downloadUrl,
    });

    // HTTP Response
    res
      .status(201)
      .json({ status: 201, audioFileName: uniqueFileName, downloadUrl });
  } catch (error) {
    // kebutuhan logging
    printOutput(addNewChatVoiceToFireStorage.name, req.file, {
      status: 500,
      error,
    });

    // return error jika terjadi error saat mengupload file
    return { status: 500, error: error.message };
  }
};
