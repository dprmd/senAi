import { doc, getDoc, updateDoc } from "firebase/firestore";
import { printOutput } from "../lib/utils.js";
import { addFileToFirebaseStorage } from "./firebaseController.js";
import { deleteFilesInFirebaseStorage } from "./firebaseControllerDelete.js";
import { firestore } from "./firebaseInit.js";

export const updateName = async (req, res) => {
  const { userId, newName } = req.body;

  const userRef = doc(firestore, "users", userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        name: newName,
      });

      printOutput(updateName.name, req.body, {
        status: 202,
        message: `Name update to ${newName}`,
        newName,
      });

      res
        .status(202)
        .json({ status: 202, message: `Name update to ${newName}`, newName });
    } else {
      printOutput(updateName.name, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    printOutput(updateName.name, req.body, {
      status: 500,
      error,
    });

    res.status(500).json({ status: 500, error });
  }
};

export const updateProfilePhoto = async (req, res) => {
  const { oldPPFileName } = JSON.parse(req.body.oldPPFileName);
  const file = req.file;
  try {
    // upload image
    const { uniqueFileName, downloadUrl } = await addFileToFirebaseStorage(
      file,
      "images",
    );

    // delete previous image
    deleteFilesInFirebaseStorage(oldPPFileName, "images");

    printOutput(updateProfilePhoto.name, req.file, {
      status: 201,
      PPFileName: uniqueFileName,
      newPPUrl: downloadUrl,
    });

    res
      .status(201)
      .json({ status: 201, PPFileName: uniqueFileName, newPPUrl: downloadUrl });
  } catch (error) {
    printOutput(updateProfilePhoto.name, req.file, { status: 500, error });

    return { status: 500, error };
  }
};

export const updatePPUrl = async (req, res) => {
  const { userId, newPPUrl, newPPFileName, customPPUrl } = req.body;

  const userRef = doc(firestore, "users", userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      updateDoc(userRef, {
        customPPUrl,
        PPUrl: newPPUrl,
        PPFileName: newPPFileName,
      });

      printOutput(updatePPUrl.name, req.body, {
        status: 202,
        message: `Updated Profile Photo`,
      });

      res.status(202).json({ status: 202, message: `Updated Profile Photo` });
    } else {
      printOutput(updatePPUrl, req.body, {
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });

      res.status(404).json({
        status: 404,
        message: `No Such Document Match With ${userId}`,
      });
    }
  } catch (error) {
    printOutput(updatePPUrl, req.body, {
      status: 500,
      error,
    });

    res.status(500).json({ status: 500, error });
  }
};
