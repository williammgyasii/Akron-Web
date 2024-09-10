import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseFirestore } from "./getFirebase";




export const addProjectToGroup = async (projectData, groupid) => {
  try {
    // console.log(groupid);
    const projectRef = collection(firebaseFirestore, "projects");
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
    // console.log(error);
  }
};
