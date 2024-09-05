import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseFirestore } from "./getFirebase";

// Function to batch group fetching if user has more than 10 groups
export const fetchGroupsBatch = async (groupIdsBatch) => {
  const groupQuery = query(
    collection(firebaseFirestore, "groups"),
    where("groupId", "in", groupIdsBatch)
  );
  const groupSnapshot = await getDocs(groupQuery);
  return groupSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const queryUserByEmail = async (searchEmail) => {
  try {
    const userRef = collection(firebaseFirestore, "users");
    const q = query(userRef, where("email", "==", searchEmail));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("This email is not registered.");
    } else {
      const userDoc = querySnapshot.docs[0].data();
      return { uid: userDoc.uid, email: searchEmail.trim(), ...userDoc };
    }
  } catch (error) {
    throw new Error(error);
  }
};
