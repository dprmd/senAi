import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebaseInit.js";
import { printOutput } from "../lib/utils.js";
import { addFileToFirebaseStorage } from "./firebaseController.js";
import { deleteObject, ref } from "firebase/storage";

export const updateName = async (req, res) => {
  const { userId, newName } = req.body;

  const userRef = doc(firestore, "users", userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      updateDoc(userRef, {
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
  const file = req.file;
  try {
    const { uniqueFileName, downloadUrl } = await addFileToFirebaseStorage(
      file,
      "images",
    );

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
  const { userId, newPPUrl, newPPFileName, oldPPFileName, customPPUrl } =
    req.body;

  const userRef = doc(firestore, "users", userId);
  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      updateDoc(userRef, {
        customPPUrl,
        PPUrl: newPPUrl,
        PPFileName: newPPFileName,
      });
      // jika customPPUrl true = akan mengupdate photo , maka hapus photo sebelumnya
      if (customPPUrl) {
        const imageFileRef = ref(storage, `images/${oldPPFileName}`);
        deleteObject(imageFileRef)
          .then(() => {
            console.log("Delete Profile Photo");
          })
          .catch((error) => {
            console.log(error);
          });
        // jika customPPUrl false = akan menghapus photo , maka hapus photo terkait
      } else {
        const imageFileRef = ref(storage, `images/${newPPFileName}`);
        deleteObject(imageFileRef)
          .then(() => {
            console.log("Delete Profile Photo");
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
