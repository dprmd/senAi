import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebaseInit.js";
import { printOutput } from "../lib/utils.js";
import { addFileToFirebaseStorage } from "./firebaseController.js";
import { deleteObject, ref } from "firebase/storage";

export const updateName = async (req, res) => {
  const { userId, newName } = req.body;

  // buat user referensi
  const userRef = doc(firestore, "users", userId);
  try {
    const userSnap = await getDoc(userRef);

    // cek apakah user ada
    if (userSnap.exists()) {
      // kalau ada ganti nama dengan nama baru yaitu newName
      updateDoc(userRef, {
        name: newName,
      });

      // kebutuhan logging
      printOutput(updateName.name, req.body, {
        status: 202,
        message: `Name update to ${newName}`,
        newName,
      });

      // HTTP Response
      res
        .status(202)
        .json({ status: 202, message: `Name update to ${newName}`, newName });
    } else {
      // kebutuhan logging
      printOutput(updateName.name, req.body, {
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
    printOutput(updateName.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const updateProfilePhoto = async (req, res) => {
  // ambil file dari client
  const file = req.file;
  try {
    // proses file
    const { uniqueFileName, downloadUrl } = await addFileToFirebaseStorage(
      file,
      "images",
    );

    // kebutuhan logging
    printOutput(updateProfilePhoto.name, req.file, {
      status: 201,
      PPFileName: uniqueFileName,
      newPPUrl: downloadUrl,
    });

    // HTTP Response
    res
      .status(201)
      .json({ status: 201, PPFileName: uniqueFileName, newPPUrl: downloadUrl });
  } catch (error) {
    // kebutuhan logging
    printOutput(updateProfilePhoto.name, req.file, { status: 500, error });

    return { status: 500, error };
  }
};

export const updatePPUrl = async (req, res) => {
  const { userId, newPPUrl, newPPFileName, customPPUrl, oldPPUrl } = req.body;

  // buat user referensi
  const userRef = doc(firestore, "users", userId);
  try {
    const userSnap = await getDoc(userRef);

    // jika user ada maka update
    if (userSnap.exists()) {
      updateDoc(userRef, {
        customPPUrl,
        PPUrl: newPPUrl,
        PPFileName: newPPFileName,
      });
      if (!customPPUrl) {
        console.log(oldPPUrl);
        const imageFileRef = ref(storage, `images/${oldPPUrl}`);
        deleteObject(imageFileRef)
          .then(() => {
            console.log("Delete Profile Photo");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // kebutuhan logging
      printOutput(updatePPUrl.name, req.body, {
        status: 202,
        message: `Updated Profile Photo`,
      });

      // HTTP Response
      res.status(202).json({ status: 202, message: `Updated Profile Photo` });
    } else {
      // kebutuhan logging
      printOutput(updatePPUrl, req.body, {
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
    printOutput(updatePPUrl, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};
