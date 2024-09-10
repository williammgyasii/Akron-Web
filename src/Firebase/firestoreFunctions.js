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


export const fetchProjectsInBatches = async (projectIds) => {
  const batchSize = 10;
  let projects = [];

  if (!Array.isArray(projectIds) || !projectIds.every(id => typeof id === 'string')) {
    throw new Error('Invalid project IDs format');
  }

  for (let i = 0; i < projectIds.length; i += batchSize) {
    const batchIds = projectIds.slice(i, i + batchSize);

    const projectQuery = query(
      collection(firebaseFirestore, 'projects'),
      where('__name__', 'in', batchIds)
    );

    try {
      const projectDocs = await getDocs(projectQuery);
      projectDocs.forEach(doc => {
        projects.push({ id: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.error('Error fetching projects batch:', error);
      throw error;
    }
  }

  return projects;
};