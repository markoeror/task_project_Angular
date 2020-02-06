import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { authorisationProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { SigninComponent } from './signin/signin.component';
import { TableComponent } from './components/components/table/table.component';
import { TestComponent } from './components/test/test.component';
import { ModalDialogComponent } from './components/components/modal-dialog/modal-dialog.component';

import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    TableModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    TableComponent,
    TestComponent,
    ModalDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    authorisationProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
