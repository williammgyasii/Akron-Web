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
