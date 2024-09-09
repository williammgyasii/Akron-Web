import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseFirestore } from "./getFirebase";

// Helper function to fetch projects in batches
export const fetchProjectsInBatches = async (projectIds) => {
  const batchSize = 10; // Firestore limits the number of `in` queries to 10 per request
  let projects = [];

  for (let i = 0; i < projectIds.length; i += batchSize) {
    const batchIds = projectIds.slice(i, i + batchSize);

    const projectQuery = query(
      collection(firebaseFirestore, "projects"),
      where("__name__", "in", batchIds)
    );

    const projectDocs = await getDocs(projectQuery);
    projectDocs.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
  }

  return projects;
};

export const addProjectToGroup = async (projectData, groupid) => {
  try {
    console.log(groupid);
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
    console.log(error);
  }
};
