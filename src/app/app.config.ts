import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';

let firebaseConfig = {
  apiKey: "AIzaSyBO38VLBRMznoU1j9FlhHdlhhc3OLdGWKI",
  authDomain: "xc-ranking-poll.firebaseapp.com",
  projectId: "xc-ranking-poll",
  storageBucket: "xc-ranking-poll.appspot.com",
  messagingSenderId: "686009597040",
  appId: "1:686009597040:web:3bff0b91c21ff3de7d48b5",
  measurementId: "G-15LS43R3KQ"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
