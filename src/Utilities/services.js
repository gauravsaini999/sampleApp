import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB6YxEaCLNFfoI5KcidiRQmH1af9N6Xlt8",
    authDomain: "task-management-8c708.firebaseapp.com",
    projectId: "task-management-8c708",
    storageBucket: "task-management-8c708.firebasestorage.app",
    messagingSenderId: "568027260884",
    appId: "1:568027260884:web:6e22a858b16b683782d841",
    measurementId: "G-R70L7KGW1Q"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);


export const addTask = async (taskData, cb) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), taskData);
        console.log("task written with ID: ", docRef.id);
        cb(docRef.id, "success");
    } catch (e) {
        console.error("Error adding task: ", e);
        cb(e, "error")
    }
}

export const updateTask = async (docId, updatedData, cb) => {
    const docRef = doc(db, "tasks", docId);

    await updateDoc(docRef, updatedData)
        .then(() => {
            console.log("Task successfully updated!", docRef);
            if (cb) cb(docRef.id, "success");
        })
        .catch((error) => {
            console.error("Error updating task: ", error);
            if (cb) cb(error, 'error');
        });
};

export const delTask = async (docId, cb) => {
    const docRef = doc(db, "tasks", docId);
    // Delete the task
    await deleteDoc(docRef)
        .then(() => {
            console.log("task successfully deleted!");
            if (cb)
                cb("task successfully deleted!");
        })
        .catch((error) => {
            console.error("Error removing task: ", error);
            if (cb)
                cb("Error removing task: ", error);
        });
}

export const getTasks = async (cb) => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    let data = [];
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        data.push({ ...doc.data(), id: doc.id });
    });
    if (cb)
        cb(data)
}