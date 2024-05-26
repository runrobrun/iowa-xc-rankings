import {inject, Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {School} from "./school";

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
}
