import { useState, useEffect } from "react";

const useIndexedDB = () => {
    const [db, setDb] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const request = indexedDB.open("QuizDatabase", 1);

        request.onerror = (event) => {
            console.error("Error opening IndexedDB", event);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("quizHistory")) {
                db.createObjectStore("quizHistory", {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        };

        request.onsuccess = (event) => {
            setDb(event.target.result);
            setIsInitialized(true);
        };

        return () => {
            if (db) {
                db.close();
            }
        };
    }, []);

    const saveQuizResult = (result) => {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject("Database not initialized");
                return;
            }

            const transaction = db.transaction(["quizHistory"], "readwrite");
            const store = transaction.objectStore("quizHistory");
            const request = store.add({
                ...result,
                timestamp: new Date().toISOString(),
            });

            request.onsuccess = () => resolve(true);
            request.onerror = (event) =>
                reject(`Error saving to IndexedDB: ${event.target.error}`);
        });
    };

    const getQuizHistory = () => {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject("Database not initialized");
                return;
            }

            const transaction = db.transaction(["quizHistory"], "readonly");
            const store = transaction.objectStore("quizHistory");
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) =>
                reject(
                    `Error retrieving from IndexedDB: ${event.target.error}`,
                );
        });
    };

    return { saveQuizResult, getQuizHistory, isInitialized };
};

export default useIndexedDB;
