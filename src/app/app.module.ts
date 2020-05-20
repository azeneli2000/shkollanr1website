import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeshqipComponent } from './homeshqip/homeshqip.component';
import { HomeanglishtComponent } from './homeanglisht/homeanglisht.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LightboxModule } from 'ngx-lightbox';

import {AngularFireModule} from '@angular/fire/'

import {AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { AdminComponent } from './admin/admin.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { GaleryAdmimComponent } from './galery-admim/galery-admim.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeshqipComponent,
    HomeanglishtComponent,
    GalleryComponent,
    AdminComponent,
    ModalComponent,
    ConfirmModalComponent,
    SettingsModalComponent,
    GaleryAdmimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LightboxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ModalComponent,ConfirmModalComponent ]

})
export class AppModule { }
