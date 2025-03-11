import * as React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6YxEaCLNFfoI5KcidiRQmH1af9N6Xlt8",
    authDomain: "task-management-8c708.firebaseapp.com",
    projectId: "task-management-8c708",
    storageBucket: "task-management-8c708.firebasestorage.app",
    messagingSenderId: "568027260884",
    appId: "1:568027260884:web:6e22a858b16b683782d841",
    measurementId: "G-R70L7KGW1Q"
};

// Initialize Firebase
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(app);

// const userObj = {
//     creationDate: new Date(),
//     name: formData['name'],
//     email: formData['email'],
//     country: formData['country'],
//     phone: formData['phone']
// }

export const addTask = async (taskData) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), taskData);
        console.log("task written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding task: ", e);
    }
}

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