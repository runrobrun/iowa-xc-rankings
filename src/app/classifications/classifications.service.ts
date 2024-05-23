import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc, doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  where
} from '@angular/fire/firestore';
import {Classification} from './classification';
import {Observable} from 'rxjs';

const PATH = 'classifications';

@Injectable({
  providedIn: 'root'
})
export class ClassificationsService {
  private _firestore = inject(Firestore);
  private _collection= collection(this._firestore, PATH);

  getClassifications() {
    return collectionData(this._collection, { idField: 'id'}) as Observable<Classification[]>;
  }

  async getClassificationsByGender(gender: string) {
    const q = query(
      this._collection,
      where('classificationGender', '==', gender),
      orderBy('classificationName', 'asc')
    );
    const querySnapshot = await getDocs(q);
    let classifications: Classification[] = [];
    querySnapshot.forEach((doc) =>  {
      classifications = [...classifications, { id: doc.id, ...doc.data() } as Classification]});
    return classifications;
  }

  deleteClassification(classificationId: string | undefined) {
    return deleteDoc(this.document(classificationId));
  }

  private document(id: string | undefined) {
    return doc(this._firestore, `${PATH}/${id}`);
  }


}
