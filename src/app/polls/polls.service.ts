import {inject, Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Poll} from './poll';

const PATH = 'polls';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  private _firestore = inject(Firestore);
  private _collection= collection(this._firestore, PATH);

  constructor() { }
  createPoll(newPoll: Partial<Poll>) {
    return addDoc(this._collection, newPoll);
  }
}
