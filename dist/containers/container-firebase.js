"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@firebase/firestore");
const firebase_1 = require("../config/firebase");
class Container {
    collectionRef;
    constructor(collectionName) {
        this.collectionRef = (0, firestore_1.collection)(firebase_1.db, collectionName);
    }
    async insert(data) {
        let success = false;
        try {
            await (0, firestore_1.addDoc)(this.collectionRef, data);
            success = true;
        }
        catch (err) {
            console.error(err);
        }
        return success;
    }
    async find(filter) {
        let res = null;
        try {
            const q = filter === '*' ? this.collectionRef : (0, firestore_1.query)(this.collectionRef, filter);
            const qSnapshot = await (0, firestore_1.getDocs)(q);
            res = qSnapshot.docs.map((docSnap) => docSnap.data());
        }
        catch (err) {
            console.error(err);
        }
        return res;
    }
    async update(filter, data) {
        let success = false;
        try {
            const q = filter === '*' ? this.collectionRef : (0, firestore_1.query)(this.collectionRef, filter);
            const qSnapshot = await (0, firestore_1.getDocs)(q);
            const allPromises = qSnapshot.docs.map(async (docSnap) => (0, firestore_1.updateDoc)(docSnap.ref, data));
            await Promise.all(allPromises);
            success = true;
        }
        catch (err) {
            console.error(err);
        }
        return success;
    }
    async delete(filter) {
        let success = false;
        try {
            const q = filter === '*' ? this.collectionRef : (0, firestore_1.query)(this.collectionRef, filter);
            const qSnapshot = await (0, firestore_1.getDocs)(q);
            const allPromises = qSnapshot.docs.map(async (docSnap) => (0, firestore_1.deleteDoc)(docSnap.ref));
            await Promise.all(allPromises);
            success = true;
        }
        catch (err) {
            console.error(err);
        }
        return success;
    }
}
exports.default = Container;
