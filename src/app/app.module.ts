import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientModule } from './pages/client/client.module';
import { ClientListComponent } from './pages/client-list/client-list.component';



@NgModule({
  declarations: [AppComponent, ClientListComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      // connectFirestoreEmulator(firestore, 'http://localhost', 9098);
      return firestore;
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
