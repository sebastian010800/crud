import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LOCALE_ID } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({ ...environment.firebaseConfig })),
    provideFirestore(() => getFirestore()),
    { provide: LOCALE_ID, useValue: 'es' },
  ],

};
