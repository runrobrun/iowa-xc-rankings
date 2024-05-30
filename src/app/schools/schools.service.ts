import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs} from "@angular/fire/firestore";
import {School} from "./school";
import {Observable} from "rxjs";
import {Classification} from "../classifications/classification";

const PATH = 'schools'
@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private _firestore = inject(Firestore);
  private _collection= collection(this._firestore, PATH);

  constructor() { }

  createSchool(newSchool: Partial<School>) {
    return addDoc(this._collection, newSchool);
  }

  async deleteAllDocuments() {
    const querySnapshot = await getDocs(this._collection);
    querySnapshot.forEach((docSnapshot: { id: any; }) => {
      deleteDoc(doc(this._firestore, PATH, docSnapshot.id));
      console.log("deleted", docSnapshot.id)
    });
  }


}
