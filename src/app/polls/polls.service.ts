import {inject, Injectable} from '@angular/core';
import {addDoc, collection, Firestore, getDocs, orderBy, query, where} from '@angular/fire/firestore';
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

  async getAllPolls() {
    const q = query(
      this._collection,
      where('season', '==', 2024),
      orderBy('openDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    let polls: Poll[] = [];
    querySnapshot.forEach((doc) => {
      polls = [...polls, {id: doc.id, ...doc.data() } as Poll];
    });
    return polls;
  }
}
