import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseStorage } from "./getFirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadGroupImage = createAsyncThunk(
  "groups/uploadGroupImage",
  async ({file,groupName}, { rejectWithValue }) => {
    const imageRef = ref(firebaseStorage, `groupImages/${groupName}_${Date.now()}`);

    try {
      await uploadBytes(imageRef, file);
      return await getDownloadURL(imageRef);
    } catch (error) {
      return rejectWithValue("error/uploadGroupImage", error.message);
    }
  }
);
