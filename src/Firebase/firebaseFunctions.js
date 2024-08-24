import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseFirestore } from "./getFirebase";

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

export const addProjectToGroup = async (projectData, groupid) => {
  try {
    console.log(groupid)
    const projectRef = collection(
      firebaseFirestore,
      "groups",
      groupid,
      "projects"
    );
    const projectDocRef = await addDoc(projectRef, projectData);
    if (projectDocRef.id) {
      return {
        projectId: projectDocRef.id,
        ...projectData,
      };
    } else {
      throw new Error("Error with document red");
    }
  } catch (error) {
    console.log(error);
  }
};
