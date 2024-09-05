import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseStorage } from "./getFirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadGroupImage = createAsyncThunk(
  "groups/uploadGroupImage",
  async (file, { rejectWithValue }) => {
    const imageRef = ref(firebaseStorage, `groupImages/${file.name}`);

    try {
      await uploadBytes(imageRef, file);
      return await getDownloadURL(imageRef);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
