import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Poll {
  id?: string,
  season: number,
  openDate: Timestamp,
  deadline: Timestamp,
  pollTitle: string,
  finalized: boolean,
  votes?: {}
}
