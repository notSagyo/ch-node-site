import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../config/firebase';
import { filterFirebase } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Container<T extends Record<string, any>> {
  collectionRef: CollectionReference;

  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName);
  }

  async insert(data: T): Promise<boolean> {
    let success = false;
    try {
      await addDoc(this.collectionRef, data);
      success = true;
    } catch (err) {
      console.error(err);
    }
    return success;
  }

  async find(filter: filterFirebase): Promise<T[]> {
    let res: T[] = [];
    try {
      const q =
        filter === '*' ? this.collectionRef : query(this.collectionRef, filter);
      const qSnapshot = await getDocs(q);
      res = qSnapshot.docs.map((docSnap) => docSnap.data() as T);
    } catch (err) {
      console.error(err);
    }
    return res;
  }

  async update(
    filter: filterFirebase,
    data: Partial<T> | { [x: string]: unknown },
  ) {
    let success = false;
    try {
      const q =
        filter === '*' ? this.collectionRef : query(this.collectionRef, filter);
      const qSnapshot = await getDocs(q);
      const allPromises = qSnapshot.docs.map(async (docSnap) =>
        updateDoc(docSnap.ref, data as DocumentData),
      );
      await Promise.all(allPromises);
      success = true;
    } catch (err) {
      console.error(err);
    }
    return success;
  }

  async delete(filter: filterFirebase): Promise<boolean> {
    let success = false;
    try {
      const q =
        filter === '*' ? this.collectionRef : query(this.collectionRef, filter);
      const qSnapshot = await getDocs(q);
      const allPromises = qSnapshot.docs.map(async (docSnap) =>
        deleteDoc(docSnap.ref),
      );
      await Promise.all(allPromises);
      success = true;
    } catch (err) {
      console.error(err);
    }
    return success;
  }
}
